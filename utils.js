const { BadRequestError } = require("./expressError");

/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

/** Converts an arr of strs to nums if not a valid number, throw an error, else return new array of nums */
function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let numbers = [];

  for (let i = 0; i < strNums.length; i++) {
    let convertNum = Number(strNums[i]);

    if (isNaN(convertNum)) {
      throw new BadRequestError(`${strNums[i]} is not a valid number`);
    } else {
      numbers.push(convertNum);
    }
  }

  return numbers;
}

module.exports = { convertStrNums };
