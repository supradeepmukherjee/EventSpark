import mongoose, { model, Schema } from "mongoose";

<<<<<<< HEAD
const schema = new Schema(
  {
=======
const schema = new Schema({
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
>>>>>>> 18e2cdf4a89ab9d12efe2a788e28d064331f3950
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    reply: String,
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || model("Contact", schema);
