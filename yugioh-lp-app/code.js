const BASE_LP = "8.000";
const PLAYER_NAME = "Player 1";
const OPPONENT_NAME = "Player 2";
let game = [];
let games = [];

function addThousandSeparator(el) {
  return el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function removeThousandSeparator(element) {
  return element.innerHTML.replace(".", "");
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function generateRandomNumberCoin(min, max) {
  document.getElementById("zero_one_label").innerHTML = generateRandomNumber(
    1,
    2
  );
}

function generateRandomNumberDice(min, max) {
  document.getElementById("one_six_label").innerHTML = generateRandomNumber(
    1,
    6
  );
}

function generateRandomNumberX() {
  if (document.getElementById("ngx_input").value !== "") {
    document.getElementById("one_x_label").innerHTML = generateRandomNumber(
      1,
      parseInt(document.getElementById("ngx_input").value)
    );
  }
}

function newGame() {
  removeAllChildNodes(document.getElementById("loadItems"));
  if (game.length) {
    games.push(game);
  }
  game = [];
  setGameInfo();
  resetFields();
}

function resetFields() {
  document.getElementById("pl_lp").innerHTML = BASE_LP;
  document.getElementById("op_lp").innerHTML = BASE_LP;
  document.getElementById("pl_lp_history").innerHTML = BASE_LP;
  document.getElementById("op_lp_history").innerHTML = BASE_LP;
  document
    .getElementById("op_lp_history")
    .appendChild(document.createElement("BR"));
  document
    .getElementById("pl_lp_history")
    .appendChild(document.createElement("BR"));
  document.getElementById("ngx_input").value = "";
  document.getElementById("one_x_label").innerHTML = "";
  document.getElementById("one_six_label").innerHTML = "";
  document.getElementById("zero_one_label").innerHTML = "";
  document.getElementById("pl_increase").value = "";
  document.getElementById("op_increase").value = "";
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function loadGame() {
  removeAllChildNodes(document.getElementById("loadItems"));
  for (let i = 0; i < games.length; i++) {
    let button = document.createElement("BUTTON");
    let buttonLabel = document.createElement("LABEL");
    let newLine = document.createElement("DIV");
    let floatEnd = document.createElement("DIV");

    floatEnd.setAttribute("style", "clear:both;");

    button.setAttribute("class", "loadButton");
    button.setAttribute("data-cy", "loadButton" + i);
    button.innerHTML = "load";
    button.addEventListener("click", function () {
      load(i);
    });

    buttonLabel.setAttribute("class", "loadButtonLabel");
    buttonLabel.setAttribute("data-cy", "loadButtonLabel" + i);
    buttonLabel.innerHTML = "Game " + (i + 1);

    newLine.setAttribute("id", "listItem" + i);
    newLine.setAttribute("class", "buttongroup");

    document.getElementById("loadItems").appendChild(newLine);
    document.getElementById("listItem" + i).appendChild(button);
    document.getElementById("listItem" + i).appendChild(buttonLabel);
    document.getElementById("listItem" + i).appendChild(floatEnd);
  }
}

function load(gameId) {
  resetFields();
  removeAllChildNodes(document.getElementById("loadItems"));
  document.getElementById("gameSelection").innerHTML = "";
  const GAME = games[gameId];
  GAME.forEach(function (step) {
    let id = step.player === PLAYER_NAME ? "pl_increase" : "op_increase";
    document.getElementById(id).value = Math.abs(step.lpChange).toString();

    if (step.lpChange > 0) {
      increase(step.player === PLAYER_NAME);
    } else {
      decrease(step.player === PLAYER_NAME);
    }
  });
}

function logLpChangeEvent(player, points) {
  const PLAYERNAME = player ? PLAYER_NAME : OPPONENT_NAME;
  game.push({ player: PLAYERNAME, lpChange: points });
  setGameInfo();
}

function setGameInfo() {
  let gameInfo = { game: game };
  document.getElementById("gameInfo").innerHTML = JSON.stringify(gameInfo);
}

function increase(player) {
  let points = 0;
  const PLAYER_ID = player ? "pl" : "op";
  if (document.getElementById(`${PLAYER_ID}_increase`).value !== "") {
    let lp_before = parseInt(
      removeThousandSeparator(document.getElementById(`${PLAYER_ID}_lp`))
    );
    points = parseInt(document.getElementById(`${PLAYER_ID}_increase`).value);
    if (points) {
      logLpChangeEvent(player, parseInt(points));
      let result = lp_before + points;
      let label = document.getElementById(`${PLAYER_ID}_lp_history`);
      lp_before = addThousandSeparator(lp_before);
      points = addThousandSeparator(points);
      result = addThousandSeparator(result);
      label.innerHTML += "+ " + points + " = " + result + "<br> ";
      document.getElementById(`${PLAYER_ID}_lp`).innerHTML = result;
    }
  }
}

function decrease(player) {
  let points = 0;
  const PLAYER_ID = player ? "pl" : "op";
  if (document.getElementById(`${PLAYER_ID}_increase`).value !== "") {
    let lp_before = parseInt(
      removeThousandSeparator(document.getElementById(`${PLAYER_ID}_lp`))
    );
    points = parseInt(document.getElementById(`${PLAYER_ID}_increase`).value);
    if (points) {
      logLpChangeEvent(player, parseInt(-points));
      let result = lp_before - points;
      if (result < 0) {
        result = 0;
      }
      let label = document.getElementById(`${PLAYER_ID}_lp_history`);
      lp_before = addThousandSeparator(lp_before);
      points = addThousandSeparator(points);
      result = addThousandSeparator(result);
      label.innerHTML += "- " + points + " = " + result + "<br> ";
      document.getElementById(`${PLAYER_ID}_lp`).innerHTML = result;
    }
  }
}
