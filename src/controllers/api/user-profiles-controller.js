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
   * Sends a JSON response containing all active users.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findActiveUsers (req, res, next) {
    try {
      const activeUsers = await UserProfile.find({ active: true })

      res
        .status(200)
        .json(activeUsers)
    } catch (error) {
      next(error)
    }
  }
}
