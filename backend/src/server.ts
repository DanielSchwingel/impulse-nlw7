import 'dotenv/config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { router } from './routes'

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(express.json())
app.use(router)

app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get('/signin/callback', (request, response)=> {
    const { code } = request.query
    return response.json(code)
})


app.listen(4000, ()=> console.log("🚀 Server is running!"))