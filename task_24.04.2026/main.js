
function handleSubmit() {
    const username = document.getElementById("username").value.trim();
    const age = Number(document.getElementById("age").value);
    const msg = document.getElementById("message");

    try {
        if (username.length < 5)
            throw new Error("Username must be at least 5 characters.");

        if (!age || age < 18)
            throw new Error("Age must be a valid number and at least 18.");

        msg.className = "success";
        msg.textContent = `Welcome, ${username}!`;

    } catch (e) {
        msg.className = "error";
        msg.textContent = e.message;

    } finally {
        document.getElementById("username").value = "";
        document.getElementById("age").value = "";
    }
}
