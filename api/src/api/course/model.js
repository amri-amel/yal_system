import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const courseSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  cover: {
    type: String
  },
  author: {
    type: String
  },
  isFeatured: {
    type: String
  },
  category: {
    type: String
  },
  chapters: [
    {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ],
  ressourceLinks: [
    {
      ressourseName: {
        type: String
      },
      link: {
        type: String
      }
    }],
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => { delete ret._id }
    }
  })

courseSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      description: this.description,
      cover: this.cover,
      author: this.author,
      isFeatured: this.isFeatured,
      category: this.category,
      ressourceLinks: this.ressourceLinks,
      chapters:this.chapters,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

courseSchema.plugin(mongooseKeywords, { paths: ['title', 'description', 'author'] })

const model = mongoose.model('Course', courseSchema)

export const schema = model.schema
export default model
