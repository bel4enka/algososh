import {host} from "./availableApp";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

const addElement = (name) => {
    cy.get('input').type(name)
    cy.contains('Добавить').click()
    cy.get('[class*=circle_changing]').contains(name)
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('[class*=circle_default]').contains(name)
}

const dellElement = (name) => {
    cy.contains('Удалить').click()
    cy.get('[class*=circle_changing]').contains(name)
    cy.get('[class*=circle_circle]').each((el, index) => {
        if (index === length-1) expect(el).to.contain(name)
    })
    
}

const firstName = 'a'
const secondName = 'b'
const thirdName = 'c'

describe('Стэк работает корректно', () => {
    before('Приложение работает', () => {
        cy.visit(`${host}/stack`);
    });
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.contains('Добавить').should('be.disabled')
        cy.contains('Удалить').should('be.disabled')
        cy.contains('Очистить').should('be.disabled')
    });
    it('если в инпуте строка, то кнопка добавления доступна', () => {
        cy.get('input').type('6')
        cy.contains('Добавить').should('not.be.disabled')
        cy.contains('Удалить').should('be.disabled')
        cy.contains('Очистить').should('be.disabled')
        cy.get('input').clear()
    })
    
    it('Добавление', () => {
        addElement(firstName)

        cy.contains('Добавить').should('be.disabled')
        cy.get('input').should('have.value', '')
        cy.contains('Удалить').should('not.be.disabled')
        cy.contains('Очистить').should('not.be.disabled')

        cy.get('[class*=circle_content]').as('circle')

        cy.get('@circle')
            .should('have.length', 1)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain(firstName)
                if (index === 0) expect(el).to.contain('top')
                if (index === 0) expect(el).to.contain(0)
            })
        addElement(secondName)
        cy.get('@circle')
            .should('have.length', 2)
            .each((el, index) => {
                if (index === 1) expect(el).to.contain(secondName)
                if (index === 1) expect(el).to.contain('top')
                if (index === 1) expect(el).to.contain(1)
            })
        
        addElement(thirdName)
        cy.get('@circle')
            .should('have.length', 3)
            .each((el, index) => {
                if (index === 2) expect(el).to.contain(thirdName)
                if (index === 2) expect(el).to.contain('top')
                if (index === 2) expect(el).to.contain(2)
            })
    })

    it('Удаление', () => {
        cy.get('[class*=circle_content]').as('circle')
        dellElement(thirdName)
        cy.get('@circle')
            .should('have.length', 2)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain(firstName)
                if (index === 1) {
                    expect(el).to.contain(secondName)
                    expect(el).to.contain('top')
                }
                
            })
        dellElement(secondName)
        cy.get('@circle')
            .should('have.length', 1)
            .each((el, index) => {
                if (index === 0) {
                    expect(el).to.contain(firstName)
                    expect(el).to.contain('top')
                }
            })
        dellElement(firstName)
        cy.get('@circle')
            .should('have.length', 0)
    })
    it('Очистить', () => {
        addElement(firstName)
        cy.contains('Очистить').click()
        cy.get('[class*=circle_content]')
            .should('have.length', 0)
    })
})