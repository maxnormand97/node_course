const calcTip = (total = 12.5, tipPercent = 0.15) => {
    const tip = total * tipPercent
    return total + tip
}

const farToCel = (temp) => {
    return (temp - 32) / 1.8
}

const celToFar = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

module.exports = {
    calcTip,
    farToCel,
    celToFar,
    add
}