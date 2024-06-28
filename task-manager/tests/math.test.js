const { calcTip, farToCel, celToFar, add } = require('../src/math')

test('should do total with tip', () => {
    const total = calcTip(10, .3)
    expect(total).toBe(13)
    // doing it without assertions
    // if(total !== 13) {
    //     throw new Error('Total tip is not right')
    // }
})

test('check default value', () => {
    const total = calcTip()
    expect(total).toBe(14.375)
})

test('far to cel function', () => {
    const temp = farToCel(32)
    expect(temp).toBe(0)
})

test('cel to far function', () => {
    const temp = celToFar(0)
    expect(temp).toBe(32)
})

// testing async functions
// just add a param into the function
// test('async test demo', (done) => {
//     // if you don't declare a test as aysnc it won't run
//     // async code

//     // NOTE: this will timeout and fail
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('add async', (done) => {
    add(2,3).then((sum) => {
        // do you assertions
        expect(sum).toBe(5)
        // will escape the test
        done()
    })
})

// aysnc declaration remember always returns a promise
// NOTE: this is the most common way to write aysnc tests
test('should add using async await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})