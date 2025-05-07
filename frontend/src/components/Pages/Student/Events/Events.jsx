import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styling

const eventData = {
  "2025-04-05": "Coding Competition",
  "2025-04-10": "Hackathon",
  "2025-04-15": "Alumni Meet",
  "2025-04-20": "Tech Workshop",
};

const Events = () => {
  const [date, setDate] = useState(new Date());
  const selectedDate = date.toISOString().split("T")[0];
  const event = eventData[selectedDate];

  return (
    <div className="flex flex-col items-center mt-5 p-4  calender">
      <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">
        Select a Date for Events
      </h2>

      <div className="bg-white shadow-lg p-4 rounded-lg w-full max-w-md">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date }) => {
            const key = date.toISOString().split("T")[0];
            return eventData[key] ? (
              <span className="text-sm text-red-500 font-bold">🎉</span>
            ) : null;
          }}
          className="w-full border-none"
        />
      </div>

      <div className="mt-4 w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-medium">Event on {selectedDate}:</h3>
        {event ? (
          <p className="text-lg text-blue-600 font-semibold mt-2">{event}</p>
        ) : (
          <p className="text-gray-500 mt-2">No event scheduled</p>
        )}
      </div>
    </div>
  );
};

export default Events;
