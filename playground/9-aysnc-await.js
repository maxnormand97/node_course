const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// first step mask it as an async function
// this changes the behavior of the program
// async functions always return a promise
const doWork = async () => {
    // throw new Error ('boom') // uncomment to run catch
    // return 'Foo' // returns a promise that has been fulfilled

    // await gets used with a promise
    // save what your promise does to a var
    const sum = await add(1, 99)
    const sum2 = await add(sum, 99)
    const sum3 = await add(sum2, 1)
    return sum3
}

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log(e)
})
