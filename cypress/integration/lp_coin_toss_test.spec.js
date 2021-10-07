import {
  DECREASE_RESULT,
  INCREASE_RESULT,
  INITIAL_LP,
  LP_CHANGE_AMOUNT,
  OPPONENT,
} from "../support/helper";

describe("op coin toss test", () => {
  it("tests initail state", () => {
    cy.visit(Cypress.env("url"));

    cy.get("[data-cy='one_x_label']").invoke("text").should("be.empty");
    cy.get("[data-cy='one_six_label']").invoke("text").should("be.empty");
    cy.get("[data-cy='zero_one_label']").invoke("text").should("be.empty");

    cy.get("[data-cy='op_name_label']")
      .invoke("text")
      .should("equal", OPPONENT.name + ":");
    cy.get("[data-cy='op_lp_label']")
      .invoke("text")
      .should("equal", INITIAL_LP);
    cy.get("[data-cy='op_lp_input']").invoke("text").should("be.empty");
    cy.get("[data-cy='op_increase_button']").should("exist");
    cy.get("[data-cy='op_decrease_button']").should("exist");
    cy.get("[data-cy='op_history_label']")
      .invoke("text")
      .should("equal", INITIAL_LP);
  });

  it("tests coin toss in/decrease", () => {
    // click rng button
    cy.get("[data-cy='rng_coin']").click();

    // conditionally continue if the label exists
    cy.get("body").then(($body) => {
      if ($body.find("[data-cy='zero_one_label']").length > 0) {
        // assert the result
        cy.get("[data-cy='zero_one_label']")
          .invoke("text")
          .then(parseInt)
          .should("be.gte", 1);
        cy.get("[data-cy='zero_one_label']")
          .invoke("text")
          .then(parseInt)
          .should("be.lte", 2);

        // increase or decrease lp depending on coin toss result
        cy.get("[data-cy='zero_one_label']").then(($zero_one_label) => {
          if ($zero_one_label.text().includes("1")) {
            cy.get("[data-cy='op_lp_input']").type(LP_CHANGE_AMOUNT);
            cy.get("[data-cy='op_increase_button']").click();
            cy.get("[data-cy='op_history_label']")
              .invoke("text")
              .should("contain", INCREASE_RESULT);
          } else if ($zero_one_label.text().includes("2")) {
            cy.get("[data-cy='op_lp_input']").type(LP_CHANGE_AMOUNT);
            cy.get("[data-cy='op_decrease_button']").click();
            cy.get("[data-cy='op_history_label']")
              .invoke("text")
              .should("contain", DECREASE_RESULT);
          }
        });
      }
    });
  });
});
