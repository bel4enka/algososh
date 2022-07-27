const host = 'http://localhost:3001'

describe('pages available to visit', () => {
    before('main page', () => {
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