import React, { useState } from 'react';

const PaymentCategorization = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
    
  const categories = [
    { id: 'food', label: 'Food' },
    { id: 'travel', label: 'Travel' },
    { id: 'health', label: 'Health' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'monthlyBill', label: 'Monthly Bill' },
    { id: 'groupSharing', label: 'Group Sharing' },
    { id: 'lend', label: 'Lend' },
    { id: 'others', label: 'Others' }
  ];
    
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
    
  return (
    <div className="flex justify-top items-center bg-sky-200">
      <div className="bg-white border-b-2 rounded-b-md shadow-lg pt-20 pb-20 p-7 max-w-md w-87">
        <div className="flex justify-center mb-3">
          <div className="bg-green-400 rounded-full w-16 h-16 mt-0 flex items-center justify-center animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
                
        <h2 className="text-2xl font-bold text-center mb-20">Payment Done</h2>
        <hr className='mb-4 border-t-2 w-87 -ml-7'></hr>
                
        <div className="mb-4">
          <h3 className="text-xl font-medium text-center mb-10 ">Categories</h3>
                    
          <div className="grid grid-cols-2 gap-7">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="radio"
                  id={category.id}
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2 h-5 w-5"
                />
                <label htmlFor={category.id} className="text-gray-800">
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCategorization;