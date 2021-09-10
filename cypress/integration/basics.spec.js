describe("cypress basics", () => {
  it("tests rng-x button", () => {
    cy.visit(Cypress.env("url"));

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
});
