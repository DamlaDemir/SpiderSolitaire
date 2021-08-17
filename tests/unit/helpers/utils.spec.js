import utils from "@/common/helpers/utils.js";

let mockLog;

describe("utils.js", () => {
  beforeAll(() => {
    mockLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("shuffle function", () => {
    it("should return shuffled array when given array", () => {
      const array = [10, 9, 8, 7, 6];
      const arrayToShuffle = [10, 9, 8, 7, 6];

      const actualArray = utils.shuffleArray(array);

      expect(actualArray).not.toEqual(arrayToShuffle);
    });

    it("should throw error when given array is string", () => {
      const array = "String Array";
      const expectedError =
        "Error ! Msg: Cannot assign to read only property '11' of string 'String Array'";

      const actualArray = () => utils.shuffleArray(array);

      expect(actualArray).toThrowError(expectedError);

      expect(mockLog).toBeCalledWith(expectedError);
    });
  });

  describe("isSequential function", () => {
    it("should return true if the given array is sequential", () => {
      const array = [1, 2, 3, 4, 5];
      const expectedResult = true;

      const actualResult = utils.isSequential(array);

      expect(actualResult).toBe(expectedResult);
    });

    it("should return false if the given array isn't sequential", () => {
      const array = [1, 5, 12, 9, 7];
      const expectedResult = false;

      const actualResult = utils.isSequential(array);

      expect(actualResult).toBe(expectedResult);
    });

    it("should throw error when given array is string", () => {
      const array = "String Array";
      const expectedError =
        "Error ! Msg: array.slice(...).map is not a function";

      const actualArray = () => utils.isSequential(array);

      expect(actualArray).toThrowError(expectedError);

      expect(mockLog).toBeCalledWith(expectedError);
    });
  });
});
