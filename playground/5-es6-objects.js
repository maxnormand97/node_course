// object property shorthand

const userName = 'Foo'
const userAge = 33

const user = {
    userName, // JS will know that this is the name prop based on the var declared above
    userAge,
    location: 'Place'
}

console.log(user)

// Object destructuring
// provides a better way to get props from objects
// you can also rename the var you are creating
// this can be useful for when var names are taken
// you can also set up a default value

const product = {
    label: 'thing',
    price: 3,
    stock: 333,
    salePrice: undefined
}
const {label: productLabel, stock, newValue = 5} = product
console.log(productLabel)
console.log(stock)

// you can destructure an object inline in a function
const transaction = (type, { product }) => {
    console.log(product)
}

transaction('order', product)
