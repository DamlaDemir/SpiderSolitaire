describe("SpiderSolitaire", () => {
  before(() => {
    cy.visit("http://localhost:8080/spiderSolitaire");
  });
  it("visits the app root url", () => {
    cy.get(".header-text").should("be.exist");
  });

  it("should be restart button on the page", () => {
    cy.get(".button").should("be.exist");
    cy.contains(".header-item", "RESTART");
    cy.get(".header-item")
      .find(".restart-icon")
      .should("have.attr", "src")
      .should("include", "restart");
  });

  it("should be opened confirmbox when clicked the restart button", () => {
    cy.get(".confirmbox").should("not.exist");
    cy.get("#restart-button").click();
    cy.get(".confirmbox").should("be.exist");
    cy.get(".close-button button").click();
  });

  it("should be closed confirmbox when clicked the reject button", () => {
    cy.get("#restart-button").click();
    cy.get(".no").click();
    cy.get(".confirmbox").should("not.exist");
  });

  it("should be reloaded page when clicked the accept button", () => {
    cy.window().then((w) => (w.reload = true));
    cy.get("#restart-button").click();
    cy.get(".yes").click();
    cy.get(".confirmbox").should("not.exist");
    cy.window().should("not.have.prop", "reload");
  });

  it("should be hint button on the page", () => {
    cy.get(".button").should("be.exist");
    cy.contains(".header-item", "HINT");
    cy.get(".header-item")
      .find(".hint-icon")
      .should("have.attr", "src")
      .should("include", "hint");
  });

  it("should be added marked class to hint cards when clicked the hint button", () => {
    cy.get("#hint-button").click();
    cy.get(".marked").should("be.exist");
  });

  it("should be removed 'marked' class from hint cards after 1 seconds", () => {
    cy.get("#hint-button").click();
    cy.get(".marked").should("be.exist");
    cy.get(".marked", { timeout: 1000 }).should("not.exist");
  });

  it("should be score on the page", () => {
    cy.get(".score").should("be.exist");
    const icon = cy.get(".score").prev();
    icon.should("have.attr", "src").should("include", "score");
    cy.contains(".score", "-40");
  });

  it("should be timer on the page", () => {
    cy.get(".timer").should("be.exist");
    const icon = cy.get(".timer").prev();
    icon.should("have.attr", "src").should("include", "timer");
  });

  it("should be displayed the cards to be dealt on the page", () => {
    cy.get(".deck").should("have.length", 5);
  });

  it("the number of decks should decrease as the cards are dealt", () => {
    cy.get(".deck").should("have.length", 5);

    cy.get(".deck").first().click({ force: true });
    cy.get(".deck").should("have.length", 4);

    cy.get(".deck").first().click({ force: true });
    cy.get(".deck").should("have.length", 3);
  });

  it("should be displayed empty card holder with ban icon when all the cards are dealt", () => {
    cy.get(".empty-deck").should("not.exist");

    cy.get(".deck").first().click({ force: true });
    cy.get(".deck").first().click({ force: true });
    cy.get(".deck").first().click({ force: true });

    cy.get(".empty-deck").should("be.exist");
  });
});
