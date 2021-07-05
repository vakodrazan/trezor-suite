// @group:suite
// @retry=2

describe('There is a hidden route (not accessible in UI)', () => {
    beforeEach(() => {
        cy.viewport(1024, 768).resetDb();
    });

    it('/version', () => {
        cy.prefixedVisit('/version');
        cy.get('html').should('contain', 'version');
        cy.getTestElement('@version/commit-hash-link').then(($a) => {
            $a.text('some-commit-hash');

            cy.getTestElement('@version/heading').then(($h) => {
                $h.text('21.01.1')
            })

            cy.get('html').should('contain', 'some-commit-hash');

            cy.getTestElement('@version').matchImageSnapshot();
        })

    });
});
