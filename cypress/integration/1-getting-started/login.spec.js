describe("Home page user not logged in", () => {
    it("Successfully loaded the page", () => {
        cy.visit("http://127.0.0.1:8000/login");
    });
    it("User not logged in", () => {
        expect(localStorage.getItem("userInfo")).to.be.null;
    });
    it("Try logging in with invalid password, < 6 chars", () => {
        cy.get('[data-test-id="email-input"]')
            .type("a@e.io")
            .should("have.value", "a@e.io");
        cy.get('[data-test-id="password-input"]')
            .type("pass")
            .should("have.value", "pass");
        cy.get('[data-test-id="login-button"]').click();
        cy.wait(500);
        cy.get('[data-test-id="error"]').should("be.visible");
    });
});
