// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {
  DECREASE_RESULT,
  INCREASE_RESULT,
  INITIAL_LP,
  LP_CHANGE_AMOUNT,
} from "./helper";

Cypress.Commands.add("increaseLp", (player) => {
  cy.get(`[data-cy='${player.id}_lp_input']`).type(LP_CHANGE_AMOUNT);
  cy.get(`[data-cy='${player.id}_increase_button']`).click();
  cy.get(`[data-cy='${player.id}_history_label']`)
    .invoke("text")
    .should("contain", INCREASE_RESULT);
});

Cypress.Commands.add("decreaseLp", (player) => {
  cy.get(`[data-cy='${player.id}_lp_input']`).type(LP_CHANGE_AMOUNT);
  cy.get(`[data-cy='${player.id}_decrease_button']`).click();
  cy.get(`[data-cy='${player.id}_history_label']`)
    .invoke("text")
    .should("contain", DECREASE_RESULT);
});

Cypress.Commands.add("assertCoinRng", () => {
  cy.get("[data-cy='zero_one_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.gte", 1);
  cy.get("[data-cy='zero_one_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.lte", 2);
});

Cypress.Commands.add("assertDiceRng", () => {
  cy.get("[data-cy='one_six_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.gte", 1);
  cy.get("[data-cy='one_six_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.lte", 6);
});

Cypress.Commands.add("assertXRng", (RANDOM_NUMBER) => {
  cy.get("[data-cy='one_x_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.gte", 1);
  cy.get("[data-cy='one_x_label']")
    .invoke("text")
    .then(parseInt)
    .should("be.lte", RANDOM_NUMBER);
});

Cypress.Commands.add("assertEmptyRngLabels", () => {
  cy.get("[data-cy='one_x_label']").invoke("text").should("be.empty");
  cy.get("[data-cy='one_six_label']").invoke("text").should("be.empty");
  cy.get("[data-cy='zero_one_label']").invoke("text").should("be.empty");
});

Cypress.Commands.add("assertInitialStateOf", (player) => {
  cy.get(`[data-cy='${player.id}_name_label']`)
    .invoke("text")
    .should("equal", player.name + ":");
  cy.get(`[data-cy='${player.id}_lp_label']`)
    .invoke("text")
    .should("equal", INITIAL_LP);
  cy.get(`[data-cy='${player.id}_lp_input']`).invoke("text").should("be.empty");
  cy.get(`[data-cy='${player.id}_increase_button']`).should("exist");
  cy.get(`[data-cy='${player.id}_decrease_button']`).should("exist");
  cy.get(`[data-cy='${player.id}_history_label']`)
    .invoke("text")
    .should("equal", INITIAL_LP);
});
