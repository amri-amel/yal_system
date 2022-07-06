import { success, notFound } from '../../services/response/'
import { TrainigSession } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  TrainigSession.create(body)
    .then((trainigSession) => trainigSession.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  TrainigSession.count(query)
    .then(count => TrainigSession.find(query, select, cursor)
    .populate({path:'formation',populate:{path:'courses'}})
    .populate({path:'coach'})
      .then((trainigSessions) => ({
        count,
        rows: trainigSessions.map((trainigSession) => trainigSession.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  TrainigSession.findById(params.id)
    .then(notFound(res))
    .then((trainigSession) => trainigSession ? trainigSession.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  TrainigSession.findById(params.id)
    .then(notFound(res))
    .then((trainigSession) => trainigSession ? Object.assign(trainigSession, body).save() : null)
    .then((trainigSession) => trainigSession ? trainigSession.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TrainigSession.findById(params.id)
    .then(notFound(res))
    .then((trainigSession) => trainigSession ? trainigSession.remove() : null)
    .then(success(res, 204))
    .catch(next)
