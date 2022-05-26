import { success, notFound } from '../../services/response/'
import { Formation } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Formation.create(body)
    .then((formation) => formation.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Formation.count(query)
    .then(count => Formation.find(query, select, cursor)
      .then((formations) => ({
        count,
        rows: formations.map((formation) => formation.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Formation.findById(params.id)
    .then(notFound(res))
    .then((formation) => formation ? formation.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Formation.findById(params.id)
    .then(notFound(res))
    .then((formation) => formation ? Object.assign(formation, body).save() : null)
    .then((formation) => formation ? formation.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Formation.findById(params.id)
    .then(notFound(res))
    .then((formation) => formation ? formation.remove() : null)
    .then(success(res, 204))
    .catch(next)
