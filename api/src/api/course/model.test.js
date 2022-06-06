import { Course } from '.'

let course

beforeEach(async () => {
  course = await Course.create({ title: 'test', description: 'test', cover: 'test', author: 'test', isFeatured: 'test', category: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = course.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(course.id)
    expect(view.title).toBe(course.title)
    expect(view.description).toBe(course.description)
    expect(view.cover).toBe(course.cover)
    expect(view.author).toBe(course.author)
    expect(view.isFeatured).toBe(course.isFeatured)
    expect(view.category).toBe(course.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = course.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(course.id)
    expect(view.title).toBe(course.title)
    expect(view.description).toBe(course.description)
    expect(view.cover).toBe(course.cover)
    expect(view.author).toBe(course.author)
    expect(view.isFeatured).toBe(course.isFeatured)
    expect(view.category).toBe(course.category)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
