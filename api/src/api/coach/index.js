import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Coach, { schema } from './model'

const router = new Router()
const { fullName, email, speciality, phone, address, city, country, observations } = schema.tree

/**
 * @api {post} /coaches Create coach
 * @apiName CreateCoach
 * @apiGroup Coach
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam fullName Coach's fullName.
 * @apiParam email Coach's email.
 * @apiParam speciality Coach's speciality.
 * @apiParam phone Coach's phone.
 * @apiParam address Coach's address.
 * @apiParam city Coach's city.
 * @apiParam country Coach's country.
 * @apiParam observations Coach's observations.
 * @apiSuccess {Object} coach Coach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coach not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ fullName, email, speciality, phone, address, city, country, observations }),
  create)

/**
 * @api {get} /coaches Retrieve coaches
 * @apiName RetrieveCoaches
 * @apiGroup Coach
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of coaches.
 * @apiSuccess {Object[]} rows List of coaches.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true, roles: ['admin','user','coach','student','partner'] }),
  query(),
  index)

/**
 * @api {get} /coaches/:id Retrieve coach
 * @apiName RetrieveCoach
 * @apiGroup Coach
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} coach Coach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coach not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin','user','coach','student','partner'] }),
  show)

/**
 * @api {put} /coaches/:id Update coach
 * @apiName UpdateCoach
 * @apiGroup Coach
 * @apiParam {String} access_token master access token.
 * @apiParam fullName Coach's fullName.
 * @apiParam email Coach's email.
 * @apiParam speciality Coach's speciality.
 * @apiParam phone Coach's phone.
 * @apiParam address Coach's address.
 * @apiParam city Coach's city.
 * @apiParam country Coach's country.
 * @apiParam observations Coach's observations.
 * @apiSuccess {Object} coach Coach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coach not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ fullName, email, speciality, phone, address, city, country, observations }),
  update)

/**
 * @api {delete} /coaches/:id Delete coach
 * @apiName DeleteCoach
 * @apiGroup Coach
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Coach not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
