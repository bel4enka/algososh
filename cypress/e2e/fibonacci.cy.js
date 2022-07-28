import {host} from "./availableApp";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('Фибоначчи работает корректно', () => {
    before('Приложение работает', () => {
        cy.visit(`${host}/fibonacci`);
    });
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.contains('Рассчитать').should('be.disabled')
    });
    it('если в инпуте число, то кнопка добавления доступна', () => {
        cy.get('input').type('6')
        cy.contains('Рассчитать').should('not.be.disabled')
        cy.get('input').clear()
    });

    it('Корректный вывод чисел', () => {
        cy.get('input').type('5')
        cy.contains('Рассчитать').as('button')
        cy.get('@button').click()
        
        cy.get('[class*=circle_circle]').as('circle')
        
        cy.get('@circle')
            .should('have.length', 1)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 2)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
                if (index === 1) expect(el).to.contain('1')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 3)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
                if (index === 1) expect(el).to.contain('1')
                if (index === 2) expect(el).to.contain('2')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 4)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
                if (index === 1) expect(el).to.contain('1')
                if (index === 2) expect(el).to.contain('2')
                if (index === 3) expect(el).to.contain('3')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle')
            .should('have.length', 5)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
                if (index === 1) expect(el).to.contain('1')
                if (index === 2) expect(el).to.contain('2')
                if (index === 3) expect(el).to.contain('3')
                if (index === 4) expect(el).to.contain('5')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('[class*=circle_circle]')
            .should('have.length', 6)
            .each((el, index) => {
                if (index === 0) expect(el).to.contain('1')
                if (index === 1) expect(el).to.contain('1')
                if (index === 2) expect(el).to.contain('2')
                if (index === 3) expect(el).to.contain('3')
                if (index === 4) expect(el).to.contain('5')
                if (index === 5) expect(el).to.contain('8')

            })
    })
});