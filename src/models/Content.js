import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  section: { type: String, required: true }, // 'stats', 'resources', 'works', 'insights'
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String },
  link: { type: String },
  image: { type: String }, // ইমেজ বা আইকনের জন্য
  numberValue: { type: String }, // Stats এর সংখ্যার জন্য (যেমন: "500+")
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);