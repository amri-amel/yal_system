import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { TrainigSession } from '.'

const app = () => express(apiRoot, routes)

let trainigSession

beforeEach(async () => {
  trainigSession = await TrainigSession.create({})
})

test('POST /trainig-sessions 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, plannedStartDate: 'test', plannedEndDate: 'test', formation: 'test', coach: 'test', closed: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.plannedStartDate).toEqual('test')
  expect(body.plannedEndDate).toEqual('test')
  expect(body.formation).toEqual('test')
  expect(body.coach).toEqual('test')
  expect(body.closed).toEqual('test')
})

test('POST /trainig-sessions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trainig-sessions 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /trainig-sessions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /trainig-sessions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${trainigSession.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trainigSession.id)
})

test('GET /trainig-sessions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${trainigSession.id}`)
  expect(status).toBe(401)
})

test('GET /trainig-sessions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /trainig-sessions/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${trainigSession.id}`)
    .send({ access_token: masterKey, plannedStartDate: 'test', plannedEndDate: 'test', formation: 'test', coach: 'test', closed: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trainigSession.id)
  expect(body.plannedStartDate).toEqual('test')
  expect(body.plannedEndDate).toEqual('test')
  expect(body.formation).toEqual('test')
  expect(body.coach).toEqual('test')
  expect(body.closed).toEqual('test')
})

test('PUT /trainig-sessions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trainigSession.id}`)
  expect(status).toBe(401)
})

test('PUT /trainig-sessions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, plannedStartDate: 'test', plannedEndDate: 'test', formation: 'test', coach: 'test', closed: 'test' })
  expect(status).toBe(404)
})

test('DELETE /trainig-sessions/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trainigSession.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /trainig-sessions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trainigSession.id}`)
  expect(status).toBe(401)
})

test('DELETE /trainig-sessions/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
