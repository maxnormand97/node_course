const greeter = (userName = 'foo', age = 12) => {
    console.log('Hello' + userName + 'is' + age)
}

greeter('Foo')