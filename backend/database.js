import mongoose from "mongoose"
const URI = "mongodb://127.0.0.1:27017/dolarsiti"

mongoose.connect(URI) 

const connection = mongoose.connection;

connection.once("open", () =>{
    console.log("BD is connected");
});

connection.on("disconnected", ()=>{
    console.log("server is connected")
})

connection.on("error", (error)=>{
    console.log("Error found" +  error)
})