const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = []

// Listen to a new socket
io.on("connection", (socket) => {
  console.log("New connection", socket.id)

  // Listen to a connection  
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({
      userId,
      socketId: socket.id
    })

    console.log("Online users", onlineUsers)

    io.emit("getOnlineUsers", onlineUsers)
  })

  // Recieve message and send to receiver
  socket.on("sendMessage", (message) => {
    console.log({message})
    // Find receiver
    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if(user) {
      io.to(user.socketId).emit("getMessage", message)
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      })
    }
  })

  // Update online users list when a user (this user) disconnects
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

    io.emit("getOnlineUsers", onlineUsers)
  })
});

io.listen(3000);