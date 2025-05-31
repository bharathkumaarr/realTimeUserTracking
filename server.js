const express = require('express')
const app = express();
const port = 3000
const path = require('path')


const socketio =  require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)

app.set('veiw engine', 'ejs')
app.set(express.static(path.join(__dirname, 'public')))




app.use(express.json())
app.get('/',(req,res)=>{
    res.json({message: 'hello'})
    
})

server.listen(port, ()=>{
    console.log(`running at ${port}`);
    
})