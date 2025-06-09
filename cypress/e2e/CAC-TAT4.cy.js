// Marcando (e desmarcando) inputs do tipo checkbox
describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })
 

   it('marca ambos checkboxes, depois desmarca o último' , () => {
   cy.get('input[type="checkbox"]')
     .check()
     .should('be.checked')
     .last().uncheck()
     .should('not.be.checked')
 })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' , () => {
   cy.get('input[type="checkbox"]')
     .check()
     .should('be.checked')
     .last().uncheck()
     .should('not.be.checked')
 })

})
