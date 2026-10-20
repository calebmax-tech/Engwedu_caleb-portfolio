// Add Caleb's verified university email address between the quotes.
// Leave this empty until the correct address is known.
const contactEmail = "";

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const status = document.getElementById("form-status");

        if (!fullName || !subject || !message) {
            status.textContent = "Please enter your name, subject, and message. Spaces alone are not enough.";
            return;
        }

        const body = "From: " + fullName + "\nEmail: " + email + "\n\n" + message;
        const preparedMessage = "Subject: " + subject + "\n\n" + body;

        document.getElementById("prepared-message").value = preparedMessage;
        document.getElementById("message-preview").hidden = false;

        if (!contactEmail) {
            status.textContent = "Your message is ready to copy. Nothing has been sent: Caleb's contact email has not been configured.";
            return;
        }

        const mailLink = "mailto:" + contactEmail
            + "?subject=" + encodeURIComponent(subject)
            + "&body=" + encodeURIComponent(body);

        window.location.href = mailLink;
        status.textContent = "Your email app has been requested. Review the message there and press Send. This website has not sent it.";
    });

    document.getElementById("copy-message").addEventListener("click", async function () {
        const preparedMessage = document.getElementById("prepared-message");
        const status = document.getElementById("form-status");

        try {
            await navigator.clipboard.writeText(preparedMessage.value);
            status.textContent = "Message copied. Nothing has been sent.";
        } catch (error) {
            preparedMessage.focus();
            preparedMessage.select();
            status.textContent = "Select Copy from your browser menu, or press Ctrl+C (Command+C on a Mac).";
        }
    });
}
