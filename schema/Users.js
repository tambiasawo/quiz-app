import { models, model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const User = models.user || model("user", UserSchema);

export default User;
