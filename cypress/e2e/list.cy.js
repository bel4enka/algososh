import {host} from "./availableApp";
import {
    DELAY_IN_MS,
    SHORT_DELAY_IN_MS
} from "../../src/constants/delays";

describe('Список работает корректно', () => {
    before('Приложение работает', () => {
        cy.visit(`${host}/list`);
    });
    it('если в инпуте пусто, то кнопки добавления недоступна', () => {
        cy.get('input').eq(0).clear()
        cy.contains('Добавить в head').should('be.disabled')
        cy.contains('Добавить в tail').should('be.disabled')
        cy.contains('Добавить по индексу').should('be.disabled')
    })

    it('отрисовка дефолтного списка', () => {
        cy.get('[class*=circle_content]')
            .should('have.length', 4)
            .each((el, index) => {
                if(index === 0) cy.wrap(el).contains('head')
                if(index === 3) cy.wrap(el).contains('tail')
            })
        cy.get('[class*=circle_letter]')
            .each((el) => {
                cy.get(el).should('not.have.text', '');
            })
    })

    it('добавление элемента в head', () => {
        cy.get('input').eq(0).type('a')
        cy.contains('Добавить в head').click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .should('have.length', 5)
            .each((el, index) => {
                if(index === 0) {
                    cy.wrap(el).contains('a')
                }
                if(index === 4) cy.wrap(el).contains('tail')
            })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_modified]').contains('a')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) cy.wrap(el).contains('head')
            })
        cy.get('[class*=circle_default]')
    })

    it('добавление элемента в tail', () => {
        cy.get('input').eq(0).type('b')
        cy.contains('Добавить в tail').click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .should('have.length', 6)
            .each((el, index) => {
                if(index === length-1) {
                    cy.wrap(el).contains('b')
                }
                if(index === length-1) cy.get(el).should('not.have.text', 'tail');
            })
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_modified]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === length-1) cy.wrap(el).contains('tail')
            })
        cy.get('[class*=circle_default]')
    })
    it('добавления элемента по индексу', () => {
        cy.get('input').eq(0).type('c')
        cy.get('input').eq(1).type(1)
        cy.contains('Добавить по индексу').click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_changing]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 1) {
                    cy.wrap(el).contains('c')
                }
            })
        cy.get('[class*=circle_modified]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === length-1) cy.wrap(el).contains('tail')
            })
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) cy.wrap(el).contains('head')
            })
        cy.get('[class*=circle_default]')
        cy.get('input').eq(1).clear()
    })
    it('удаление элемента из head', () => {
        cy.contains('Удалить из head').click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_small]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
                 .each((el, index) => {
                     if(index === 0) cy.wrap(el).should('not.have.text', 'head');
                 })
        cy.get('[class*=circle_modified]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_modified]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) cy.wrap(el).contains('head')
            })
    })

    it('удаление элемента из tail', () => {
        cy.contains('Удалить из tail').click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_small]')
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === length-1) cy.wrap(el).should('not.have.text', 'tail');
            })
        cy.get('[class*=circle_modified]')
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === length-1) expect(el).to.contain('dsc')
            })
    })
    it('удаление элемента по индексу', () => {
        cy.get('input').eq(1).type(2)
        cy.contains('Удалить по индексу').click()
        cy.wait(DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 0) cy.wrap(el).find('[class*=circle_changing]')
            })
        cy.wait(DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 1) cy.wrap(el).find('[class*=circle_changing]')
            })
        cy.wait(DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .each((el, index) => {
                if(index === 2) {
                    cy.wrap(el).find('[class*=circle_changing]')
                }
            })

        cy.wait(DELAY_IN_MS)
        cy.wait(DELAY_IN_MS)
        cy.get('[class*=circle_content]')
            .should('have.length', 4)
            .each((el) => {
                cy.wrap(el).find('[class*=circle_default]')
            })
    })
})