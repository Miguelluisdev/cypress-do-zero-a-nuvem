describe("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "target", "_blank")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

    it("testa a página da política de privacidade de forma independente", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "target", "_blank")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

});
