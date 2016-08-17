import io from 'socket.io-client'

const socket = io('https://vdziubak.com/', {path: '/designFixationServer'})

export default socket
