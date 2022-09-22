
const socket = io('http://localhost:3000')

do {
    username = prompt('Please enter your name ')


} while (!username);

let msg_area = document.querySelector('.send_msg')


msg_area.addEventListener('keyup', (e) => {

    if (e.key === 'Enter') {

        console.log(e.target.value)
        send_msg(e.target.value)
        document.querySelector('.send_msg').value = '';


    }

})

function send_msg(msg) {
    user_data = {
        name: username,
        message: msg
    }

    appendmsg(user_data, 'outgoing_mg')


    socket.emit('sending', user_data)







}




function appendmsg(userinfo, type) {
    let send_msg = document.querySelector('.message_part')
    let main_div = document.createElement('div')
    let classname = type
    main_div.classList.add(classname)

    let markupmsg = `
<h4>${userinfo.name}</h4>
<p>${userinfo.message}</p>
`

    main_div.innerHTML = markupmsg
    send_msg.appendChild(main_div)



}
socket.on('final_msg', (m) => {
    appendmsg(m, 'incoming_mg')
})

let Join_room = document.querySelector('#joinroom')
Join_room.addEventListener('click', () => {

    console.log('joined event')
    socket.emit('about_user')


    socket.emit('memberjoined')



    



})
socket.on('userroom_creation', () => {
    console.log('User room created successfully');
})