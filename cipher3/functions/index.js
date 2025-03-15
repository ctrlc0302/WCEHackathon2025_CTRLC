const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const crypto = require('crypto');

admin.initializeApp();

// Your Razorpay Key ID and Key Secret
const razorpayKeyId = 'rzp_test_sGrU8dHJSM0vU4';
const razorpayKeySecret = 'lu1S2AngPXhl9Ra8ss9HCcx6';

// Create Razorpay Order
exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  try {
    // Validate the request
    const { amount, currency = 'INR', notes = {} } = data;
    
    if (!amount || amount <= 0) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'Amount must be greater than 0'
      );
    }
    
    // Make API request to Razorpay
    const response = await axios({
      method: 'post',
      url: 'https://api.razorpay.com/v1/orders',
      auth: {
        username: razorpayKeyId,
        password: razorpayKeySecret
      },
      data: {
        amount,
        currency,
        notes
      }
    });
    
    // Store order info in Firestore
    await admin.firestore().collection('orders').add({
      orderId: response.data.id,
      amount: response.data.amount,
      currency: response.data.currency,
      notes: response.data.notes,
      status: response.data.status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      userId: context.auth?.uid || 'anonymous'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to create Razorpay order'
    );
  }
});

// Verify Razorpay Payment Signature
exports.verifyRazorpaySignature = functions.https.onCall(async (data, _context) => {
  try {
    const { paymentId, orderId, signature } = data;
    
    if (!paymentId || !orderId || !signature) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Payment ID, Order ID, and Signature are required'
      );
    }
    
    // Generate signature for verification
    const text = orderId + '|' + paymentId;
    const generated_signature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(text)
      .digest('hex');
    
    // Verify signature
    const isValid = generated_signature === signature;
    
    // If valid, update payment status in Firestore
    if (isValid) {
      // Get the order from Firestore
      const ordersRef = admin.firestore().collection('orders');
      const orderSnapshot = await ordersRef.where('orderId', '==', orderId).get();
      
      if (!orderSnapshot.empty) {
        const orderDoc = orderSnapshot.docs[0];
        await orderDoc.ref.update({
          paymentId,
          paymentVerified: true,
          verifiedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }
    
    return { verified: isValid };
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    
    throw new functions.https.HttpsError(
      'internal',
      error.message || 'Failed to verify payment signature'
    );
  }
});

// Webhook for Razorpay events (optional)
exports.razorpayWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const event = req.body;
    const signature = req.headers['x-razorpay-signature'];
    
    // Verify webhook signature
    const webhookSecret = 'YOUR_RAZORPAY_WEBHOOK_SECRET'; // Set this in Razorpay Dashboard
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    
    if (signature !== generatedSignature) {
      throw new Error('Invalid webhook signature');
    }
    
    // Process different event types
    switch (event.event) {
      case 'payment.authorized':
        // Handle payment authorized
        await admin.firestore().collection('payments').add({
          paymentId: event.payload.payment.entity.id,
          orderId: event.payload.payment.entity.order_id,
          amount: event.payload.payment.entity.amount / 100,
          status: 'authorized',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          razorpayEvent: event
        });
        break;
        
      case 'payment.captured':
        // Handle payment captured
        await admin.firestore().collection('payments').add({
          paymentId: event.payload.payment.entity.id,
          orderId: event.payload.payment.entity.order_id,
          amount: event.payload.payment.entity.amount / 100,
          status: 'captured',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          razorpayEvent: event
        });
        break;
        
      case 'payment.failed':
        // Handle payment failed
        await admin.firestore().collection('payments').add({
          paymentId: event.payload.payment.entity.id, 
          orderId: event.payload.payment.entity.order_id,
          amount: event.payload.payment.entity.amount / 100,
          status: 'failed',
          failureReason: event.payload.payment.entity.error_description,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          razorpayEvent: event
        });
        break;
    }
    
    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});
