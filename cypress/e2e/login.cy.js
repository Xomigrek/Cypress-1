describe('login process', () => {
  it('Should successfully login', () => {
        cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  })
  it('Should not login with empty login', () => {
    cy.login('', 'test');
    cy.get('#mail')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
    cy.get('#mail')
      .then(($el) => $el[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });
  it('Should not login with empty password', () => {
    cy.login('test@test.com', '');
    cy.get('#pass')
      .then(($el) => $el[0].checkValidity())
      .should('be.false');
    cy.get('#pass')
      .then(($el) => $el[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });
  it('Should Add a book', () => {
    cy.login('test@test.com', 'test');
    cy.addBook('Title1', 'Description1', 'Author1');
    cy.contains('Title1').should('be.visible');
  });

  it('Should Add to favorite', () => {
    cy.login('test@test.com', 'test');
    cy.addFavoriteBook('Title2', 'Description2', 'Author2');
    cy.contains('h4', 'Favorites').click();
    cy.contains('Title2').should('be.visible');
  });

  it('Should Delete from favorite', () => {
    cy.login('test@test.com', 'test');
    cy.contains('h4', 'Favorites').click();
    cy.contains('Title2').should('be.visible');
    cy.contains('Delete from favorite').click();
    cy.contains('Please add some book to favorit on home page!').should('be.visible');
  });
})