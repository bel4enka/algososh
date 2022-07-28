import {host} from "./availableApp";

describe('Роутинг', () => {
    before('Приложение работает', () => {
        cy.visit(host);
    });

    it('recursion page', () => {
        cy.visit(`${host}/recursion`);
    });

    it('fibonacci page', () => {
        cy.visit(`${host}/fibonacci`);
    });

    it('sorting page', () => {
        cy.visit(`${host}/sorting`);
    });

    it('stack page', () => {
        cy.visit(`${host}/stack`);
    });

    it('queue page', () => {
        cy.visit(`${host}/queue`);
    });

    it('list page', () => {
        cy.visit(`${host}/list`);
    });
});