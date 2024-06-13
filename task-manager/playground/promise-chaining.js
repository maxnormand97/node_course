require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('666878528a7fb1bbbbb09b37', {age: 4}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 13})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('666878528a7fb1bbbbb09b37', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})