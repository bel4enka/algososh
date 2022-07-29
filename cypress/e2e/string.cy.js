import {host} from "./availableApp";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('Строка работает корректно', () => {
    before('Приложение работает', () => {
        cy.visit(`${host}/recursion`);
    });
    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('input').clear()
        cy.contains('Развернуть').should('be.disabled')
    });
    it('если в инпуте строка, то кнопка добавления доступна', () => {
        cy.get('input').type('abc')
        cy.contains('Развернуть').should('not.be.disabled')
        cy.get('input').clear()
    });
    
    it('Корректный разворот строки', () => {
        cy.get('input').type('abc')
        cy.contains('Развернуть').as('button')
        cy.get('@button').click()

        cy.get('@button').find('[class*=loader]')
        cy.get('[class*=circle_circle]').as('circle')
        
        cy.get('@circle')
            .each((el, index) => {
                if (index === 0 || index === 2) {
                    cy.wrap(el).should(
                        'have.css',
                        'border',
                        '4px solid rgb(210, 82, 225)'
                    )
                }
                if (index === 0) expect(el).to.contain('a')
                if (index === 2) expect(el).to.contain('c')

            })
        cy.wait(DELAY_IN_MS)

        cy.get('@circle')
            .each((el, index) => {
                if (index === 1) {
                    cy.wrap(el).should(
                        'have.css',
                        'border',
                        '4px solid rgb(210, 82, 225)'
                    )
                }
            })
        
        cy.wait(DELAY_IN_MS)
        
        cy.get('@circle')
            .each((el, index) => {
            if (index === 0 || index === 2) {
                cy.wrap(el).should(
                    'have.css',
                    'border',
                    '4px solid rgb(127, 224, 81)'
                )
            }
                if (index === 0) expect(el).to.contain('a')
                if (index === 1) expect(el).to.contain('b')
                if (index === 2) expect(el).to.contain('c')
        })

        cy.wait(DELAY_IN_MS)

        cy.get('[class*=circle_content]')
            .each((el) => {
                cy.wrap(el).find('[class*=circle_modified]')
            })
    })
});