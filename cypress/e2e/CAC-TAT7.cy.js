describe("exibe mensagem por 3 segundos", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();

    const longText = Cypress._.repeat("abcdfghifojgheifeeefegjyjy", 10);
    cy.get("#firstName").type("Miguel").should("have.value", "Miguel");
    cy.get("#lastName").type("Luis").should("have.value", "Luis");
    cy.get("#email")
      .type("darius@gmail.com")
      .should("have.value", "darius@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    // .should('have.value' , 'mensagem extra')
    cy.contains("Enviar").click();

    cy.contains("Mensagem enviada com sucesso.").should(
      "be.visible",
      "Mensagem enviada com sucesso."
    );

    cy.tick(3000);

    cy.contains("Mensagem enviada com sucesso.").should(
      "not.be.visible",
      "Mensagem enviada com sucesso."
    );
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();
    cy.get("#email")
      .type("dariusgmail.com")
      .should("have.value", "dariusgmail.com");
    cy.contains("Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });
});
