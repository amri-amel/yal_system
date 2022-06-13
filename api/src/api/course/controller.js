import { success, notFound } from '../../services/response/'
import { Course } from '.'
import { courseUpload } from '../../services/multer'

export const create = ({ bodymen: { body } }, res, next) =>
  Course.create(body)
    .then((course) => course.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Course.count(query)
    .then(count => Course.find(query, select, cursor)
      .then((courses) => ({
        count,
        rows: courses.map((course) => course.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then((course) => course ? course.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then((course) => course ? Object.assign(course, body).save() : null)
    .then((course) => course ? course.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Course.findById(params.id)
    .then(notFound(res))
    .then((course) => course ? course.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const uploadCourseCover = async(req,res,next)=>{
  await courseUpload(req, res, async (error) => {
    if (error) {
      res.json({ error: error })
    }
    try {
      const uploadedPhoto = req.file
      const photoUrl = 'uploads/' + uploadedPhoto.filename
      const response = await Course.findByIdAndUpdate(req.params.id, { cover: photoUrl })
      res.json(response)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
}