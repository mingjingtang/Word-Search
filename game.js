window.onload = () => {
    let wordArr1 = ['m', 'a', 'y', 'e', 'f', 'o', 'n', 'g', 'u'];
    let wordArr1Solution = ['may', 'men', 'you'];
    let wordArr2 = ['b', 'i', 't', 'c', 'a', 'r', 'e', 'e', 'd'];
    let wordArr2Solution = ['bad', 'car', 'eat'];
    sortWordArr(wordArr1Solution);
    sortWordArr(wordArr2Solution);

    let clickedBox = [];
    let letterCollected = '';
    let win = false;
    let countWin;
    let round = 1;
    let allBox = document.querySelectorAll(".boxes");
    console.log(allBox);
    addListener();


    createNewBoard(wordArr1);



    class letterObject {
        constructor(letter, number) {
            this.letter = letter;
            this.number = number;
        }
    }

    function sortWordArr(wordArrSolution) {
        for (let d = 0; d < wordArrSolution.length; d++) {
            let eachWordSorted = wordArrSolution[d].split('').sort().join('');
            wordArrSolution[d] = eachWordSorted;
            console.log(wordArrSolution[d]);
        }
    }

    function createNewBoard(wordArr) {
        countWin = 0;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].innerHTML = wordArr[j];
        }
    }

    function clearBoard(wordArr){
        clickedBox = [];
        letterCollected = '';
        win = false;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = wordArr[j];
        }
    }

    function clearRound(wordArr){
        // allBox = document.querySelectorAll(".boxes");
        // console.log(allBox);
        clickedBox = [];
        letterCollected = '';
        win = false;
        countWin = 0;
        document.getElementById('changeScore').innerHTML = '0';
        for (let j = 0; j < wordArr2.length; j++) {
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = '';
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

            if(round === 1){
                checkWin(wordArr1Solution);
                if (win === true) {
                    console.log('you find one word!');
                    countWin++;
                    console.log(countWin);
                    document.getElementById('changeScore').innerHTML = countWin;
                }
                else {
                    console.log("you lose!");
                }
                clearBoard(wordArr1);
            }
            else{
                checkWin(wordArr2Solution);
                if (win === true) {
                    console.log('you find one word!');
                    countWin++;
                    console.log(countWin);
                    document.getElementById('changeScore').innerHTML = countWin;
                }
                else {
                    console.log("you lose!");
                }
                clearBoard(wordArr2);
            }

            if(countWin === 3){
                if(round === 1){
                    alert('You win round 1, do you want to play round 2?');
                    round++;
                    clearRound();
                    createNewBoard(wordArr2);
                }
                else{
                    alert("Finished 2 round! Good on you!");
                }
            }
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


    function checkWin(wordArrSolution) {
        letterCollected = '';
        for (let k = 0; k < 3; k++) {
            letterCollected += clickedBox[k].letter;
            console.log("collect letter " + letterCollected);
        }
        for (let k = 0; k < wordArrSolution.length; k++) {
            if (letterCollected === wordArrSolution[k]) {
                win = true;
            }
        }
    }
}


