

  import { faker } from '@faker-js/faker'


  describe('Central de Atendimento ao Cliente TAT', () => {
    const user = {}
    
    beforeEach(() => {  
      cy.visit('./src/index.html')
      
      user.email = faker.internet.email()
      user.firstName = faker.person.firstName()
      user.lastName = faker.person.lastName()
      user.password = faker.internet.password()
      user.number = faker.phone.number()
    })
    
    it('verifica o título da aplicação', () => {
      cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche os campos obrigatórios e envia o formulário', () => {
      /* repeat uma string muitas vezes*/

      cy.get('[name="firstName"]').type('Victor')
      cy.get('[name="lastName"]').type('Fernandes')
      cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('victorf@gmail.com')
      cy.get(':nth-child(2) > [name="phone"]').type('(61) 981545508')
      cy.get('[name="open-text-area"]').type('text')
      cy.contains('button[type="submit"]','Enviar').click()

      cy.get('.success').should('be.visible')
    })

   it('Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('[name="firstName"]').type('Victor')
        cy.get('[name="lastName"]').type('Fernandes')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('@gmail.com')
        cy.get('[name="open-text-area"]').type('text')
        cy.contains('button[type="submit"]','Enviar').click()

        cy.get('.error').should('be.visible')
   })

   it('CAMPO telefone continua vazio quando informado um valor não numerico ', () => {
        cy.get(':nth-child(2) > [name="phone"]')
          .type('abc')
          .should('have.value', '')
   })

   it('Exibir erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[name="firstName"]').type('Victor')
        cy.get('[name="lastName"]').type('Fernandes')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('victor@gmail.com')
        cy.get('#check > [name="phone"]').click()
        cy.get('[name="open-text-area"]').type('text')
        cy.contains('button[type="submit"]','Enviar').click()

        cy.get('.error').should('be.visible')
   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('[name="firstName"]')
          .type('Victor')
          .should('have.value', 'Victor')
        cy.get('[name="firstName"]')
          .clear()
          .should('have.value', '')
        cy.get('[name="lastName"]')
          .type('Fernandes')
          .should('have.value', 'Fernandes')
        cy.get('[name="lastName"]')
          .clear()
          .should('have.value', '')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]')
          .type('victor@gmail.com')
          .should('have.value', 'victor@gmail.com')
        cy.get(':nth-child(2) > :nth-child(1) > [name="email"]')
          .clear()
          .should('have.value', '')
        cy.get(':nth-child(2) > [name="phone"]')
          .type('61 981545508')
          .should('have.value', '61981545508')
        cy.get(':nth-child(2) > [name="phone"]')
          .clear()
          .should('have.value', '')
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
       cy.contains('button[type="submit"]','Enviar').click()
       cy.get('.error').should('be.visible')
   })

   
    it('envia o formuário com sucesso usando um comando customizado', () => {
       cy.fillMandatoryFieldsAndSubmit(user)
       
       cy.get('.success').should('be.visible')
    })


    it('seleciona um produto (YouTube) por seu texto', ()=> {
      cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', ()=> {
      cy.get('select')
      .select('mentoria')
      .should('have.value', 'mentoria')

    })

     it('seleciona um produto (Blog) por seu índice', ()=> {
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

    })

    it.only('marca o tipo de atendimento "Feedback"', () =>{
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
      //cy.get('input[value="feedback"]').check()

    })

     
    
    it.only('marca cada tipo de atendimento', () =>{
      
      cy.get('input[type="radio"]').each(($radio) => {
        cy.wrap($radio)
        .check()
        .should('be.checked')
    })
    })

    
  })
 

  


//teste git 2 
