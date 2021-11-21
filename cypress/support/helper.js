export const OPPONENT = {
  name: "Player 2",
  id: "op",
};

export const PLAYER = {
  name: "Player 1",
  id: "pl",
};

export const INITIAL_LP = "8.000";
export const LP_CHANGE_AMOUNT = "500";
export const INCREASE_RESULT = "8.500";
export const DECREASE_RESULT = "7.500";
export const EXPECTED_LP = "7.800";
export const DECREASE_AMOUNT = "700";

// disable screenshots for failed tests
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});
