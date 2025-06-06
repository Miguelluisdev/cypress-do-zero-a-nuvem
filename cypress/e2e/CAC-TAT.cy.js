describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {


   cy.title('Central de Atendimento ao Cliente TAT').should('be.equal' , 'Central de Atendimento ao Cliente TAT')
  })

  // only = somente faz executar apenas o teste que está com .only
  it('preenche os campos obrigatórios e envia o formulário' , () => {
    const longText = Cypress._.repeat('abcdfghifojgheifeeefegjyjy' , 10)
  cy.get('#firstName').type('Miguel').should('have.value' , 'Miguel')
  cy.get('#lastName').type('Luis').should('have.value' , 'Luis')
  cy.get('#email').type('darius@gmail.com').should('have.value' , 'darius@gmail.com')
  cy.get('#open-text-area').type(longText , {delay: 0})
  // .should('have.value' , 'mensagem extra')
  cy.contains('Enviar').click()


  cy.contains('Mensagem enviada com sucesso.').should('be.visible', 'Mensagem enviada com sucesso.')
  })

  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , () => {
   cy.get('#email').type('dariusgmail.com').should('have.value' , 'dariusgmail.com')
   cy.contains('Enviar').click()
  
   cy.get('.error').should('be.visible')
  })
  
  it('campo telefone continua vazio quando um valor não numerico é inserido' , () => {
    cy.get('#phone')
    .type('abdce')
    .should('have.value' , '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' , () => {
        const longText = Cypress._.repeat('abcdfghifojgheifeeefegjyjy' , 10)
  cy.get('#firstName').type('Miguel').should('have.value' , 'Miguel')
  cy.get('#lastName').type('Luis').should('have.value' , 'Luis')
  cy.get('#email').type('darius@gmail.com').should('have.value' , 'darius@gmail.com')
  cy.get('#open-text-area').type(longText , {delay: 0})
  // .should('have.value' , 'mensagem extra')
  cy.get('#phone-checkbox').click()
  cy.get('button[type="submit"]').click()


 cy.get('.error').should('be.visible')
  })
})
