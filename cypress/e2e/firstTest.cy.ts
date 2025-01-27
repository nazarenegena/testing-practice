describe("todo app", () => {
  it("renders the default elements on the screen", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="todo-title"]')
      .should("exist")
      .should("have.text", "To-do List");
  });

  it("renders the todos on the screen", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="todos"]').then((items) => {
      expect(items[0]).to.have.attr("data-testid", "todos");
    });
  });
});
