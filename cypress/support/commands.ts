Cypress.Commands.add(
  'getCY',
  (cyID: string): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get(`[data-cy="${cyID}"]`)
);
