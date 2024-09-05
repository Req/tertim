const target = process.argv[2]

// possible values for target are: "10m", "10s", "17:00"


// parse target time from the target string
let targetTime = new Date()
if (target.includes("m")) {
    const minutes = parseInt(target)
    targetTime.setMinutes(targetTime.getMinutes() + minutes)
} else if (target.includes("s")) {
    const seconds = parseInt(target)
    targetTime.setSeconds(targetTime.getSeconds() + seconds)
} else {
    const [hours, minutes] = target.split(":")
    targetTime.setHours(parseInt(hours))
    targetTime.setMinutes(parseInt(minutes))
}

setInterval(() => {
    const currentTime = new Date()
    console.log("Time left:", targetTime - currentTime)
    // check if the target time has been reached
    if (currentTime >= targetTime) {
        console.log("Time is up!")
        process.exit()
    }
}, 1000)
