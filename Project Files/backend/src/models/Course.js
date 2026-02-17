import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Section description is required']
  },
  content: {
    type: String, // Base64 encoded content or URL
    required: false
  },
  contentType: {
    type: String,
    enum: ['video', 'image', 'none'],
    default: 'none'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Course title cannot exceed 100 characters']
  },
  educator: {
    type: String,
    required: [true, 'Educator name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  sections: [sectionSchema],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
courseSchema.index({ teacher: 1, createdAt: -1 });
courseSchema.index({ category: 1 });
courseSchema.index({ title: 'text', description: 'text' });

const Course = mongoose.model('Course', courseSchema);

export default Course;
