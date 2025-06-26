import React, { useState } from "react";
import guest from "./guest";

const App = () => {
  const [guestName, setGuestName] = useState(
    guest.map((g) => ({ ...g, checkedIn: false }))
  );
  const [searchInput, setSearchInput] = useState("");
  const [matchedGuest, setMatchedGuest] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [hasAcceptedGuest, setHasAcceptedGuest] = useState(false);
  const [acceptGuest, setAcceptedGuest] = useState("Accept Guest");
  const [checkInCount, setCheckInCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function searchName() {
    setIsLoading(true);

    setTimeout(() => {
      const result = guestName.find(
        (guest) =>
          guest.name.toLowerCase().trim() === searchInput.toLowerCase().trim()
      );

      if (result) {
        setMatchedGuest(result);
        setNotFound(false);
      } else {
        setMatchedGuest(null);
        setNotFound(true);
        setSearchInput("");
        setTimeout(() => {
          setNotFound(false);
        }, 3000);
      }

      setIsLoading(false);
    }, 2000);
  }

  function onWelcome() {
    if (matchedGuest && !matchedGuest.checkedIn) {
      const timeStamp = new Date().toLocaleString();
      const updatedGuestList = guestName.map((guest) =>
        guest.id === matchedGuest.id
          ? { ...guest, checkedIn: true, time: timeStamp }
          : guest
      );
      console.log(updatedGuestList);
      setGuestName(updatedGuestList);
      setHasAcceptedGuest(true);
      setSearchInput("");
      setAcceptedGuest("Guest Accepted ✅");
      setCheckInCount((prev) => prev + 1);

      setTimeout(() => {
        setNotFound(false);
        setHasAcceptedGuest(false);
        setAcceptedGuest("Accept Guest");
        setMatchedGuest(null);
      }, 5000);
    }
  }

  const alreadyCheckedIn = matchedGuest?.checkedIn;

  return (
    <div className="bg-[#F9F9F9] items-center flex flex-col h-screen justify-center relative p-4">
      <div className="max-w-sm w-full bg-[#FFFFFF] flex flex-col p-[24px] justify-center shadow-[0_8px_20px_rgba(0,0,0,0.06)] rounded-2xl">
        <h1 className="font-bold text-[24px] mb-[16px]">Event Check-In</h1>

        <p className="text-sm text-gray-500 mb-[10px]">
          Checked in: {checkInCount} / {guestName.length}
        </p>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for name"
            className="w-full h-[40px] p-[10px] border border-gray-300 mb-[24px] rounded"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <button
            onClick={searchName}
            className="absolute right-0 top-0 w-[80px] h-[40px] bg-[#2563EB] text-white rounded-r"
          >
            Search
          </button>
        </div>

        {matchedGuest && !alreadyCheckedIn && (
          <p className="text-green-600 text-center mt-[20px] mb-[20px] border border-green-600 p-[10px] rounded">
            {matchedGuest.name} (ID: {matchedGuest.id})
          </p>
        )}

        {alreadyCheckedIn && (
          <p className="text-yellow-600 text-center mt-[20px] mb-[20px] border border-yellow-600 p-[10px] rounded">
            {matchedGuest.name} has already checked in at {matchedGuest.time}
          </p>
        )}

        {notFound && (
          <p className="text-red-500 text-center mt-[20px] mb-[20px] border border-red-500 p-[10px] rounded">
            Not a guest
          </p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-6 h-6 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-600">
              Searching guest...
            </span>
          </div>
        )}

        <button
          disabled={!matchedGuest || alreadyCheckedIn}
          onClick={onWelcome}
          className="w-full h-[45px] mt-[16px] bg-[#2563EB] text-white disabled:bg-gray-300 rounded"
        >
          {acceptGuest}
        </button>
      </div>

      {matchedGuest && hasAcceptedGuest && (
        <p className="text-center absolute top-0 text-white bg-green-500 w-full h-[45px] pt-[10px]">
          Welcome {matchedGuest.name} to GTFO 2025 ✅
        </p>
      )}
    </div>
  );
};

export default App;
