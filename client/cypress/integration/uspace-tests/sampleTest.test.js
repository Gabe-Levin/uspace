import React from 'react';
import '@testing-library/cypress/add-commands';
<reference types='cypress' />

describe('End-to-end tests with Cypress:', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000');
  })

  it('log in', () => {
    cy.get('button').contains('Log In').click();
    cy.findByRole('textbox', { name: /email address/i }).clear().type('billy@gmail.com');
    // cy.findByRole('textbox', { name: /password/i }).clear().type('billy.1P');
    cy.findByLabelText('Password').clear().type('billy.1P');
    cy.findAllByText('Continue').click();
  })
  // it('create space and add update', () => {
  //   cy.findByRole('button', {  name: /create a space/i}).click();
  // })
})