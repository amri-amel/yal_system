import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Coach } from '.'

const app = () => express(apiRoot, routes)

let coach

beforeEach(async () => {
  coach = await Coach.create({})
})

test('POST /coaches 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, fullName: 'test', email: 'test', speciality: 'test', phone: 'test', address: 'test', city: 'test', country: 'test', observations: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fullName).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.speciality).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.observations).toEqual('test')
})

test('POST /coaches 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /coaches 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /coaches 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /coaches/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${coach.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coach.id)
})

test('GET /coaches/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${coach.id}`)
  expect(status).toBe(401)
})

test('GET /coaches/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /coaches/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${coach.id}`)
    .send({ access_token: masterKey, fullName: 'test', email: 'test', speciality: 'test', phone: 'test', address: 'test', city: 'test', country: 'test', observations: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coach.id)
  expect(body.fullName).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.speciality).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.observations).toEqual('test')
})

test('PUT /coaches/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${coach.id}`)
  expect(status).toBe(401)
})

test('PUT /coaches/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, fullName: 'test', email: 'test', speciality: 'test', phone: 'test', address: 'test', city: 'test', country: 'test', observations: 'test' })
  expect(status).toBe(404)
})

test('DELETE /coaches/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coach.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /coaches/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coach.id}`)
  expect(status).toBe(401)
})

test('DELETE /coaches/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
