import React, { useState } from "react";
import ScannerButton from "./ScannerButton";

const PaymentApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isButtonOpen, setisButtonOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-[#bae6fd]">
      <div className="relative w-[100px] pb-2 bg-white shadow-xl h-500 rounded-b-md overflow-hidden">
        {/* Header with search bar */}
        <div className="p-4 border-b-2 border-black">
          <div className="flex items-center justify-evenly border-2 border-black rounded-md">
            <div>
              <img
                class="w-12 h-11 mb-1.5 -ml-2"
                src="./images/deer.png"
                alt=""
              />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="           Hi, Utkarsh"
              className="outline-none text-md bg-white"
            />
            <div className="w-6 h-6 pl-25 ">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Wallet section */}
        <div className="m-4 bg-[#bae6fd] border-2 rounded-md p-3 shadow-md">
          <div className="flex justify-between ring-2 ring-white ring-inset shadow-md p-3 pl-1 items-center">
            <div>
              <div className="text-m font-medium text-gray-70">WALLET</div>
              <div className="flex flex-col items- mt-11">
                <span className="text-sm text-gray-600">Current Balance</span>
                <span className="text-xl font-bold">₹460</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-600 py-0.5">Monthly Limit</div>
              <div className="text-sm font-medium">₹ 2000</div>
              <button1 className="mt-10 mb-1.5 bg-black text-white hover:bg-white hover:text-black p text-xs font-bold rounded">
                ADD
              </button1>
            </div>
          </div>
        </div>

        {/* Main action buttons */}
        <div className="mx-4 mb-5 p-3 shadow-lg border-2 border-black rounded-md">
          <div className="grid grid-cols-3 gap-3">
            {/* Row 1 */}
            <button className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/card.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Pay to UPI ID</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/recharge.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Mobile Recharge</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/contacts.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Pay Contacts</span>
            </button>

            {/* Row 2 */}
            <button className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/wallet.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Wallet Transfer</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-10 h-10rounded-md flex items-center justify-center mb-3">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/priorities.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Priorities</span>
            </button>

            <button className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-md flex items-center justify-center mb-2">
                <div>
                  <img
                    class="w-12 h-11 mb-1.5"
                    src="./images/history.png"
                    alt=""
                  />
                </div>
              </div>
              <span className="text-xs text-center">Transaction History</span>
            </button>
          </div>

          {/* QR Scanner Button */}
          <div className="flex justify-center mt-1 pb-3">
            {!isButtonOpen ? (
              <button
                onClick={() => {
                  // console.log("hii")
                  setisButtonOpen(true);
                }}
                className="w-15 h-15 bg-black rounded-full shadow-xl flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="50"
                  height="35"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" />
                </svg>
              </button>
            ) : (
              ""
            )}
            {isButtonOpen ? <ScannerButton /> : ""}
            {/* <ScannerButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentApp;
