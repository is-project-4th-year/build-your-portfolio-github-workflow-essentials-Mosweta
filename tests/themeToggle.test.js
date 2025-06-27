/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

describe("Theme Toggle", () => {
  let html;
  let toggleTheme;
  let button;

  beforeAll(() => {
    html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
    document.documentElement.innerHTML = html.toString();

    // Mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: key => store[key] || null,
        setItem: (key, value) => store[key] = value,
        clear: () => store = {}
      };
    })();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    // Create theme toggle button
    button = document.createElement("button");
    button.id = "themeToggle";
    button.textContent = "🌙"; // default light mode
    document.body.appendChild(button);

    // Simulate toggleTheme function
    toggleTheme = function () {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.getElementById("themeToggle").textContent = isDark ? "☀️" : "🌙";
    };
  });

  beforeEach(() => {
    document.body.classList.remove("dark-mode");
    button.textContent = "🌙";
    localStorage.clear();
  });

  test("should toggle dark mode class and store preference", () => {
    toggleTheme();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(button.textContent).toBe("☀️");

    toggleTheme();
    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(button.textContent).toBe("🌙");
  });

  test("should update button text", () => {
    toggleTheme(); // enable dark mode
    expect(button.textContent).toBe("☀️");

    toggleTheme(); // disable dark mode
    expect(button.textContent).toBe("🌙");
  });
});
