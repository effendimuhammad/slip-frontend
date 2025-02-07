import { useEffect } from "react";

function Clock({ onTimeChange }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const date = now.getDate().toString().padStart(2, "0");
      const dayIndex = now.getDay();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = daysOfWeek[dayIndex];
      const timeString = `${dayName}, ${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;

      onTimeChange(timeString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimeChange]);

  return null; // Komponen ini tidak perlu merender apa pun
}

export default Clock;
