//Model
async function fetchData(letter) {
  try {
    const key = "6669422e-7427-45f8-9a37-1a52cd589c10";
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${letter}?key=${key}`;
    return await (await fetch(url)).json();
  } catch (err) {
    console.log(err);
  }
}

async function checkInDic(letter) {
  return await fetchData(letter)
    .then(data => {
      if (typeof data[0] == "object") {
        return data[0].hwi.hw.toLowerCase();
      }
    })
    .catch(err => console.log(err));
}

const createBoard = function() {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const testBoard = [];

  for (let i = 0; i < 5; i++) {
    const arr = [];
    for (let j = 0; j < 5; j++) {
      let randomNum = Math.round(Math.random() * (letters.length - 1 - 0) + 0);
      arr.push(letters[randomNum]);
    }
    testBoard.push(arr);
  }
  return testBoard;
};

async function createArr(arrType, arr) {
  let resultArr = [];
  let letterCollect = "";

  if (arrType == "row") {
    for (let i = 0; i < arr.length; i++) {
      letterCollect = arr[i].join("");
      resultArr.push(letterCollect);
    }
  } else if (arrType == "col") {
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0; j < arr.length; j++) {
        letterCollect += arr[j][i];
      }
      resultArr.push(letterCollect);
      letterCollect = "";
    }
  } else if (arrType == "cross") {
    let i = 0;
    let j = 0;
    while (i < arr.length && j < arr[0].length) {
      letterCollect += arr[i][j];
      i++;
      j++;
    }
    resultArr.push(letterCollect);
    letterCollect = "";
    (i = 0), (j = arr[0].length - 1);
    while (i < arr.length && j >= 0) {
      letterCollect += arr[i][j];
      i++;
      j--;
    }
    resultArr.push(letterCollect);
  }
  return resultArr;
}

let countTotalWordExist = 0;
let checkType = ["row", "col", "cross"];
const testBoard = createBoard();

const testValidBoard = (async function() {
  const allTypeOfArrs = checkType.map(async eachType => {
    return createArr(eachType, testBoard);
  });
  const twoDArr = await Promise.all(allTypeOfArrs);

  const mergedTwoDArr = [];
  for (let i = 0; i < twoDArr.length; i++) {
    mergedTwoDArr.push(...twoDArr[i]);
  }
  console.log(mergedTwoDArr);

  const letterOrUndefine = mergedTwoDArr.map(async letter => {
    return checkInDic(letter);
  });
  const finalArr = await Promise.all(letterOrUndefine);
  console.log(finalArr);

  const answerArr = [];
  finalArr.forEach(item => {
    if (item != undefined && item.length == 3) {
      countTotalWordExist++;
      answerArr.push();
    }
  });

  countTotalWordExist >= 3 ? console.log(true) : console.log(false);
  return countTotalWordExist >= 3 ? true : false;
})();

//view

//control
