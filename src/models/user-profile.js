/**
 * Mongoose model UserProfile.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  },
  gender: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  profilePicture: {
    type: String
  },
  active: {
    type: Boolean
  },
  continentDestination: {
    type: String,
    trim: true
  },
  countryDestination: {
    type: String,
    trim: true
  },
  travelDescription: {
    type: String,
    trim: true
  },
  agePreference: {
    type: Array
  },
  genderPreference: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Removes sensitive information by transforming the resulting object.
     *
     * @param {object} doc The mongoose document to be converted.
     * @param {object} ret The plain object response which has been converted.
     */
    transform: function (doc, ret) {
      // delete ret._id
      delete ret.__v
      // delete ret.userId
    }
  },
  virtuals: true
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Creates a model using the schema.
export const UserProfile = mongoose.model('UserProfile', schema)
