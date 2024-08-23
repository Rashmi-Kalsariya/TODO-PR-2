const express = require('express')

const app = express()


app.get("/", (req, res) => {
    res.send("Welcome To THe API")
})

app.listen(8090, () => {
    console.log("Listening On Port 8090");

})