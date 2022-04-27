/**
 * Module for the UserProfilesController.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

// import { UserProfile } from '../../models/user-profile.js'
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
    if (req.user.id !== req.image.owner) {
      next(createError(403))
    }
    next()
  }
}
