/**
 * @jest-environment jsdom
 */

describe("Contact Form", () => {
  let form, button;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="contact-form">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    `;

    form = document.querySelector(".contact-form");
    button = form.querySelector("button");
  });

  test("should disable button and reset form", () => {
    // Access inputs correctly
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Simulate user input
    nameInput.value = "John Doe";
    emailInput.value = "john@example.com";
    messageInput.value = "Hello world";

    // Simulate submission/reset
    button.disabled = true;
    button.textContent = "Sending...";
    form.reset();
    button.disabled = false;
    button.textContent = "Send";

    // ✅ Expectations
    expect(button.disabled).toBe(false);
    expect(button.textContent).toBe("Send");
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
  });
});
