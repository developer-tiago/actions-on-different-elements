Cypress.Commands.add("fillMandatoryFieldsAndSubmit", () => {
  cy.get("#firstName").type("Tiago", { delay: 0 });
  cy.get("#lastName").type("Paulo", { delay: 0 });
  cy.get("#email").type("tiagopaulo_@hotmail.com", { delay: 0 });
  cy.get("#open-text-area").type("Estou com dúvida ...", { delay: 0 });
  cy.contains('button', 'Enviar').click();
});
