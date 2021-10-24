import { OPPONENT, PLAYER } from "../support/helper";

describe("op coin toss test", () => {
  it("tests initail state", () => {
    cy.visit(Cypress.env("url"));

    cy.assertEmptyRngLabels();
    cy.assertInitialStateOf(OPPONENT);
    cy.assertInitialStateOf(PLAYER);
  });

  it("tests coin toss in/decrease", () => {
    // click rng button
    cy.get("[data-cy='rng_coin']").click();

    // conditionally continue if the label exists
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy='zero_one_label']").length > 0) {
        // assert the result
        cy.assertCoinRng();

        // increase or decrease lp depending on coin toss result
        cy.get("[data-cy='zero_one_label']").then(($zero_one_label) => {
          if ($zero_one_label.text().includes("1")) {
            cy.increaseLp(OPPONENT);
            cy.decreaseLp(PLAYER);
          } else if ($zero_one_label.text().includes("2")) {
            cy.decreaseLp(OPPONENT);
            cy.increaseLp(PLAYER);
          }
        });
      }
    });
  });
});
