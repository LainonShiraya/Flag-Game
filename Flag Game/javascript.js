$.getJSON("https://restcountries.eu/rest/v2/all", function(data) {
  const randomflag = Math.floor(Math.random() * data.length);
  const flag = data[randomflag].flag;
  console.log(data[randomflag].alpha2Code);
  $(".flag").attr("src", flag);
  if (localStorage.getItem("points") !== null) {
    $(".actual_score").append(
      "Your Actual Score: " + localStorage.getItem("points")
    );
  } else {
    $(".actual_score").append("Your Actual Score: 0 Points");
  }
  const lost = document.getElementById("lost");
  const disableflag = document.getElementById("flags");
  const check = document.querySelector(".check");
  console.log(data[randomflag].name);
  function test(e) {
    e.preventDefault();
    const text = document.querySelector(".input_text").value;
    if (
      text === data[randomflag].name ||
      text === data[randomflag].alpha2Code
    ) {
      if(localStorage.getItem("points") === null){
        localStorage.setItem(
        "points",
        Number(1)
      );
      }
      else{
        localStorage.setItem(
        "points",
        Number(localStorage.getItem("points")) + 1
      );
      }

      window.location.reload();
    } else {
      lost.style.display = "block";
      disableflag.style.display = "none";

      if(localStorage.getItem("points") === null){
        $("#score").html(
        "Your Score is: 0 Points"
      );
      } else{
        $("#score").html(
        "Your Score is: " + localStorage.getItem("points") + " Points"
      );
      }    
      $("#correct_flag").html(" Your flag was: " + data[randomflag].name);
    }
  }
  console.log(localStorage);
  console.log(localStorage.length);
  check.addEventListener("submit", test);
});

function newgame() {
  const username = document.querySelector(".username").value;
  if( typeof JSON.parse(localStorage.getItem("points")) != 'number'){
    localStorage.setItem(username, Number(0));
    console.log("HELOOOOOOOOOOO");
  } else{
    localStorage.setItem(username, localStorage.getItem("points"));
  }
  localStorage.setItem("points", 0);
  window.location.reload();
}

const clickme = document.querySelector(".new_game");
clickme.addEventListener("click", newgame);

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {   
      if (plates[i] !== "points" && plates[i] !== "" && plates[i]) { 
        return `
  <li>
      <label for="item${i}">   ${plate}   / points: ${localStorage.getItem(plate)}
      </label> 
`;
      } 
    })
    .join("");
}
var countries = Object.keys(localStorage)
  .slice(0, 3)
  .sort(function(a, b) {
    return localStorage[b] - localStorage[a];
  });

const items = countries || [];
const itemsList = document.querySelector(".plates");
populateList(items, itemsList);
