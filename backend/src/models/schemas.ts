import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  address: {
    street: String,
    city: String,
  },
});

const Users = mongoose.model("Users", userSchema, "users");

const mySchema = { Users };

export default mySchema;
