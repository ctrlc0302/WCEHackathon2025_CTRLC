import React, { useState, useRef, useEffect } from 'react';
import { Camera, Check } from 'lucide-react';
import jsQR from 'jsqr';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyD-w1NxAV-YYwLlNDYCm6nV8F6IvT79gbw",
  authDomain: "cipher-6625b.firebaseapp.com",
  projectId: "cipher-6625b",
  storageBucket: "cipher-6625b.firebasestorage.app",
  messagingSenderId: "469574226769",
  appId: "1:469574226769:web:de68e40e3a1d8549953970",
  
};

// Initialize Firebase only if it hasn't been initialized already
let app;
let db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error", error);
}

const ScannerButton = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [merchantData, setMerchantData] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startCamera = async () => {
    try {
      // Clear any existing streams first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Prefer back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready before starting scan
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          videoRef.current.play()
            .then(() => {
              console.log('Video is playing');
              startQRScan();
            })
            .catch(err => {
              console.error('Error playing video:', err);
              setError('Could not start video stream');
              setIsScanning(false);
            });
        };
      }
      
      console.log('Camera activated');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setIsScanning(false);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const startQRScan = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    console.log('Starting QR scan');
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas size to match video dimensions
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    
    // Ensure any previous interval is cleared
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    // Scan for QR code every 100ms
    scanIntervalRef.current = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        // Draw video frame to canvas
        context.drawImage(
          videoRef.current, 
          0, 
          0, 
          canvas.width, 
          canvas.height
        );
        
        // Get image data for QR processing
        const imageData = context.getImageData(
          0, 
          0, 
          canvas.width, 
          canvas.height
        );
        
        // Process image data with jsQR
        try {
          const qrCode = jsQR(
            imageData.data, 
            imageData.width, 
            imageData.height,
            { inversionAttempts: "dontInvert" } // Try without inversion for better performance
          );
          
          // If QR code found
          if (qrCode) {
            console.log('QR code detected:', qrCode.data);
            processQRCode(qrCode.data);
            stopScanning();
          }
        } catch (err) {
          console.error('QR scanning error:', err);
        }
      }
    }, 200); // Slightly longer interval for better performance
  };

  const processQRCode = async (data) => {
    // Process any QR code and fetch merchant data
    try {
      setScanResult({ raw: data });
      setIsVerifying(true);
      
      // Extract merchant ID from QR data (in real app, you'd parse the QR properly)
      // This is a simplified example - assuming the QR contains a merchant ID
      const merchantId = extractMerchantId(data);
      
      // Fetch merchant data from Firebase (with error handling)
      try {
        if (db) {
          const merchantRef = doc(db, "merchants", merchantId || "default");
          const merchantSnap = await getDoc(merchantRef);
          
          if (merchantSnap.exists()) {
            // Get merchant data
            const merchant = merchantSnap.data();
            setMerchantData(merchant);
          } else {
            // If no specific merchant found, use dummy data
            useDummyMerchantData();
          }
        } else {
          // If Firebase isn't initialized, use dummy data
          useDummyMerchantData();
        }
      } catch (firebaseError) {
        console.error("Firebase error:", firebaseError);
        useDummyMerchantData();
      }
      
      setIsVerifying(false);
    } catch (error) {
      console.error("Error processing QR code:", error);
      setError("Could not process QR code");
      setIsVerifying(false);
    }
  };
  
  const useDummyMerchantData = () => {
    setMerchantData({
      id: "M12345",
      name: "Utkarsh Patil",

      location: "Sangli, India",
      upiId: "7620114131@ibl",
      pin: "1234", // In production, never store plain PINs
      logo: "https://surli.cc/rcfwmo",
      verified: true
    });
  };
  
  const extractMerchantId = (qrData) => {
    // Simplified example - in real app, you'd parse the QR properly
    // This just extracts any alphanumeric string that could be an ID
    const match = qrData.match(/mid=([A-Za-z0-9]+)/);
    return match ? match[1] : null;
  };

  const stopScanning = () => {
    console.log('Stopping scanner');
    
    // Clear scanning interval
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    
    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
    console.log('Scanning stopped');
  };

  const handleScanClick = () => {
    setError(null);
    if (!isScanning) {
      setScanResult(null);
      setMerchantData(null);
      setPinVerified(false);
      setShowSuccess(false);
      setPinInput('');
      setIsScanning(true);
      startCamera();
    } else {
      stopScanning();
    }
  };

  const handleTryAgain = () => {
    setError(null);
    setScanResult(null);
    setMerchantData(null);
    setPinVerified(false);
    setShowSuccess(false);
    setPinInput('');
    setIsScanning(true);
    startCamera();
  };
  
  const handlePinChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPinInput(value);
    }
  };
  
  const verifyPin = async () => {
    setIsVerifying(true);
    
    try {
      // In a real app, you would verify the PIN securely with Firebase
      // Here we're just simulating a verification with the dummy data
      setTimeout(() => {
        if (pinInput === (merchantData?.pin || "1234")) {
          setPinVerified(true);
          setShowSuccess(true);
        } else {
          setError("Incorrect PIN. Please try again.");
        }
        setIsVerifying(false);
      }, 1000);
    } catch (error) {
      console.error("Error verifying PIN:", error);
      setError("PIN verification failed");
      setIsVerifying(false);
    }
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    verifyPin();
  };
  
  const closeSuccessPopup = () => {
    setShowSuccess(false);
    setScanResult(null);
    setMerchantData(null);
    setPinVerified(false);
    setPinInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      {/* Video element to display camera feed */}
      {isScanning && (
        <div className="relative mb-4 rounded-lg overflow-hidden w-full aspect-square bg-black">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />
          {/* Canvas for processing QR code - hidden from view */}
          <canvas 
            ref={canvasRef} 
            className="hidden" 
          />
          <div className="absolute inset-0 border-2 border-white/20 rounded-lg">
            <div className="absolute inset-16 border-2 border-white/50 rounded-lg flex items-center justify-center">
              <div className="text-white/70 text-sm">Position QR code here</div>
            </div>
          </div>
          
          {/* Scanning indicator */}
          <div className="absolute top-4 left-4 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-white text-sm">Scanning...</span>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="w-full p-4 bg-red-100 text-red-800 rounded-lg mb-4">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-700 hover:text-red-900"
          >
            Dismiss
          </button>
        </div>
      )}
      
      {/* Merchant Details */}
      {merchantData && !showSuccess && (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg mb-4 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mr-4">
              {merchantData.logo ? (
                <img src={merchantData.logo} alt="Merchant logo" className="w-full h-full object-cover" />
              ) : (
                <div className="text-2xl font-bold text-gray-400">
                  {merchantData.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{merchantData.name}</h3>
              <p className="text-sm text-gray-600">{merchantData.businessType}</p>
              <p className="text-sm text-gray-600">{merchantData.location}</p>
            </div>
          </div>
          
          {/* Payment info */}
          <div className="border-t border-b border-gray-200 py-3 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">UPI ID</span>
              <span className="font-medium">{merchantData.upiId}</span>
            </div>
            {scanResult?.amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₹{scanResult.amount}</span>
              </div>
            )}
          </div>
          
          {/* PIN Verification */}
          <form onSubmit={handleSubmitPin}>
            <label className="block text-sm font-medium text-white mb-1">
              Enter PIN to confirm payment
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={handlePinChange}
              className="block w-full border bg-white border-white rounded-md px-3 py-2 mb-4 text-center text-xl tracking-widest"
              placeholder="••••"
              maxLength={4}
              required
              disabled={isVerifying}
            />
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
                disabled={pinInput.length !== 4 || isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Pay Now'}
              </button>
              
              <button
                type="button"
                onClick={handleTryAgain}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Success popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center mb-1">Payment Successful!</h3>
            <p className="text-gray-600 text-center mb-6">
              Your payment to {merchantData?.name} has been completed successfully.
            </p>
            <button
              onClick={closeSuccessPopup}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* Scanner button - only show if not showing merchant details or success */}
      {!scanResult && !merchantData && !showSuccess && (
        <>
          <button
            onClick={handleScanClick}
            className={`flex items-center justify-center w-16 h-16 rounded-lg transition-all ${
              isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800 active:bg-gray-900'
            }`}
            aria-label={isScanning ? 'Stop scanning' : 'Scan QR code'}
          >
            <Camera
              size={28}
              className="text-white"
            />
          </button>
          
          {/* Button label */}
          <span className="text-sm mt-2">
            {isScanning ? 'Cancel' : 'Scan QR Code'}
          </span>
        </>
      )}
      
      {/* Debug info - remove in production */}
      {isScanning && process.env.NODE_ENV !== 'production' && (
        <div className="text-xs text-white mt-2">
          Camera active: {streamRef.current ? 'Yes' : 'No'} | 
          Scanner interval: {scanIntervalRef.current ? 'Running' : 'Stopped'}
        </div>
      )}
    </div>
  );
};

export default ScannerButton;