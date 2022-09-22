const express = require('express')
const port = process.env.PORT || 3000;
const path = require('path')


const app = express()
const http = require('http').createServer(app)
app.use(express.static(path.join(__dirname, '../frontend/public')))

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../frontend/main.html'))
})



// Socket connection establishing

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Socket server created successfully!!')

    socket.on('sending',(user_data)=>{
        console.log(user_data)
        socket.broadcast.emit('final_msg',user_data)
    })
    socket.on('about_user',()=>{
        socket.join('room1')
        console.log('user joined the room in the server')
        
    })
    socket.on('memberjoined',()=>{
       socket.to('room1').emit('userroom_creation')
       console.log('Member joined event trigered')
        
    })
})





http.listen(port, () => {
    console.log(`Server is running at port ${port}`)

})












