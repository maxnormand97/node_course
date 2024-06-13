// usually don't have to do this its handled by the api
// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve means it worked
//         // resolve([1,2,3])
//         // when we want to handle errors
//         reject('things went wrong')
//     }, 2000);
// })

// doWorkPromise.then((result) => {
//     console.log('worked!', result)
// }).catch((error) => {
//     console.log('error', error)
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// add(1, 2).then((sum) => {
//     console.log(sum)
// }).catch((e) => {
//     console.log(e)
// })

add(1,1).then((sum) => {
    console.log(sum)
    // return a promise to use promise chaining
    return add(sum, 4)
    // you can use this pattern as much as you like to
    // keep the operation going perpetually
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})