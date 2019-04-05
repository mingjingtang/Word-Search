window.onload = () => {
    let wordArr1 = ['M', 'A', 'Y', 'E', 'F', 'O', 'N', 'G', 'U'];
    let wordArr1Solution = ['MAY', 'MEN', 'YOU'];
    let wordArr2 = ['B', 'I', 'T', 'C', 'A', 'R', 'E', 'E', 'D'];
    let wordArr2Solution = ['BAD', 'CAR', 'EAT', 'BIT', 'ICE'];
    // sortWordArr(wordArr1Solution);
    // sortWordArr(wordArr2Solution);

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
        document.querySelector('#round').innerHTML = (round === 1) ? "Round 1": "Round 2";
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].innerHTML = wordArr[j];
        }
    }

    function clearBoard(wordArr){
        clickedBox = [];
        letterCollected = '';
        win = false;
        for (let j = 0; j < allBox.length; j++) {
            allBox[j].style.backgroundColor = "rgb(245, 239, 228)";
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
            allBox[j].style.backgroundColor = "rgb(245, 239, 228)";
            allBox[j].innerHTML = '';
        }
        document.querySelector(".sidebar").innerHTML = '';
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
        if (boxColor === "rgb(245, 239, 228)") {
            box.style.backgroundColor = "rgb(0, 151, 218)";
            createNewLetterObject(box,i);
        } else {
            box.style.backgroundColor = "rgb(245, 239, 228)";
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
                if (win) {
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
                if (win) {
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
                    alert("Finished 2 round! Congrats! " + localStorage.getItem("playerName"));
                    window.location.replace('./login.html');
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
            if (letterCollected === wordArrSolution[k].split('').sort().join('')) {
                win = true;
                showLetterOnSideBar(wordArrSolution[k]);
                wordArrSolution.splice(k,1);
                break;
            }
        }
    }

    function showLetterOnSideBar(candidate) {
        document.querySelector(".sidebar").innerHTML += candidate + "<br />";
    }
}


