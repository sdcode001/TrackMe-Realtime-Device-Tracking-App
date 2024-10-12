const express = require('express')
const cors = require('cors')

const app = express();
const PORT = 5000

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors:{
        origin:'*',
        method:['GET','POST']
      }
})

app.use(cors())

app.get('/',(req,res)=>{
    res.send('Server is running...')
})


io.on('connection', (socket) => {
    console.log(`${socket.id} connected...`)
    socket.emit('connected', {socket_id:socket.id});

    socket.on('join-channel', ({channel, device}) => {
        socket.join(channel)
        console.log(`${device} joined channel ${channel}`)
    })

    
    socket.on('send-location', ({channel, device, lon, lat}) => {
        io.to(channel).emit('receive-location', {device, socket_id: socket.id, lon, lat})
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected...`);
        io.emit('user-disconnect', {socket_id: socket.id})
    })
})



server.listen(PORT, ()=> {
    console.log(`Server listening to PORT: ${PORT}`)
})