document.querySelectorAll("input[type='checkbox']").forEach(el => {
    el.addEventListener("change", (e) => {
        console.log(e.target.checked); // true / false
    });
});