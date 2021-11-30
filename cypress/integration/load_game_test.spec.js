import { OPPONENT, PLAYER } from "../support/helper";

describe("new game test", () => {
  it("starts a game", () => {
    cy.visit(Cypress.env("url"));

    cy.simulateGame(PLAYER);
    cy.simulateGame(OPPONENT);
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

  it("loads a game", () => {
    cy.get("[data-cy='load_button']").click();

    cy.get("[data-cy='loadButtonLabel0']").should("exist");
    cy.get("[data-cy='loadButton0']").click();

    cy.assertLpAfterSimulation(PLAYER);
    cy.assertLpAfterSimulation(OPPONENT);
    cy.assertGameInfo();
    cy.get("[data-cy='loadButtonLabel0']").should("not.exist");
    cy.get("[data-cy='loadButton0']").should("not.exist");
  });
});
