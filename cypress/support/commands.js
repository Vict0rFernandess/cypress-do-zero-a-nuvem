// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user=> {

    const longText = 'Este é um texto de teste para o campo de mensagem.'

    cy.get('[name="firstName"]').type(user.firstName)
    cy.get('[name="lastName"]').type(user.lastName)
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type(user.email)
    cy.get(':nth-child(2) > [name="phone"]').type(user.number)
    cy.get('[name="open-text-area"]').type(longText)
    cy.contains('button','Enviar').click()
})

