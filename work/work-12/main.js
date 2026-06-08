function isPangram(string) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    string = string.toLowerCase();

    for (const letters of alphabet) {
        if (!string.includes(letters)) {
            return false;
        }
    }
    return true;
}

console.log(isPangram("The quick brown fox jumps over the lazy dog"));
console.log(isPangram("This is not a pangram"));
console.log(isPangram("Pack my box with five dozen liquor jugs!"));
console.log(isPangram("Hello 123 world!"));