import { OPPONENT, PLAYER } from "../support/helper";

describe("new game test", () => {
  it("starts a game", () => {
    cy.visit(Cypress.env("url"));

    cy.simulateGame(PLAYER);
    cy.simulateGame(OPPONENT);

    cy.assertGameInfo();
  });

  it("uses rng buttons", () => {
    cy.useEachRngButtonOnce();
  });

  it("resets and asserts the reset", () => {
    cy.get("[data-cy='reset_button']").click();

    cy.assertInitialStateOf(OPPONENT);
    cy.assertInitialStateOf(PLAYER);
    cy.assertEmptyRngLabels();

    cy.get("[data-cy='game_info']").then(($game) => {
      const GAME = JSON.parse($game.text()).game;
      cy.wrap(GAME.length).should("equal", 0);
    });
  });
});
