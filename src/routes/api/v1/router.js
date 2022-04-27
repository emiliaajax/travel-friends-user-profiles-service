/**
 * API version 1 routes.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { router as userProfilesRouter } from './user-profiles-routes.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of this API!'
}))

router.use('/', userProfilesRouter)
