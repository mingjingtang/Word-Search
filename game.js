window.onload = () => {
    let wordArr1 = ['m', 'a', 'y', 'e', 'f', 'o', 'n', 'g', 'u'];
    let wordArr1Solution = ['may', 'men', 'you'];

    let clickedBox = [];
    let letterCollected = '';
    let win;
    let countWin;

    let allBox = document.querySelectorAll(".boxes");
    console.log(allBox);
    sortWordArr();
    createNewBoard();
    addListener();


    class letterObject {
        constructor(letter, number) {
            this.letter = letter;
            this.number = number;
        }
    }

    function sortWordArr() {
        for (let d = 0; d < wordArr1Solution.length; d++) {
            let eachWordSorted = wordArr1Solution[d].split('').sort().join('');
            console.log(eachWordSorted);
            wordArr1Solution[d] = eachWordSorted;
        }
    }

    function createNewBoard() {
        clickedBox = [];
        letterCollected = '';
        win = false;
        countWin = 0;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = wordArr1[j];
        }
    }

    function clearBoard(){
        clickedBox = [];
        letterCollected = '';
        win = false;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = wordArr1[j];
        }
    }

    function addListener() {
        for (let i = 0; i < allBox.length; i++) {
            allBox[i].addEventListener('click', () => {
                checkColor(allBox[i],i);
                clickBoxNum3();
            });
        }
    }

    function checkColor(box,i) {
        let boxColor = window.getComputedStyle(box, null).getPropertyValue('background-color');
        if (boxColor === "rgb(255, 255, 255)") {
            box.style.backgroundColor = "#ff0000";
            createNewLetterObject(box,i);
        } else {
            box.style.backgroundColor = "#ffffff";
            removeLetterObject(box,i);
        }
    }


    function createNewLetterObject(box,i) {
        let clickedLetter = box.innerHTML;
        let clickLetterboxNum = i;
        let newLetter = new letterObject(clickedLetter, clickLetterboxNum);
        clickedBox.push(newLetter);
        console.log(clickedBox);
    }


    function removeLetterObject(box,i) {
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
            checkWin();
            if (win === true) {
                console.log('you find one word!');
                countWin++;
                console.log(countWin);
            } else {
                console.log("you lose!");
            }
            clearBoard();
            // addListener();
        }
    }

    function sortClickedBox() {
        clickedBox.sort(function (a, b) {
            let textA = a.letter.toUpperCase();
            let textB = b.letter.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        console.log(clickedBox);
    }


    function checkWin() {
        letterCollected = '';
        for (let k = 0; k < 3; k++) {
            letterCollected += clickedBox[k].letter;
            console.log("collect letter " + letterCollected);
        }
        for (let k = 0; k < wordArr1Solution.length; k++) {
            if (letterCollected === wordArr1Solution[k]) {
                win = true;
            }
        }
    }
}


