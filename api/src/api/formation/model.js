import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import Coach from '../coach/model';
import Course from '../course/model';


const formationSchema = new Schema({
  titre: {
    type: String
  },
  state: {
    type: String
  },
  duree: {
    type: String
  },
  theme: {
    type: String
  },
  courses: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
  }],
  coach: {
    type: mongoose.Types.ObjectId,
    ref: 'Coach'
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

formationSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      titre: this.titre,
      state: this.state,
      duree: this.duree,
      theme: this.theme,
      courses:this.courses,
      coach:this.coach,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

formationSchema.plugin(mongooseKeywords, { paths: ['titre', 'theme', 'duree'] })

const model = mongoose.model('Formation', formationSchema)

export const schema = model.schema
export default model
