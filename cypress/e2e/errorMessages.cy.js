describe('Accessibility Test - Error Messages', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/error-form.html', { failOnStatusCode: false });
    cy.wait(2000); 
  });

  it('should show error when email is missing', () => {
    cy.get('#submitBtn').click();
    cy.wait(2000); 

    cy.get('[role="alert"]').should('be.visible').and('contain', 'Email is required');
    cy.wait(2000); 
  });

  it('should show error when password is missing', () => {
    cy.get('#email').type('test@example.com');
    cy.wait(2000); 

    cy.get('#submitBtn').click();
    cy.wait(2000); 

    cy.get('[role="alert"]').should('be.visible').and('contain', 'Password is required');
    cy.wait(2000); 
  });

  it('should show success alert when all fields are filled', () => {
    cy.get('#email').type('test@example.com');
    cy.wait(2000); 

    cy.get('#password').type('12345');
    cy.wait(2000); 

    cy.get('#submitBtn').click();
    cy.wait(2000); 

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Login successful!');
    });
    cy.wait(2000); 
  });
});
