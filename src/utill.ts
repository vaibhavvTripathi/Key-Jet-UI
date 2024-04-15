import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    return status;
  } else {
    return -1;
  }
};

export function calculateTypedWordsPercentage(
  wpm: number,
  timeSpent: number,
  totalWords: number,
  enabled : boolean
): number {
  if(!enabled) return 0;
  const expectedWordsTyped = Math.floor(wpm * (timeSpent / 60));
  const percentage = (expectedWordsTyped / totalWords) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}
