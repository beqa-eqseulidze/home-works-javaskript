
const hexChars = "0123456789ABCDEF";

function randomHex() {
    let hex = "#";
    for (let i = 0; i < 6; i++)
        hex += hexChars[Math.floor(Math.random() * 16)];
    return hex;
}

function generatePalette() {
    const palette = document.getElementById("palette");
    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const color = randomHex();
        const div = document.createElement("div");
        div.className = "swatch";
        div.style.backgroundColor = color;
        div.textContent = color;
        palette.appendChild(div);
    }
}
