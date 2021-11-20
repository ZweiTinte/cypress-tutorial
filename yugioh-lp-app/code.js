const BASE_LP = 8000;
const PLAYER_NAME = "Player 1";
const OPPONENT_NAME = "Player 2";
let game = [];
let games = [];

function addThousandSeparator(el) {
  return el.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  if (game.length) {
    games.push(game);
  }
  game = [];
  resetFields();
}

function resetFields() {
  document.getElementById("player_lp").innerHTML = BASE_LP;
  document.getElementById("opponent_lp").innerHTML = BASE_LP;
  document.getElementById("player_lp_history").innerHTML = "";
  document.getElementById("opponent_lp_history").innerHTML = "";
  document.getElementById("one_x_label").innerHTML = "";
  document.getElementById("one_six_label").innerHTML = "";
  document.getElementById("zero_one_label").innerHTML = "";
  document.getElementById("pl_increase").value = "";
  document.getElementById("op_increase").value = "";
}

function loadGame() {
  for (let i = 0; i < games.length; i++) {
    let button = document.createElement("BUTTON");
    let buttonLabel = document.createElement("LABEL");
    let newLine = document.createElement("DIV");

    button.setAttribute("class", "loadButton");
    button.innerHTML = "load";
    newLine.setAttribute("id", "listItem" + i);
    newLine.setAttribute("class", "buttongroup");

    buttonLabel.innerHTML = "Game " + (i + 1);
    console.log(i, games);
    button.addEventListener("click", function () {
      load(i);
    });
    document.getElementById("gameSelection").appendChild(newLine);
    document.getElementById("listItem" + i).appendChild(button);
    document.getElementById("listItem" + i).appendChild(buttonLabel);
  }
}

function load(gameId) {
  resetFields();
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
}

function increase(player) {
  let points = 0;
  if (player) {
    if (document.getElementById("pl_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("player_lp").innerHTML.replace(".", "")
      );
      points = parseInt(document.getElementById("pl_increase").value);
      if (points) {
        let result = lp_before + points;
        let label = document.getElementById("player_lp_history");
        lp_before = addThousandSeparator(lp_before);
        points = addThousandSeparator(points);
        result = addThousandSeparator(result);
        label.innerHTML += "+ " + points + " = " + result + "<br> ";
        document.getElementById("player_lp").innerHTML = result;
      } else {
        return;
      }
    }
  } else {
    if (document.getElementById("op_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("opponent_lp").innerHTML.replace(".", "")
      );
      points = parseInt(document.getElementById("op_increase").value);
      if (points) {
        let result = lp_before + points;
        let label = document.getElementById("opponent_lp_history");
        lp_before = addThousandSeparator(lp_before);
        points = addThousandSeparator(points);
        result = addThousandSeparator(result);
        label.innerHTML += "+ " + points + " = " + result + "<br> ";
        document.getElementById("opponent_lp").innerHTML = result;
      } else {
        return;
      }
    }
  }
  logLpChangeEvent(player, parseInt(points));
}

function decrease(player) {
  let points = 0;
  if (player) {
    if (document.getElementById("pl_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("player_lp").innerHTML.replace(".", "")
      );
      points = parseInt(document.getElementById("pl_increase").value);
      if (points) {
        let result = lp_before - points;
        if (result < 0) {
          result = 0;
        }
        let label = document.getElementById("player_lp_history");
        lp_before = addThousandSeparator(lp_before);
        points = addThousandSeparator(points);
        result = addThousandSeparator(result);
        label.innerHTML += "- " + points + " = " + result + "<br> ";
        document.getElementById("player_lp").innerHTML = result;
      } else {
        return;
      }
    }
  } else {
    if (document.getElementById("op_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("opponent_lp").innerHTML.replace(".", "")
      );
      points = parseInt(document.getElementById("op_increase").value);
      if (points) {
        let result = lp_before - points;
        if (result < 0) {
          result = 0;
        }
        let label = document.getElementById("opponent_lp_history");
        lp_before = addThousandSeparator(lp_before);
        points = addThousandSeparator(points);
        result = addThousandSeparator(result);
        label.innerHTML += "- " + points + " = " + result + "<br> ";
        document.getElementById("opponent_lp").innerHTML = result;
      } else {
        return;
      }
    }
  }
  logLpChangeEvent(player, -points);
}
