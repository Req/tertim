function parseTargetTime(target) {
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

    if (targetTime < new Date()) {
        targetTime.setDate(targetTime.getDate() + 1)
    }

    return targetTime
}