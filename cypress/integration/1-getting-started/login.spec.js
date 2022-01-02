describe("Home page user not logged in", () => {
    it("Successfully loaded the page", () => {
        cy.visit("http://127.0.0.1:8000/login");
    });
    it("User not logged in", () => {
        expect(localStorage.getItem("userInfo")).to.be.null;
    });
    it("Try logging in with invalid email", () => {
        cy.get('[data-test-id="email-input"]')
            .type("a@.io")
            .should("have.value", "a@.io");
        cy.get('[data-test-id="login-button"]').click();
        cy.wait(500);
        cy.get('[data-test-id="error"]').should("be.visible");
    });

    // it('Create and Log in user', () => {
    // 	cy.get('.create-user__inputText')
    // 		.type('James')
    // 		.should('have.value', 'James');
    // 	cy.get('.create-user__save').click();
    // 	cy.wait(500);
    // 	cy.get('.login-user__user-name').should('have.text', 'James');
    // 	cy.wait(500);
    // });
});
