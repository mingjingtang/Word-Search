//Model
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

  for (let i = 0; i < 3; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) {
      let randomNum = Math.round(Math.random() * (letters.length - 1 - 0) + 0);
      arr.push(letters[randomNum]);
    }
    testBoard.push(arr);
  }

  return testBoard;
};

//fake test board
const testArr = [
  ["a", "b", "c"],
  ["p", "e", "n"],
  ["j", "d", "k"]
];

const testValidBoard = (async function() {
  //check row
  let result = testArr.map(async row => {
    let letter = row.join("");

    //keep fetch word
    return await fetchData(letter)
      .then(data => {
        if (typeof data[0] == "object") {
          return data[0].hwi.hw.toLowerCase();
        }
      })
      .catch(err => console.log(err));
  }); // promise - result

  //word found array
  let wordInDic = await Promise.all(result);
  console.log(wordInDic);

  //check column

  //check cross
})();

async function fetchData(letter) {
  try {
    const key = "6669422e-7427-45f8-9a37-1a52cd589c10";
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${letter}?key=${key}`;
    return await (await fetch(url)).json();
  } catch (err) {
    console.log(err);
  }
}

//view

//control
