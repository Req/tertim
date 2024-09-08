#!/usr/bin/env node
import parseTargetTime from "./parseTargetTime"

const target = process.argv[2]
const txt = process.argv[3]

if (target === "--help" || target === "-h") {
    console.log("Usage: tertim [TARGET] [TEXT]")
    console.log("Possible values for target must be provided in:")
    console.log(" $ tertim 10m    # Set a countdown for 10 minutes");
    console.log(" $ tertim 55s    # Set a countdown for 55 seconds");
    console.log(" $ tertim 17:00  # Set a countdown for 17:00");
    console.log("");
    console.log("TEXT is an optional message that will be displayed below the countdown.");
    console.log("  $ tertim 10m 'Take a break!' ");
    console.log("  $ tertim 17:00 'Workday timer'");
    process.exit(0)
}

let targetTime = parseTargetTime(target)

let terminalWidth = process.stdout.columns
let terminalHeight = process.stdout.rows
let newlines = Math.floor(terminalHeight / 2)

// Detect when the terminal is resized
process.stdout.on("resize", () => {
    terminalWidth = process.stdout.columns
    terminalHeight = process.stdout.rows
    newlines = Math.floor(terminalHeight / 2)
})

let prevPrint = ""

setInterval(() => {
    const currentTime = new Date()
    const timeLeft = targetTime - currentTime

    // check if the target time has been reached
    if (timeLeft <= 0) {
        process.exit(0)
    }

    const msg = formatOutput(timeLeft)
    const spacesBeforeMsg = Math.floor(terminalWidth / 2 - msg.length / 2)
    let print = `${"\n".repeat(newlines)}${" ".repeat(spacesBeforeMsg)}${msg}`

    if (txt !== undefined) {
        let txtSpaces = Math.floor(terminalWidth / 2 - txt.length / 2)
        print += `\n\n${" ".repeat(txtSpaces)}${txt}`
    }

    if (print === prevPrint) {
        return
    }
    console.clear()
    console.log(print)
    prevPrint = print
}, 100)

function formatOutput(timeLeft) {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    if (minutes > 0) {
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return `${seconds}`
}

