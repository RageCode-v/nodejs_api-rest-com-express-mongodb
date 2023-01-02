import mongoose from "mongoose";

mongoose.connect('mongodb+srv://User:password@alura.ufrtqqh.mongodb.net/alura-nodejs');

let db = mongoose.connection;

export default db
