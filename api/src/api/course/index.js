import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, 
  uploadCourseCover, addChapter } from './controller'
import { schema } from './model'
export Course, { schema } from './model'

const router = new Router()
const { title, description, cover, author, isFeatured, category } = schema.tree


/**
 * @api {post} /courses Create course
 * @apiName CreateCourse
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Course's title.
 * @apiParam description Course's description.
 * @apiParam cover Course's cover.
 * @apiParam author Course's author.
 * @apiParam isFeatured Course's isFeatured.
 * @apiParam category Course's category.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, author, isFeatured, category }),
  create)

/**
 * @api {get} /courses Retrieve courses
 * @apiName RetrieveCourses
 * @apiGroup Course
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of courses.
 * @apiSuccess {Object[]} rows List of courses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /courses/:id Retrieve course
 * @apiName RetrieveCourse
 * @apiGroup Course
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /courses/:id Update course
 * @apiName UpdateCourse
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Course's title.
 * @apiParam description Course's description.
 * @apiParam cover Course's cover.
 * @apiParam author Course's author.
 * @apiParam isFeatured Course's isFeatured.
 * @apiParam category Course's category.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, description,  author, isFeatured, category }),
  update)

  /**
 * @api {post} /courses/:id/addchapter add chapter
 * @apiName UpdateChapter
 * @apiGroup Course
 * @apiParam {String} access_token admin access token.
 * @apiParam title chapter's title.
 * @apiParam content chapter's content.
 * @apiSuccess {Object} course chapter's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.

 */
router.post('/:id/addchapter',
token({ required: true, roles: ['admin'] }),
body( {title: {
  type: String,
  required: true,
  trim: true,
  minlength: 3
},
content: {
  type: String,
  required: true,
}}),
addChapter)

/**
 * @api {put} /courses/cover/:id Update cover course
 * @apiName UploadCDourseCover
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam cover Course's cover.
 * @apiSuccess {Object} course Course's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
 router.put('/cover/:id',
 token({ required: true, roles: ['admin'] }),
 uploadCourseCover)


/**
 * @api {delete} /courses/:id Delete course
 * @apiName DeleteCourse
 * @apiGroup Course
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Course not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
