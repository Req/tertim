const target = process.argv[2]

// possible values for target are: "10m", "10s", "17:00"

if (target === "--help") {
    console.log("Usage: tertim [TARGET]")
    console.log("Possible values for target must be provided in:")
    console.log(" * minutes: 'tertim 10m'");
    console.log(" * seconds: 'tertim 55s'");
    console.log(" * target time: 'tertim 17:00'");
    process.exit(0)
}

// parse target time from the target string
let targetTime = new Date()
if (target.includes("m")) {
    const minutes = parseInt(target)
    targetTime.setMinutes(targetTime.getMinutes() + minutes)
} else if (target.includes("s")) {
    const seconds = parseInt(target)
    targetTime.setSeconds(targetTime.getSeconds() + seconds)
} else if (target.includes(":")) {
    const [hours, minutes] = target.split(":")
    targetTime.setHours(parseInt(hours))
    targetTime.setMinutes(parseInt(minutes))
} else {
    console.error("Invalid target time")
    console.error("Try 'tertim --help' for more information.")
    process.exit(-1)
}

let terminalWidth = process.stdout.columns
let terminalHeight = process.stdout.rows

// Detect when the terminal is resized
process.stdout.on("resize", () => {
    terminalWidth = process.stdout.columns
    terminalHeight = process.stdout.rows
})

setInterval(() => {
    const currentTime = new Date()
    // Clear console
    console.clear()

    const timeLeft = targetTime - currentTime
    const msg = Math.round(timeLeft / 1000) > 0 ? `${Math.round(timeLeft / 1000)}` : "0"

    const spacesBeforeMsg = Math.floor(terminalWidth / 2 - msg.length / 2)
    const spacesAfterMsg = terminalWidth - spacesBeforeMsg - msg.length
    const newlines = Math.floor(terminalHeight / 2)
    console.log(`${"\n".repeat(newlines)}${" ".repeat(spacesBeforeMsg)}${msg}${" ".repeat(spacesAfterMsg)}\n`)

    // check if the target time has been reached
    if (timeLeft <= 0) {
        process.exit()
    }
}, 91000)
