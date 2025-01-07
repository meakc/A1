// AnimatedNumber.js
import React, { useEffect, useState } from 'react';

function AnimatedNumber({ label, value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const totalDuration = 2000; // Total animation duration in milliseconds
    const incrementTime = Math.abs(Math.floor(totalDuration / (end - start)));

    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat-item">
      <h3>{displayValue}</h3>
      <p>{label}</p>
    </div>
  );
}

export default AnimatedNumber;