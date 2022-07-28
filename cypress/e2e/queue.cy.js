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
}
describe('Очередь работает корректно', () => {
    before('Приложение работает', () => {
        cy.visit(`${host}/queue`);
    });
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.contains('Добавить').should('be.disabled')
        cy.contains('Удалить').should('be.disabled')
        cy.contains('Очистить').should('be.disabled')
    })

    it('добавление элемента в очередь', () => {
        addElement('a')
        cy.get('[class*=circle_content]').as('circle')
        cy.get('@circle')
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('a')
                if (index === 0) expect(el).to.contain('head')
                if (index === 0) expect(el).to.contain('tail')
            })
        addElement('b')
        cy.get('@circle')
            .each((el, index) => {
                if (index === 1) expect(el).to.contain('b')
                if (index === 0) expect(el).to.contain('head')
                if (index === 1) expect(el).to.contain('tail')
            })
    })
    it('удаление элемента из очереди', () => {
        cy.get('[class*=circle_content]').as('circle')
        dellElement('a')
        cy.get('@circle')
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('')
                if (index === 1) {
                    expect(el).to.contain('tail')
                    expect(el).to.contain('b')
                }
            })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('@circle')
            .each((el, index) => {
                if (index === 1) expect(el).to.contain('head')
            })
    })
    it('удаление элемента из очереди', () => {
        addElement('j')
        addElement('12')
        cy.contains('Очистить').click()
        cy.get('[class*=circle_content]').each((el, index) => {
            if (index === 0) expect(el).to.contain('')
            if (index === 1) expect(el).to.contain('')
            if (index === 2) expect(el).to.contain('')
            if (index === 3) expect(el).to.contain('')
            if (index === 4) expect(el).to.contain('')
            if (index === 5) expect(el).to.contain('')
            if (index === 6) expect(el).to.contain('')
        })
    })
})