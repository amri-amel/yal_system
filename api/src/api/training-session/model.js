import mongoose, { Schema } from 'mongoose'
import Formation from '../formation/model';
import Coach from '../coach/model'

const trainigSessionSchema = new Schema({
  plannedStartDate: {
    type: Date
  },
  plannedEndDate: {
    type: Date
  },
  formation: {
   type:mongoose.Types.ObjectId,
   ref:'Formation'
  },
  coach: {
    type:mongoose.Types.ObjectId,
    ref:'Coach'
  },
  closed: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

trainigSessionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      plannedStartDate: this.plannedStartDate,
      plannedEndDate: this.plannedEndDate,
      formation: this.formation,
      coach: this.coach,
      closed: this.closed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('TrainigSession', trainigSessionSchema)

export const schema = model.schema
export default model
