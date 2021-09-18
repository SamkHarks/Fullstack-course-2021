describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pelle Peloton',
      username: 'pelle',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.get('#username')
    cy.get('#password')
    cy.contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('pelle')
      cy.get('#password').type('secret')
      cy.contains('log in').click()

      cy.contains('Pelle Peloton logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('pelle')
      cy.get('#password').type('wrong pw')
      cy.contains('log in').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Pelle Peloton logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'pelle', password: 'secret' })
    })
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('new title')
      cy.get('#author').type('Homer Simpson')
      cy.get('#url').type('someurl')
      cy.get('#submit-blog').click()
      cy.contains('new title Homer Simpson')
    })

    describe('and two blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'new title', author: 'Homer Simpson', url: 'someurl' })
        cy.createBlog({ title: 'second title', author: 'Some Author', url: 'fakeurl' })
        cy.createBlog({ title: 'third title', author: 'Third Author', url: 'http://someurl' })
      })
      it('user can like a blog', function () {
        cy.contains('new title Homer Simpson')
          .contains('view')
          .click()

        cy.contains('likes 0')
          .contains('like')
          .click()

        cy.contains('likes 1')
      })

      it('user who created a blog can delete it', function () {
        cy.contains('second title Some Author')
          .contains('view')
          .click()

        cy.get('.visible')
          .contains('remove')
          .click()

        cy.get('html').should('not.contain', 'second title')
      })

      it('blogs are ordered according to likes', function () {
        cy.contains('new title Homer Simpson')
          .contains('view')
          .click()

        cy.contains('second title Some Author')
          .contains('view')
          .click()

        cy.get('.visible')
          .contains('fakeurl')
          .contains('like').as('secondlike')

        cy.get('@secondlike')
          .click()
        cy.wait(1000)

        cy.get('@secondlike')
          .click()
        cy.wait(1000)

        cy.contains('third title Third Author')
          .contains('view')
          .click()
        cy.wait(1000)

        cy.get('.visible')
          .contains('http://someurl')
          .contains('like')
          .click()
        cy.wait(1000)

        /*
        cy.get('.blog').then(blogs => {
                cy.wrap(blogs[0]).contains('likes 3')
                cy.wrap(blogs[1]).contains('likes 2')
                cy.wrap(blogs[2]).contains('likes 1')
              })
        */

        cy.get('.allBlog')
          .then(res => {
            let b = res.map((i,el) => {
              return Cypress.$(el).text()
            })
            b = b.get()
            expect(b).to.have.length(3)
            expect(b).to.deep.eq([
              'second title Some Author hidefakeurllikes 2 likePelle Pelotonremove',
              'third title Third Author hidehttp://someurllikes 1 likePelle Pelotonremove',
              'new title Homer Simpson hidesomeurllikes 0 likePelle Pelotonremove',
            ])
          })

      })

    })
  })

})