import chars_5 from "./ascii.js";

function formatOutput(timeLeft) {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let txt = ""

    if (hours > 0) {
        txt = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    } else if (minutes > 0) {
        txt = `${minutes}:${seconds.toString().padStart(2, "0")}`
    } else {
        txt = `${seconds}`
    }

    let converted = ["", "", "", "", ""];
    for (let i = 0; i < txt.length; i++) {
        const char = txt[i];
        const charIndex = char === ":" ? 10 : parseInt(char);
        const asciiChar = chars_5[charIndex];
        const asciiLines = asciiChar.split("\n");
        for (let j = 0; j < 5; j++) {
            converted[j] += asciiLines[j] + " ";
        }
    }

    return converted.join("\n");
}

export default formatOutput