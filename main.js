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
        process.exit()
    }

    const msg = formatOutput(timeLeft)
    const spacesBeforeMsg = Math.floor(terminalWidth / 2 - msg.length / 2)
    const print = `${"\n".repeat(newlines)}${" ".repeat(spacesBeforeMsg)}${msg}`

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

