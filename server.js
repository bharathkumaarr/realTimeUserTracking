const express = require('express')
const app = express();
const port = 3000
const path = require('path')


const socketio =  require('socket.io')
const http = require('http');
const { log } = require('console');
const { disconnect } = require('process');
const server = http.createServer(app)
const io = socketio(server)

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{
    socket.on('send-location', (data)=>{
        io.emit('receive-location', {id: socket.id, ...data})
    })
    socket.on('disconnect', (data)=>{
        io.emit('user-disconnected', socket.id)
    })
    
})


app.get('/',(req,res)=>{
    res.render('index')
    
})

server.listen(port,'0.0.0.0', ()=>{
    console.log(`running at ${port}`);
    
})