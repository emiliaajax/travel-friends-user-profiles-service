/**
 * User profiles routes.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { UserProfilesController } from '../../../controllers/api/images-controller.js'

export const router = express.Router()

const controller = new UserProfilesController()

/**
 * Authenticates the request.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {Function} next Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme')
    }

    const payload = jwt.verify(token, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64').toString('ascii'),
      {
        algorithms: 'RS256'
      })

    req.user = {
      id: payload.sub
    }

    next()
  } catch (error) {
    const err = createError(401)
    err.message = 'Access token invalid or not provided.'
    err.cause = error
    next(err)
  }
}

// Routes
router.param('id', (req, res, next, id) => controller.loadImage(req, res, next, id))

router.get('/',
  authenticateJWT,
  (req, res, next) => controller.findAllActiveUsers(req, res, next)
)
