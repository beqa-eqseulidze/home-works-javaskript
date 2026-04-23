// ================================ task 1 ========================================
// ============================== Test Data =======================================
function is_date(date) {
    let result;

    try {
        if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())) {
            result = true;
        } else {
            result = false;
        }
    } catch (error) {
        result = false;
    } finally {
        return result;
    }
}

const res = is_date(new Date());
if (typeof document !== "undefined") {
    document.querySelector("div").textContent = `isData : ${res}`;
} else {
    console.log(`isData : ${res}`);
}

// ტესტი
console.log(is_date("October 13, 2014 11:13:00"));
console.log(is_date(new Date(86400000)));
console.log(is_date(new Date(99, 5, 24, 11, 33, 30, 0)));
console.log(is_date([1, 2, 4, 0]));


// ================================ task 2 ========================================
// ======================= The "Color Palette Generator" ==========================

const container = document.querySelector(".pallete");

function Generate() {
    //div-ების გაწმენდა და თავიდან გენერირება
    container.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        let hexCode = getRandomHex();
        let cube = `<div class="box" style="background-color:${hexCode}">${hexCode}</div>`
        container.innerHTML += cube+"";
    }
}

const hexCharacters = "0123456789ABCDEF";

function getRandomHex() {
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        color += hexCharacters[randomIndex];
    }

    return color;
}

Generate()


// ================================ task 3 ========================================
// ====================== The "Robust Form" Validator =============================

const form = document.getElementById("form");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const age = document.getElementById("age").value;

    try {
        // Username-ის ვალიდაცია
        if (username.length < 5) {
            throw new Error("Username must be at least 5 characters");
        }

        // ასაკის ვალიდაცია
        if (isNaN(age) || age < 18) {
            throw new Error("Age must be a number and at least 18");
        }

        // თუ ყველაფერი სწორია
        message.textContent = "Registration successful!";
        message.className = "success";

    } catch (error) {
        // error მესიჯი
        message.textContent = error.message;
        message.className = "error";

    } finally {
        // გაწმენდა
        document.getElementById("username").value = "";
        document.getElementById("age").value = "";
    }
});