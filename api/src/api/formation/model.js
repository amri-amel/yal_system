import mongoose, { Schema } from 'mongoose'

const formationSchema = new Schema({
  titre: {
    type: String
  },
  dateDebut: {
    type: String
  },
  duree: {
    type: String
  },
  theme: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

formationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      titre: this.titre,
      dateDebut: this.dateDebut,
      duree: this.duree,
      theme: this.theme,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Formation', formationSchema)

export const schema = model.schema
export default model
