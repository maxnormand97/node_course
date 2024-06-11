// usually don't have to do this its handled by the api
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve means it worked
        // resolve([1,2,3])
        // when we want to handle errors
        reject('things went wrong')
    }, 2000);
})

doWorkPromise.then((result) => {
    console.log('worked!', result)
}).catch((error) => {
    console.log('error', error)
})