import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URL || '';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
