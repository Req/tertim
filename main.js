#!/usr/bin/env node
import parseTargetTime from "./parseTargetTime.js"
import formatOutput from "./formatOutput.js"

const target = process.argv[2]
const txt = process.argv[3]

if (target === "--help" || target === "-h") {
    console.log("Usage: tertim [TARGET] [TEXT]")
    console.log("Possible values for target must be provided in:")
    console.log(" $ tertim 10m    # Set a countdown for 10 minutes");
    console.log(" $ tertim 55s    # Set a countdown for 55 seconds");
    console.log(" $ tertim 17:00  # Set a countdown for 17:00");
    console.log("");
    console.log("If no target is provided, the timer will count up from the current time.");
    console.log("");
    console.log("TEXT is an optional message that will be displayed below the countdown.");
    console.log("  $ tertim 10m 'Take a break!' ");
    console.log("  $ tertim 17:00 'Workday timer'");
    process.exit(0)
}

let targetTime = target ? parseTargetTime(target) : -1
let terminalWidth = process.stdout.columns
let terminalHeight = process.stdout.rows
let newlines = Math.floor(terminalHeight / 2)
let intervalId = 0
let prevPrint = ""

function startCountUp() {
    let secondsSinceStart = 0

    intervalId = setInterval(() => {
        secondsSinceStart += 1000

        const msg = formatOutput(secondsSinceStart)
        printMsg(msg)
    }, 1000)
}

function startCountdown() {
    let timeLeft = targetTime - new Date()

    intervalId = setInterval(() => {
        const currentTime = new Date()
        timeLeft = targetTime - currentTime

        // check if the target time has been reached
        if (timeLeft <= 0) {
            console.clear()
            process.exit(0)
        }

        const msg = formatOutput(timeLeft)
        printMsg(msg)
    }, 100)
}

function printMsg(msg) {
    const spacesBeforeMsg = 0//Math.floor(terminalWidth / 2 - msg.length / 2)

    const msglines = msg.split("\n")
    msglines.forEach((line, i) => {
        msglines[i] = `${" ".repeat(spacesBeforeMsg)}${line}`
    })

    let print = "\n".repeat(newlines) + msglines.map(line => {
        let txtSpaces = Math.floor(terminalWidth / 2 - line.length / 2)
        return " ".repeat(txtSpaces) + line + "\n"
    }).join("")

    if (txt !== undefined) {
        let txtSpaces = Math.floor(terminalWidth / 2 - txt.length / 2)
        print += `\n\n${" ".repeat(txtSpaces)}${txt}`
    }

    if (print === prevPrint) {
        return
    }

    // console.clear() // A neater method would be to clear only the lines that have changed... or just redraw the previous print
    console.log(print)
    prevPrint = print
}

if (targetTime === -1) {
    startCountUp()
} else {
    startCountdown()
}

// Detect when the terminal is resized
process.stdout.on("resize", () => {
    terminalWidth = process.stdout.columns
    terminalHeight = process.stdout.rows
    newlines = Math.floor(terminalHeight / 2)


    clearInterval(intervalId)
    if (targetTime === -1) {
        startCountUp()
    } else {
        startCountdown()
    }
})
