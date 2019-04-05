
let submitButton = document.getElementById("arrow");

submitButton.addEventListener("click", function(){
    let name = document.getElementById('name').value;
    localStorage.setItem( 'playerName', name);
});
