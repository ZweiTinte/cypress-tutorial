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
  DECREASE_AMOUNT,
  DECREASE_RESULT,
  EXPECTED_LP,
  INCREASE_RESULT,
  INITIAL_LP,
  LP_CHANGE_AMOUNT,
  OPPONENT,
  PLAYER,
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

Cypress.Commands.add("useEachRngButtonOnce", () => {
  const MAXIMUM_NUMBER = 30;
  const RANDOM_NUMBER = Math.floor(Math.random() * MAXIMUM_NUMBER) + 1;

  // use rng x button
  cy.get("[data-cy='ngx_input']").type(RANDOM_NUMBER);
  cy.get("[data-cy='rng_x']").click();
  cy.assertXRng(RANDOM_NUMBER);

  // use rng dice button
  cy.get("[data-cy='rng_dice']").click();
  cy.assertDiceRng();

  // use rng coin button
  cy.get("[data-cy='rng_coin']").click();
  cy.assertCoinRng();
});

Cypress.Commands.add("simulateGame", (player) => {
  cy.get(`[data-cy='${player.id}_lp_input']`).type(LP_CHANGE_AMOUNT);
  cy.get(`[data-cy='${player.id}_increase_button']`).click();

  cy.get(`[data-cy='${player.id}_lp_input']`).clear().type(DECREASE_AMOUNT);
  cy.get(`[data-cy='${player.id}_decrease_button']`).click();

  cy.assertLpAfterSimulation(player);
});

Cypress.Commands.add("assertLpAfterSimulation", (player) => {
  cy.get(`[data-cy='${player.id}_lp_label']`)
    .invoke("text")
    .should("equal", EXPECTED_LP);
});

Cypress.Commands.add("assertGameInfo", () => {
  cy.get("[data-cy='game_info']").then(($game) => {
    const GAME = JSON.parse($game.text()).game;
    cy.wrap(GAME.length).should("equal", 4);
    cy.wrap(GAME[0].player).should("equal", PLAYER.name);
    cy.wrap(GAME[0].lpChange).should("equal", parseInt(LP_CHANGE_AMOUNT));
    cy.wrap(GAME[1].player).should("equal", PLAYER.name);
    cy.wrap(GAME[1].lpChange).should("equal", -parseInt(DECREASE_AMOUNT));
    cy.wrap(GAME[2].player).should("equal", OPPONENT.name);
    cy.wrap(GAME[2].lpChange).should("equal", parseInt(LP_CHANGE_AMOUNT));
    cy.wrap(GAME[3].player).should("equal", OPPONENT.name);
    cy.wrap(GAME[3].lpChange).should("equal", -parseInt(DECREASE_AMOUNT));
  });
});
