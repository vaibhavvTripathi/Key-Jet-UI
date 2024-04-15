import { useEffect, useState } from "react";

export const useCounter = (
  initialCount: number,
  limit: number,
  delta: number
) => {
  const [counter, setCounter] = useState<number>(
    Math.floor(initialCount / 1000)
  );
  console.log(counter, limit);
  useEffect(() => {
    if (delta>0 && counter >= limit) return;
    if (delta<0 && counter <= limit) return;
    console.log("rendering");
    const interval = setInterval(() => {
      setCounter((prev) => prev + delta);
    }, 1000);
    return () => clearInterval(interval);
  }, [counter, limit]);
  return counter;
};
