import { success, notFound } from '../../services/response/'
import { Coach } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Coach.create(body)
    .then((coach) => coach.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Coach.count(query)
    .then(count => Coach.find(query, select, cursor)
      .then((coaches) => ({
        count,
        rows: coaches.map((coach) => coach.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Coach.findById(params.id)
    .then(notFound(res))
    .then((coach) => coach ? coach.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Coach.findById(params.id)
    .then(notFound(res))
    .then((coach) => coach ? Object.assign(coach, body).save() : null)
    .then((coach) => coach ? coach.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Coach.findById(params.id)
    .then(notFound(res))
    .then((coach) => coach ? coach.remove() : null)
    .then(success(res, 204))
    .catch(next)
