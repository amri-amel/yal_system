import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Course } from '.'

const app = () => express(apiRoot, routes)

let course

beforeEach(async () => {
  course = await Course.create({})
})

test('POST /courses 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', description: 'test', cover: 'test', author: 'test', isFeatured: 'test', category: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.cover).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.isFeatured).toEqual('test')
  expect(body.category).toEqual('test')
})

test('POST /courses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /courses 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /courses/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${course.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(course.id)
})

test('GET /courses/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /courses/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${course.id}`)
    .send({ access_token: masterKey, title: 'test', description: 'test', cover: 'test', author: 'test', isFeatured: 'test', category: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(course.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.cover).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.isFeatured).toEqual('test')
  expect(body.category).toEqual('test')
})

test('PUT /courses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${course.id}`)
  expect(status).toBe(401)
})

test('PUT /courses/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', description: 'test', cover: 'test', author: 'test', isFeatured: 'test', category: 'test' })
  expect(status).toBe(404)
})

test('DELETE /courses/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${course.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /courses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${course.id}`)
  expect(status).toBe(401)
})

test('DELETE /courses/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
