/**
 * @jest-environment jsdom
 */

describe("Navigation Menu Toggle", () => {
  let navLinks;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="navLinks" class="menu"></div>
    `;

    navLinks = document.getElementById("navLinks");

    global.toggleMenu = function () {
      navLinks.classList.toggle("show");
    };
  });

  test("should toggle 'show' class", () => {
    expect(navLinks.classList.contains("show")).toBe(false);
    toggleMenu();
    expect(navLinks.classList.contains("show")).toBe(true);
    toggleMenu();
    expect(navLinks.classList.contains("show")).toBe(false);
  });
});
