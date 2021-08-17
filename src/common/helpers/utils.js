const utils = {
  shuffleArray(array) {
    try {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
  isSequential(array) {
    try {
      const arrDifferences = array.slice(1).map((item, index) => {
        return item - array[index];
      });
      const isSequential = arrDifferences.every((value) => value == 1);

      return isSequential;
    } catch (err) {
      let errorMsg = `Error ! Msg: ${err.message}`;

      console.log(errorMsg);

      throw errorMsg;
    }
  },
};

export default utils;
