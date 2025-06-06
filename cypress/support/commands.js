Cypress.Commands.add('fillMandatoryFieldsAndSubmit' , () => {
    
  cy.get('#firstName').type('Miguel').should('have.value' , 'Miguel')
  cy.get('#lastName').type('Luis').should('have.value' , 'Luis')
  cy.get('#email').type('darius@gmail.com').should('have.value' , 'darius@gmail.com')
  cy.get('#open-text-area').type('Teste.').should('have.value' , 'Teste.')
  
  cy.get('button[type="submit"]').click()


})