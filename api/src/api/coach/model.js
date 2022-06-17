import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords'

const coachSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  speciality: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  picture:{
    type: String,
    trim:true
  },
  country: {
    type: String
  },
  observations: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})



coachSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      speciality: this.speciality,
      phone: this.phone,
      address: this.address,
      city: this.city,
      country: this.country,
      observations: this.observations,
      picture:this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

coachSchema.plugin(mongooseKeywords, { paths: ['fullName', 'speciality','email',
                                                'phone','address','city','country',
                                              'observations'] })

const model = mongoose.model('Coach', coachSchema)

export const schema = model.schema
export default model


  