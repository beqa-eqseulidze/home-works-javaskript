function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // ფორმატი 00:00:00
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").textContent = time;
}

// ყოველ 1 წამში განახლება
setInterval(updateClock, 1000);

// თავიდანვე რომ სწორად გამოჩნდეს
updateClock();