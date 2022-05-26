import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Formation } from '.'

const app = () => express(apiRoot, routes)

let formation

beforeEach(async () => {
  formation = await Formation.create({})
})

test('POST /formations 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, titre: 'test', dateDebut: 'test', duree: 'test', theme: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.titre).toEqual('test')
  expect(body.dateDebut).toEqual('test')
  expect(body.duree).toEqual('test')
  expect(body.theme).toEqual('test')
})

test('POST /formations 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /formations 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /formations 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /formations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${formation.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(formation.id)
})

test('GET /formations/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${formation.id}`)
  expect(status).toBe(401)
})

test('GET /formations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /formations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${formation.id}`)
    .send({ access_token: masterKey, titre: 'test', dateDebut: 'test', duree: 'test', theme: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(formation.id)
  expect(body.titre).toEqual('test')
  expect(body.dateDebut).toEqual('test')
  expect(body.duree).toEqual('test')
  expect(body.theme).toEqual('test')
})

test('PUT /formations/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${formation.id}`)
  expect(status).toBe(401)
})

test('PUT /formations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, titre: 'test', dateDebut: 'test', duree: 'test', theme: 'test' })
  expect(status).toBe(404)
})

test('DELETE /formations/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${formation.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /formations/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${formation.id}`)
  expect(status).toBe(401)
})

test('DELETE /formations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
