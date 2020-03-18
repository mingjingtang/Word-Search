//Model
function createBoard() {
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

  //put random letter in to the board
  const testBoard = [];
  for (let i = 0; i < 3; i++) {
    const arr = [];
    for (let j = 0; j < 3; j++) {
      let randomNum = Math.round(Math.random() * (letters.length - 1 - 0) + 0);
      arr.push(letters[randomNum]);
    }
    testBoard.push(arr);
  }

  console.log(testBoard);

  //check valid board
  const testArr = [
    ["a", "b", "c"],
    ["p", "e", "n"],
    ["j", "d", "k"]
  ];

  //check row
  for (let i = 0; i < 3; i++) {
    const letter = testArr[i].join("");
    console.log(letter);

    const wordObject = fetchData(letter);

    wordObject.then(res => {
      const wordString = JSON.stringify(wordObject);
      console.log(wordString);

      // const wordStringLower = wordString.toLowerCase();
      // console.log(wordStringLower);
    });
  }

  //check column

  //check cross
}

async function fetchData(letter) {
  try {
    const key = "6669422e-7427-45f8-9a37-1a52cd589c10";
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${letter}?key=${key}`;

    let res = await fetch(url);
    let jsonObject = await res.json();
    if (typeof jsonObject[0] == "object") {
      console.log(jsonObject[0].hwi.hw);
      return jsonObject[0].hwi.hw;
    } else {
      console.log("not a word");
    }
  } catch (err) {
    console.log(err);
  }
}

//view
window.onload = () => {};

//control

class letterObject {
  constructor(letter, number) {
    this.letter = letter;
    this.number = number;
  }
}

function sortWordArr(wordArrSolution) {
  for (let d = 0; d < wordArrSolution.length; d++) {
    let eachWordSorted = wordArrSolution[d]
      .split("")
      .sort()
      .join("");
    wordArrSolution[d] = eachWordSorted;
    console.log(wordArrSolution[d]);
  }
}

function createNewBoard(wordArr) {
  countWin = 0;
  document.querySelector("#round").innerHTML =
    round === 1 ? "Round 1" : "Round 2";
  for (let j = 0; j < allBox.length; j++) {
    allBox[j].innerHTML = wordArr[j];
  }
}

function clearBoard(wordArr) {
  clickedBox = [];
  letterCollected = "";
  win = false;
  for (let j = 0; j < allBox.length; j++) {
    allBox[j].style.backgroundColor = "rgb(245, 239, 228)";
    allBox[j].innerHTML = wordArr[j];
  }
}

function clearRound(wordArr) {
  clickedBox = [];
  letterCollected = "";
  win = false;
  countWin = 0;
  document.getElementById("changeScore").innerHTML = "0";
  for (let j = 0; j < wordArr2.length; j++) {
    allBox[j].style.backgroundColor = "rgb(245, 239, 228)";
    allBox[j].innerHTML = "";
  }
  document.querySelector(".sidebar").innerHTML = "";
}

function addListener() {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].addEventListener("click", () => {
      checkColor(allBox[i], i);
      clickBoxNum3();
    });
  }
}

function checkColor(box, i) {
  let boxColor = window
    .getComputedStyle(box, null)
    .getPropertyValue("background-color");
  if (boxColor === "rgb(245, 239, 228)") {
    box.style.backgroundColor = "rgb(0, 151, 218)";
    createNewLetterObject(box, i);
  } else {
    box.style.backgroundColor = "rgb(245, 239, 228)";
    removeLetterObject(box, i);
  }
}

function createNewLetterObject(box, i) {
  let clickedLetter = box.innerHTML;
  let clickLetterboxNum = i;
  let newLetter = new letterObject(clickedLetter, clickLetterboxNum);
  clickedBox.push(newLetter);
  console.log(clickedBox);
}

function removeLetterObject(box, i) {
  for (let j = 0; j < clickedBox.length; j++) {
    if (i === clickedBox[j].number) {
      clickedBox.splice(j, 1);
      let currentLetter = box.innerHTML;
      console.log(currentLetter);
      console.log(clickedBox);
    }
  }
}

function clickBoxNum3() {
  if (clickedBox.length === 3) {
    sortClickedBox();

    if (round === 1) {
      checkWin(wordArr1Solution);
      if (win) {
        console.log("you find one word!");
        countWin++;
        console.log(countWin);
        document.getElementById("changeScore").innerHTML = countWin;
      } else {
        console.log("you lose!");
      }
      clearBoard(wordArr1);
    } else {
      checkWin(wordArr2Solution);
      if (win) {
        console.log("you find one word!");
        countWin++;
        console.log(countWin);
        document.getElementById("changeScore").innerHTML = countWin;
      } else {
        console.log("you lose!");
      }
      clearBoard(wordArr2);
    }

    if (countWin === 3 && round === 1) {
      alert("You win round 1, do you want to play round 2?");
      round++;
      clearRound();
      createNewBoard(wordArr2);
    }
    if (countWin === 4 && round === 2) {
      alert(
        "Finished round 2! Congrats! " + localStorage.getItem("playerName")
      );
      window.location.replace("./login.html");
    }
  }
}

function sortClickedBox() {
  clickedBox.sort(function(a, b) {
    let textA = a.letter.toUpperCase();
    let textB = b.letter.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  console.log(clickedBox);
}

function checkWin(wordArrSolution) {
  letterCollected = "";
  for (let k = 0; k < 3; k++) {
    letterCollected += clickedBox[k].letter;
    console.log("collect letter " + letterCollected);
  }
  for (let k = 0; k < wordArrSolution.length; k++) {
    if (
      letterCollected ===
      wordArrSolution[k]
        .split("")
        .sort()
        .join("")
    ) {
      win = true;
      showLetterOnSideBar(wordArrSolution[k]);
      wordArrSolution.splice(k, 1);
      break;
    }
  }
}

function showLetterOnSideBar(candidate) {
  document.querySelector(".sidebar").innerHTML += candidate + "<br />";
}
