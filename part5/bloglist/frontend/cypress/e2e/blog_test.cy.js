/* eslint-disable no-undef */
describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'testing user',
      username: 'testpasswordis1234',
      password: '1234'
    }
    const anotherUser = {
      name: 'second test user',
      username: 'anothertest1234',
      password: '1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, anotherUser)

    cy.visit('')
  })
  it('contains login form', function(){

    cy.contains('login').click()
    cy.contains('Login')
  })


  it('login fails with wrong password',  function() {
    cy.contains('login').click()
    cy.get('#username').type('non-existent')
    cy.get('#password').type('wrong')
    cy.get('.login-btn').click()
    cy.contains('invalid username or password')
  })
  it('user can log in with correct credentials', async function(){
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('testpasswordis1234')
    cy.get('#password').type('1234')
    cy.get('.login-btn').click()
  })




  describe('when logged in', function (){
    beforeEach(function() {
      cy.login({ username: 'testpasswordis1234', password: '1234' })
      cy.createBlog({ title: 'title', author: 'author', url: 'url', likes: 0 })
    })
    it('a new blog can be created', function(){
      cy.get('.newBlog').click()
      cy.get('#author').type('testfromCYPRESS')
      cy.get('#url').type('testfromCYPRESS')
      cy.get('#title').type('testfromCYPRESS')
      cy.get('.save-btn').click()
      cy.contains('testfromCYPRESS')
    })
    it('a blog can be liked', function(){
      cy.get('.details').click()
      cy.get('.likesCount').should('have.text', '0')
      cy.get('.blog-likes > button').click()
      cy.get('.likesCount').should('have.text', '1')
      cy.get('.success').should('exist')
    })
    it('blog should be deleted after clicking delete', function(){
      cy.get('.details').click()
      cy.get('.rem-btn').click()
      cy.get('.success').should('exist')
    })
    it('only user who created blog should see remove button', function(){
      //cy.createBlog({ title: 'title2', author: 'author2', url: 'url2', likes: 0 })
      cy.login({ username: 'anothertest1234', password: '1234' })
      cy.get('.details').click()
      cy.get('.rem-btn').should('not.exist')
    })
    it('blogs should be sorted by likes in descending order', function(){
      cy.createBlog({ title: 'title with second most likes', author: 'author2', url: 'url2', likes: 2 })
      cy.createBlog({ title: 'title with least likes', author: 'author1', url: 'url1', likes: 1 })
      cy.createBlog({ title: 'title with most likes', author: 'author4', url: 'url4', likes: 4 })

      cy.get('.blog').eq(0).should('contain', 'title with most likes')
      cy.get('.blog').eq(2).should('contain', 'title with least likes')

    })
  })

})

