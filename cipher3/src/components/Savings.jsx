import React from 'react';
import { ArrowLeft, MoreVertical, User } from 'lucide-react';

const SavingsTracker = () => {
  // Sample data
  const streakDays = 5;
  const savedAmount = 2500;
  const goalAmount = 5000;
  const goalPercentage = (savedAmount / goalAmount) * 100;
  
  const leaderboard = [
    { name: 'Utkarsh', rank: 1, amount: '₹500'},
    { name: 'Anushka', rank: 2, amount: '₹350' },
    { name: 'Anuj', rank: 3, amount: '₹290' },
    { name: 'Ishaan', rank: 4, amount: '₹0' }
  ];

  return (
    <div className="w-[500] rounded-b-md bg-white -mt-2 mb-6">
      {/* Header */}
      <div className="border-b-2 border-black py-1 px-4 flex justify-between items-center">
        <p className="text-2xl pb-1 pl-27 font-small">Savings</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Savings Streak */}
        <div className="border-2 border-black bg-[#bae6fd] bg-opacity-50 rounded-lg p-2">
          <p className="text-lg font-medium text-blue-900 mb-4 ml-2">Savings Streak</p>
          <div className="relative h-2 bg-gray-300 rounded-full mb-2">
            <div 
              className="absolute top-0 left-0 h-2 bg-green-500 rounded-l-full" 
              style={{ width: '40%' }} // Adjust based on streak
            ></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-10">
              <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-orange-200 rounded-full flex items-center justify-center"></div>
              </div>
            </div>
          </div>
          <div className="flex mt-4">
            <p className="text-black ml-2">{streakDays} Days Streaks</p>
            <p className="text-black ml-20">Keep It Up !</p>
          </div>
        </div>

        {/* Savings Goals */}
        <div className="border-2 border-black rounded-lg p-2">
          <p className="text-lg text-blue-900 font-medium mb-2 ml-2">Savings Goals</p>
          <div className="flex items-center mb-2">
            <span className="font-medium ml-2">₹</span>
            <span className="font-medium">{savedAmount}/{goalAmount}</span>
          </div>
          <div className="relative h-2 bg-gray-300 rounded-full mb-2">
            <div 
              className="absolute top-0 left-0 h-2 bg-green-500 rounded-l-full" 
              style={{ width: `${goalPercentage}%` }}
            ></div>
          </div>
          <p className="text-black ml-2 pt-1">{goalPercentage}% of Goal Achieved</p>
        </div>

        {/* Leaderboard */}
        <div className="border-2 border-black rounded-lg p-4">
          <p className="font-medium text-xl text-center mb-4">Leaderboard</p>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className="flex items-center justify-between bg-gray-100 rounded-full px-2 py-2"
              >
                <div className="flex items-center justify-evenly">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <User size={14} />
                  </div>
                  <span>{user.name} {user.amount}</span>
                </div>
                <div className="w-6 h-6 bg-[#bae6fd] rounded-full flex items-center justify-center border border-gray-300">
                  <span className="text-md">{user.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;