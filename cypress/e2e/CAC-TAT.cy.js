describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {


   cy.title('Central de Atendimento ao Cliente TAT').should('be.equal' , 'Central de Atendimento ao Cliente TAT')
  })

  // only = somente faz executar apenas o teste que está com .only
  it('preenche os campos obrigatórios e envia o formulário' , () => {
    
  cy.get('#firstName').type('Miguel').should('have.value' , 'Miguel')
  cy.get('#lastName').type('Luis').should('have.value' , 'Luis')
  cy.get('#email').type('darius@gmail.com').should('have.value' , 'darius@gmail.com')
  cy.get('#open-text-area').type('mensagem extra').should('have.value' , 'mensagem extra')
  cy.contains('Enviar').click()
  

  cy.contains('Mensagem enviada com sucesso.').should('be.visible', 'Mensagem enviada com sucesso.')
  })

})
