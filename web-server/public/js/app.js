// without Jquery
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message')
const errorMessage = document.querySelector('#error')
weatherForm.addEventListener('submit', (event) => {
    // stops things from refreshing
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    const location = search.value
    // use in built fetch function to request for data
    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // messageOne
                console.log(data)
                messageOne.textContent = data.forecast
            }
        })
    })
})
