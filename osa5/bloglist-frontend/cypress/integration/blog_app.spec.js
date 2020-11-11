describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('form')
      .should('contain', 'username')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('form')
      cy.get('input:first').type('root')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('form')
      cy.get('input:first').type('Testaaja2')
      cy.get('input:last').type('salainenSalasana2')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('form')
      cy.get('input:first').type('root')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('uuden listan otsikko')
      cy.get('#author').type('bloggarien bloggari')
      cy.get('#newUrl').type('tassa/osoitetta')
      cy.get('#create').click()
      cy.contains('uuden listan otsikko bloggarien bloggari')
    })
  })
})