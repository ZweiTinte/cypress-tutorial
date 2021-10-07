describe("rng buttons test", () => {
  it("tests rng button initail state", () => {
    cy.visit(Cypress.env("url"));

    cy.get("[data-cy='one_x_label']").invoke("text").should("be.empty");
    cy.get("[data-cy='one_six_label']").invoke("text").should("be.empty");
    cy.get("[data-cy='zero_one_label']").invoke("text").should("be.empty");
  });

  it("tests rng-x button", () => {
    const MAXIMUM_NUMBER = 30;
    const RANDOM_NUMBER = Math.floor(Math.random() * MAXIMUM_NUMBER) + 1;

    // enter a maximum number to the input field
    cy.get("[data-cy='ngx_input']").type(RANDOM_NUMBER);

    // click rng button
    cy.get("[data-cy='rng_x']").click();

    // assert the result
    cy.get("[data-cy='one_x_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.gte", 1);
    cy.get("[data-cy='one_x_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.lte", RANDOM_NUMBER);
  });

  it("tests rng-dice button", () => {
    // click rng button
    cy.get("[data-cy='rng_dice']").click();

    // assert the result
    cy.get("[data-cy='one_six_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.gte", 1);
    cy.get("[data-cy='one_six_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.lte", 6);
  });

  it("tests rng-coin button", () => {
    // click rng button
    cy.get("[data-cy='rng_coin']").click();

    // assert the result
    cy.get("[data-cy='zero_one_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.gte", 1);
    cy.get("[data-cy='zero_one_label']")
      .invoke("text")
      .then(parseInt)
      .should("be.lte", 2);
  });
});
