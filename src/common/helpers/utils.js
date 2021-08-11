const utils = {
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  isSequential(array) {
    const arrDifferences = array.slice(1).map((item, index) => {
      return item.number - array[index].number;
    });
    const isSequential = arrDifferences.every((value) => value == 1);

    return isSequential;
  },
};

export default utils;
