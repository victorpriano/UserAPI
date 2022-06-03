const express = require('express')
const cors = require('cors')

const app = express()

app.listen('3000', () => console.log('Rodando na porta 3000'))

// Middlewares
app.use(express.json())
app.use(cors())

let users = [
    {
        "id": 1,
        "name": "Victor",
        "city": "Fortaleza",
        "avatar": "https://picsum.photos/id/237/200/300"
    }
]

app.route("/").get((req, res) => res.json({
    users
}))

app.route("/:id").get((req, res) => {
    const userId = req.params.id
    const user = users.find(user => Number(user.id) === Number(userId))
    
    if(!user){
        return res.json('User not found')
    }

    res.json(user)
})

app.route("/:id").put((req, res) => {
    const userId = req.params.id

    const user = users.find(user => Number(user.id) === Number(userId))

    if(!user){
        return res.json('User not found')
    }

    const updatedUser = {
        ...user,
        name: req.body.name,
        city: req.body.city,
        avatar: req.body.avatar
    }

    users = users.map(user => {
        if(Number(user.id) === Number(userId)){
            user = updatedUser
        }

        return user
    })

    return res.json('Updated user')
})

app.route("/").post((req, res) => {
    const lastId = users[users.length - 1].id
    users.push({
        id: lastId + 1,
        name: req.body.name,
        city: req.body.city,
        avatar: req.body.avatar
    })
    res.json('Saved user')
})

app.route("/:id").delete((req, res) => {
    const userId = req.params.id

    users = users.filter(user => Number(user.id) !== Number(userId))

    return res.json('Deleted user')

})