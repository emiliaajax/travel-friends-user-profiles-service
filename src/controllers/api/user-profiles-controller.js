/**
 * Module for the UserProfilesController.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import { UserProfile } from '../../models/user-profile.js'
import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class UserProfilesController {
  /**
   * Authorizes the user.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   * @returns {Function} Express next middleware function.
   */
  async authorize (req, res, next) {
    if (req.user.id !== req.profile.userId) {
      next(createError(403))
    }
    next()
  }

  /**
   * Provides req.profile to the routes if id is present.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   * @param {string} id The value of the id.
   */
  async loadUser (req, res, next, id) {
    try {
      const profile = await UserProfile.findById(id)

      if (!profile) {
        return next(createError(404))
      }

      req.profile = profile

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all users.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findAllUsers (req, res, next) {
    try {
      const users = await UserProfile.find()

      res
        .status(200)
        .json(users)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all active users.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findAllActiveUsers (req, res, next) {
    try {
      const activeUsers = await UserProfile.find({ active: true })

      res
        .status(200)
        .json(activeUsers)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing one user.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  findUser (req, res, next) {
    res
      .status(200)
      .json(req.profile)
  }

  /**
   * Creates a user profile.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async createProfile (req, res, next) {
    try {
      const profile = new UserProfile(req.body)

      await profile.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${profile._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json({
          id: profile.id
        })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Finds profile of authenticated user.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findMyProfile (req, res, next) {
    try {
      const user = await UserProfile.findOne({ userId: req.user.id })

      res
        .status(201)
        .json(user)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Updates a user profile.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async updateProfile (req, res, next) {
    try {
      if (req.body.name) {
        req.profile.name = req.body.name
      }
      if (req.body.surname) {
        req.profile.surname = req.body.surname
      }
      if (req.body.gender) {
        req.profile.gender = req.body.gender
      }
      if (req.body.dateOfBirth) {
        req.profile.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.active !== undefined) {
        req.profile.active = req.body.active
      }
      if (req.body.profilePicture) {
        req.profile.profilePicture = req.body.profilePicture
      }
      if (req.body.continentDestination) {
        req.profile.continentDestination = req.body.continentDestination
      }
      if (req.body.continentDestination) {
        req.profile.countryDestination = req.body.countryDestination
      }
      if (req.body.travelDescription) {
        req.profile.travelDescription = req.body.travelDescription
      }
      if (req.body.agePreference) {
        req.profile.agePreference = req.body.agePreference
      }
      if (req.body.genderPreference) {
        req.profile.genderPreference = req.body.genderPreference
      }

      await req.profile.save()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a profile.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.profile.deleteOne()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}
