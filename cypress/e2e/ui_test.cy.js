/// <reference types="cypress"/>

describe('Tests Scene de UI', () => {
  it('Not registered', () => {
    cy.visit('https://demo-login-pi.vercel.app/')
    cy.get('#username').type("Invalid username")
    cy.get('#password').type("Invalid password")
    cy.get('.forms_button__3_Hpr').click()
    cy.get('.forms_alert__DXiY6').should("have.text", "Login failed! Please check your username and password.")
  })

  it('Registration missing username', () => {
    cy.visit('https://demo-login-pi.vercel.app/register')
    cy.get('#firstName').type("Larry")
    cy.get('#lastName').type("Darry")
    //cy.get('#username').type("")
    cy.get('#password').type("123456789")
    cy.get('.forms_button__3_Hpr').click()
    cy.get('#__next > div > main > div > p').should("contain.text", "Fill all required fields!")
  })

  it('Successful Registration', () => {
    let userInfo = {}

    cy.visit('https://demo-login-pi.vercel.app/')
    cy.get('a > button').click()
    userInfo = userRegistration()
    cy.get('.forms_title__Io08y').should("have.text", "Login")
  })

  it('Successful Login', () => {
    let userInfo = {}

    cy.visit('https://demo-login-pi.vercel.app/')
    cy.get('a > button').click()
    userInfo = userRegistration()
    cy.get('.forms_title__Io08y').should("have.text", "Login")

    cy.get('#username').type(userInfo['username'])
    cy.get('#password').type(userInfo['password'])
    cy.get('.forms_button__3_Hpr').click()
    cy.get('.forms_title__Io08y').should("contain.text", "Successful")
  })

  it('Back to Login page, after successful login', () => {
    let userInfo = {}

    cy.visit('https://demo-login-pi.vercel.app/')
    userInfo = userRegistration()
    loginUser(userInfo)
    cy.get('.forms_button__3_Hpr').click()
    cy.get('.forms_button__3_Hpr').should('be.visible')
  })

  it('Check hyperlink CSS color', () => {
    cy.visit('https://demo-login-pi.vercel.app/')
    cy.get('#github > a').should('have.css', 'color').and('eq', 'rgb(0, 119, 255)');
  })


  function userRegistration(){
    cy.visit('https://demo-login-pi.vercel.app/register')

    let userInfo = {}
    userInfo['firstName'] = generateString()
    userInfo['lastName'] = generateString()
    userInfo['username'] = generateString()
    userInfo['password'] = generateString()

    cy.get('#firstName').type(userInfo['firstName'])
    cy.get('#lastName').type(userInfo['lastName'])
    cy.get('#username').type(userInfo['username'])
    cy.get('#password').type(userInfo['password'])
    cy.get('.forms_button__3_Hpr').click()

    return userInfo
  }

  function loginUser(userInfo){
    cy.visit('https://demo-login-pi.vercel.app/')
    cy.get('a > button').click()
    userInfo = userRegistration()
    cy.get('.forms_title__Io08y').should("have.text", "Login")

    cy.get('#username').type(userInfo['username'])
    cy.get('#password').type(userInfo['password'])
    cy.get('.forms_button__3_Hpr').click()
    cy.get('.forms_title__Io08y').should("contain.text", "Successful")
  }

  // Generate string
  function generateString() {
    let date = new Date()

    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    let seconds = date.getSeconds().toString()
    let milliseconds = date.getMilliseconds().toString()

    return hours + minutes + seconds + milliseconds
  }

  
})