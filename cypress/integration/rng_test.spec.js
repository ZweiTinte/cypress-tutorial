describe("rng buttons test", () => {
  it("tests rng button initail state", () => {
    cy.visit(Cypress.env("url"));

    cy.assertEmptyRngLabels();
  });

  it("tests rng-x button", () => {
    const MAXIMUM_NUMBER = 30;
    const RANDOM_NUMBER = Math.floor(Math.random() * MAXIMUM_NUMBER) + 1;

    // enter a maximum number to the input field
    cy.get("[data-cy='ngx_input']").type(RANDOM_NUMBER);

    // click rng button
    cy.get("[data-cy='rng_x']").click();

    // assert the result
    cy.assertXRng(RANDOM_NUMBER);
  });

  it("tests rng-dice button", () => {
    // click rng button
    cy.get("[data-cy='rng_dice']").click();

    // assert the result
    cy.assertDiceRng();
  });

  it("tests rng-coin button", () => {
    // click rng button
    cy.get("[data-cy='rng_coin']").click();

    // assert the result
    cy.assertCoinRng();
  });
});
