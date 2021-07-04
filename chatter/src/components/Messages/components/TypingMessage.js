import React, { useEffect, useState } from 'react';

export default function Typing() {
  const [numberOfDots, setDots] = useState(1);

  const incrementDots = () => {
    setDots(numberOfDots === 3 ? 1 : numberOfDots + 1);
  };

  useEffect(() => {
    const timeout = setTimeout(incrementDots, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [numberOfDots]);

  return (
    <p
      className="messages__message messages__message--typing"
      key="typing"
    >
      {/* padStart is an experimental technology */}
      {`Typing${''.padStart(numberOfDots, '.')}`}
    </p>
  );
}
