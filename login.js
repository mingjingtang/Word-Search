let submitButton = document.getElementById("arrow");
let input = document.getElementById("name");

submitButton.addEventListener("click", function() {
  let name = document.getElementById("name").value;
  localStorage.setItem("playerName", name);
});

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    submitButton.click();
  }
});
