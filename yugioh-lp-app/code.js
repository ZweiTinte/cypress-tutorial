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

function increase(player) {
  if (player) {
    if (document.getElementById("pl_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("player_lp").innerHTML.replace(".", "")
      );
      let points = parseInt(document.getElementById("pl_increase").value);
      let result = lp_before + points;
      let label = document.getElementById("player_lp_history");
      lp_before = addThousandSeparator(lp_before);
      points = addThousandSeparator(points);
      result = addThousandSeparator(result);
      label.innerHTML += "+ " + points + " = " + result + "<br> ";
      document.getElementById("player_lp").innerHTML = result;
    }
  } else {
    if (document.getElementById("op_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("opponent_lp").innerHTML.replace(".", "")
      );
      let points = parseInt(document.getElementById("op_increase").value);
      let result = lp_before + points;
      let label = document.getElementById("opponent_lp_history");
      lp_before = addThousandSeparator(lp_before);
      points = addThousandSeparator(points);
      result = addThousandSeparator(result);
      label.innerHTML += "+ " + points + " = " + result + "<br> ";
      document.getElementById("opponent_lp").innerHTML = result;
    }
  }
}

function decrease(player) {
  if (player) {
    if (document.getElementById("pl_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("player_lp").innerHTML.replace(".", "")
      );
      let points = parseInt(document.getElementById("pl_increase").value);
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
    }
  } else {
    if (document.getElementById("op_increase").value !== "") {
      let lp_before = parseInt(
        document.getElementById("opponent_lp").innerHTML.replace(".", "")
      );
      let points = parseInt(document.getElementById("op_increase").value);
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
    }
  }
}
