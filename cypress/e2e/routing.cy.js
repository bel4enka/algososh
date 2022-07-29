import {host} from "./availableApp";

describe('Роутинг', () => {
    before('Приложение работает', () => {
        cy.visit(host);
    });
    it('recursion page', () => { 
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
        cy.contains('К оглавлению').click()
    });

    it('fibonacci page', () => {
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
        cy.contains('К оглавлению').click()
    });

    it('sorting page', () => {
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива')
        cy.contains('К оглавлению').click()
    });

    it('stack page', () => {
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек')
        cy.contains('К оглавлению').click()
    });

    it('queue page', () => {
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь')
        cy.contains('К оглавлению').click()
    });

    it('list page', () => {
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список')
    });
});