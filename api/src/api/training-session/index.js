import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TrainigSession, { schema } from './model'

const router = new Router()
const { plannedStartDate, plannedEndDate, formation, coach, closed } = schema.tree

/**
 * @api {post} /trainig-sessions Create trainig session
 * @apiName CreateTrainigSession
 * @apiGroup TrainigSession
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam plannedStartDate Trainig session's plannedStartDate.
 * @apiParam plannedEndDate Trainig session's plannedEndDate.
 * @apiParam formation Trainig session's formation.
 * @apiParam coach Trainig session's coach.
 * @apiParam closed Trainig session's closed.
 * @apiSuccess {Object} trainigSession Trainig session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trainig session not found.
 * @apiError 401 master access only.
 */
router.post('/',
token({ required: true, roles: ['admin'] }),
  body({ plannedStartDate, plannedEndDate, formation, coach, closed }),
  create)

/**
 * @api {get} /trainig-sessions Retrieve trainig sessions
 * @apiName RetrieveTrainigSessions
 * @apiGroup TrainigSession
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of trainig sessions.
 * @apiSuccess {Object[]} rows List of trainig sessions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /trainig-sessions/:id Retrieve trainig session
 * @apiName RetrieveTrainigSession
 * @apiGroup TrainigSession
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} trainigSession Trainig session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trainig session not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  show)

/**
 * @api {put} /trainig-sessions/:id Update trainig session
 * @apiName UpdateTrainigSession
 * @apiGroup TrainigSession
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam plannedStartDate Trainig session's plannedStartDate.
 * @apiParam plannedEndDate Trainig session's plannedEndDate.
 * @apiParam formation Trainig session's formation.
 * @apiParam coach Trainig session's coach.
 * @apiParam closed Trainig session's closed.
 * @apiSuccess {Object} trainigSession Trainig session's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Trainig session not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
token({ required: true, roles: ['admin'] }),
  body({ plannedStartDate, plannedEndDate, formation, coach, closed }),
  update)

/**
 * @api {delete} /trainig-sessions/:id Delete trainig session
 * @apiName DeleteTrainigSession
 * @apiGroup TrainigSession
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Trainig session not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
token({ required: true, roles: ['admin'] }),
  destroy)

export default router
