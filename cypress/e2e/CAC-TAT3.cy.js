describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })
 
  it('marca o tipo de atendimento "Feedback"' , () => {

  cy.get('input[type="radio"]').first().check().should('be.checked')
  cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
  cy.get('input[type="radio"]').last().check().should('be.checked')

  })

  it('marca cada tipo de atendimento"' , () => {

  cy.get('input[type="radio"]').first().check().should('be.checked')
  cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
  cy.get('input[type="radio"]').last().check().should('be.checked')

  })


})
