describe("exibe mensagem por 3 segundos", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("faz uma requisição HTTP", () => {
    cy.request(
      "GET",
      "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html"
    )
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);

    cy.get("@getRequest").its("statusText")
        .should('be.equal' , 'OK')
        
    cy.get("@getRequest").its("body")
        .should('include' , 'CAC TAT')
  });
});
