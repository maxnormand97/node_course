// setTimeout(() => {
//     console.log('two seconds are up')
// }, 2000);

// const names = ['foo', 'bar', 'bazza']
// const shortNames = names.filter((name) => {
//     return name.length <= 4;
// })

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             lat: '1',
//             long: '0'
//         }

//         callback(data)
//     }, 2000);
// }

// geocode('foo', (data) => {
//     console.log(data)
// })

// const add = (x, y, callback) => {
//     setTimeout(() => {
//         let sum = x + y
//         callback(sum)
//     }, 2000);
// }

// add(1, 4, (sum) => {
//     console.log(sum)
// })

// the order you call the callback in is important
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('error here', undefined)
        // callback(undefined, [1,2,3])
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error) {
        return console.log(error)
    }

    console.log(result)
})