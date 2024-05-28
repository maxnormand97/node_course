// const square = function (x) {
//     return x * x
// }

// using arrow function is better for shorthand syntax and other
// features
// const square = (x) => {
//     return x * x
// }

// this is the same as above except shorthand, can only be used
// for simpler functions
// const square = (x) => x * x;

// console.log(square(4))

const event = {
    name: 'foo',
    // arrow functions do not bind their own this value...
    // its best to use a normal function using this...
    // in es6 you don't have to declare function
    guestList: ['bob', 'steve', 'randy'],
    printGuestList() {
        console.log('guest list for' + this.name)

        // arrow functions don't bind there own this value
        this.guestList.forEach((guest) => {
            console.log(guest + ' is going to ' + this.name)
        })
    }
}

// event.printGuestList()
// its better in general to use arrow functions when we can