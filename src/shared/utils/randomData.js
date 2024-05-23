export const generateIncreasingNumbers = (count, name) => {
  const data = [];
  let currentNumber = 0;

  for (let i = 0; i < count / 10; i++) {
    // Increment the current number by 10
    currentNumber += 10;

    // If the current number exceeds the desired count, adjust it
    if (currentNumber > count) {
      currentNumber = count;
    }

    data.push({
      name: name,
      number: currentNumber,
    });
  }
  return data;
};
