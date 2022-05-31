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
    trim: true,
    maxlength: [256, 'Namn måste vara mindre än 256 tecken']
  },
  surname: {
    type: String,
    trim: true,
    maxlength: [256, 'Namn måste vara mindre än 256 tecken']
  },
  gender: {
    type: String,
    maxlength: [256, 'Namn måste vara mindre än 256 tecken']
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
    trim: true,
    maxlength: [256, 'Världsdel måste vara mindre än 256 tecken']
  },
  countryDestination: {
    type: String,
    trim: true,
    maxlength: [256, 'Land måste vara 256 tecken eller mindre']
  },
  travelDescription: {
    type: String,
    trim: true,
    maxlength: [1000, 'Beskrivning kan max vara 1000 tecken']
  },
  agePreference: {
    type: Array
  },
  genderPreference: {
    type: String,
    trim: true,
    maxlength: [256, 'Världsdel måste vara mindre än 256 tecken']
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
      delete ret.__v
    }
  },
  virtuals: true
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Creates a model using the schema.
export const UserProfile = mongoose.model('UserProfile', schema)
