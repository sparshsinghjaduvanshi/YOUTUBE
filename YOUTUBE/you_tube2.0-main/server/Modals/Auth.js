import mongoose from "mongoose";
const userschema = mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  channelname: { type: String },
  description: { type: String },
  image: { type: String },
  joinedon: { type: Date, default: Date.now },
  plan: {
    type: String,
    default: "free",
  },

  downloads: [
    {
      videoId: String,
      downloadedAt: {
        type: Date,
        default: Date.now,
      },

    },
  ],

});

export default mongoose.models.User || mongoose.model("User", userschema);

