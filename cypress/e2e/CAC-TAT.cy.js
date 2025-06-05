describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {

   cy.visit('./src/index.html')

   cy.title('Central de Atendimento ao Cliente TAT').should('be.equal' , 'Central de Atendimento ao Cliente TAT')

  })
})
