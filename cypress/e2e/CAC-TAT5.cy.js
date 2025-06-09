// Fazendo upload de arquivos com Cypress
describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })
 

   it('seleciona um arquivo da pasta fixtures' , () => {
   cy.get('#file-upload')
   .selectFile('cypress/fixtures/example.json')
   .should((input) => {
     expect(input[0].files[0].name).to.equal('example.json')
   })
 })

    it('seleciona um arquivo simulando um drag-and-drop' , () => {
        cy.get('#file-upload')
       .selectFile('cypress/fixtures/example.json' , {action: 'drag-drop'})
       .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
   })
 })
 
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , () => {
      cy.fixture('example.json').as('myFile')

        cy.get('#file-upload')
       .selectFile('@myFile' , {action: 'drag-drop'})
       .should((input) => {
      expect(input[0].files[0].name).to.equal('example.json')
   }) 

 })


})