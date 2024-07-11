export const answerLength = (answer: string): string => {
  console.log(answer);
  // takes a string and returns the length of the string
  // if the string is "Paris" it returns "5"
  // but if the string is "New York" it returns "3, 4"

  return answer
    .split(" ")
    .map((word) => word.length)
    .join(", ");
};
