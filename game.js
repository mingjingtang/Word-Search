
window.onload =  ()=> {
    let wordArr1 = ['m','a', 'y', 'e','f', 'o', 'n','g', 'u'];
    let wordArr1Solution = ['may', 'men','you'];

    let clickedBox = [];
    let userInput = '';
    let count;
    let allBox = document.querySelectorAll(".boxes");
    console.log(allBox);

    function createNewBoard() {
        clickedBox = [];
        userInput = '';
        count = 0;
        for(let j = 0; j < allBox.length; j++){
            allBox[j].style.backgroundColor = "#ffffff";
            allBox[j].innerHTML = wordArr1[j];
        }
    }

    class letterObject{
        constructor(letter, number){
            this.letter = letter;
            this.number = number;
        }
    }

    createNewBoard();
    addListener();


    function addListener(){
        for(let i = 0; i < allBox.length; i++) {
            allBox[i].addEventListener('click', () => {
                //get current color of the box.
                let boxColor = window.getComputedStyle(allBox[i], null).getPropertyValue('background-color');
                checkColor();

                function checkColor() {
                    if (boxColor === "rgb(255, 255, 255)") {
                        //if is white, change color to red
                        allBox[i].style.backgroundColor = "#ff0000";

                        //create new letterObject, add to clickedBox
                        let clickedLetter = allBox[i].innerHTML;
                        let clickLetterboxNum = i;
                        let newLetter = new letterObject(clickedLetter, clickLetterboxNum);
                        clickedBox.push(newLetter);
                        console.log(clickedBox);

                        //add letter to userInput string
                        console.log(allBox[i].innerHTML);

                        if (userInput.length <= 2){
                            userInput = userInput + allBox[i].innerHTML;
                        } else if (userInput.length === 3) {
                            sortClickedBox();
                            compareWin();
                            userInput = '';
                        }

                        console.log(userInput);
                    } else {
                        //if is red, change to white
                        allBox[i].style.backgroundColor = "#ffffff";

                        //remove letterObject, remove letter from userInput String
                        for (let j = 0; j < clickedBox.length; j++) {
                            if (i === clickedBox[j].number) {
                                clickedBox.splice(j, 1);
                                console.log(allBox[i].innerHTML);
                                userInput.replace(/allBox[i].innerHTML/g, '');
                                console.log(clickedBox);
                                console.log(userInput);
                            }
                        }

                        if(userInput.length === 3){
                            sortClickedBox();
                            compareWin();
                        }
                    }

                    function sortClickedBox() {
                        // clickedBox.sort(compare);

                        // function compare(a, b) {
                        //     return a.letter - b.letter;
                        // }

                        userInput = userInput.split('').sort().join('');

                        // console.log(clickedBox);
                    }


                    function compareWin() {
                        // for (let k = 0; k < 3; k++) {
                        //     userInput += clickedBox[k].letter;
                        //     console.log("userInput " + userInput);
                        // }

                        for (let d = 0; d < wordArr1Solution.length; d++) {
                            let eachWordSorted = wordArr1Solution[d].split('').sort().join('');

                            if (eachWordSorted === userInput) {
                                alert("You find one word!");
                                count++;
                                //record score
                                createNewBoard();
                                break;
                            }
                        }
                        checkColor();
                    }
                }

            });
        }
    }
}