export const host = 'http://localhost:3002'

describe('Роутинг', () => {
    before('Приложение работает', () => {
        cy.visit(host);
    })
});