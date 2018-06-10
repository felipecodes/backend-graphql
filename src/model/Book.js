import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Book', Schema);
