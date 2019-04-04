window.onload = () => {
    let wordArr1 = ['m', 'a', 'y', 'e', 'f', 'o', 'n', 'g', 'u'];
    let wordArr1Solution = ['may', 'men', 'you'];

    let clickedBox = [];
    let letterCollected = '';
    let win;
    let countWin;
    sortWordArr();
    let allBox = document.querySelectorAll(".boxes");
    console.log(allBox);


    function sortWordArr() {
        for (let d = 0; d < wordArr1Solution.length; d++) {
            let eachWordSorted = wordArr1Solution[d].split('').sort().join('');
            console.log(eachWordSorted);
            wordArr1Solution[d] = eachWordSorted;
        }
    }

    function createNewBoard() {
        clickedBox = [];
        // countWin = 0;
        letterCollected = '';
        win = false;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = wordArr1[j];
        }
    }

    class letterObject {
        constructor(letter, number) {
            this.letter = letter;
            this.number = number;
        }
    }

    createNewBoard();
    addListener();


    function addListener() {
        for (let i = 0; i < allBox.length; i++) {
            allBox[i].addEventListener('click', () => {
                checkColor(allBox[i],i);
                clickBoxNum3();
            });
        }
    }

    function checkColor(box,i) {
        //get current color of the box.
        let boxColor = window.getComputedStyle(box, null).getPropertyValue('background-color');
        if (boxColor === "rgb(255, 255, 255)") {
            //if is white, change color to red
            box.style.backgroundColor = "#ff0000";
            createNewLetterObject(box,i);
        } else {
            //if is red, change to white
            box.style.backgroundColor = "#ffffff";
            removeLetterObject(box,i);
        }
    }


    function createNewLetterObject(box,i) {
        //create new letterObject, add to clickedBox
        let clickedLetter = box.innerHTML;
        let clickLetterboxNum = i;
        let newLetter = new letterObject(clickedLetter, clickLetterboxNum);
        clickedBox.push(newLetter);
        console.log(clickedBox);
    }


    function removeLetterObject(box,i) {
        //remove letterObject
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
        //if clickedBox hit 3, sort box, check win
        if (clickedBox.length === 3) {
            sortClickedBox();
            checkWin();
            if (win === true) {
                console.log('you win!');
                // createNewBoard();
                // addListener();
            } else {
                console.log("you lose!");
                // createNewBoard();
                // addListener();
            }
        }
    }

    function sortClickedBox() {
        // clickedBox.sort(compare);
        // function compare(a, b) {
        //     return a.number - b.number;
        // }

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


