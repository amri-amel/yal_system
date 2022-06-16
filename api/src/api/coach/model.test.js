import { Coach } from '.'

let coach

beforeEach(async () => {
  coach = await Coach.create({ fullName: 'test', email: 'test', speciality: 'test', phone: 'test', address: 'test', city: 'test', country: 'test', observations: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = coach.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coach.id)
    expect(view.fullName).toBe(coach.fullName)
    expect(view.email).toBe(coach.email)
    expect(view.speciality).toBe(coach.speciality)
    expect(view.phone).toBe(coach.phone)
    expect(view.address).toBe(coach.address)
    expect(view.city).toBe(coach.city)
    expect(view.country).toBe(coach.country)
    expect(view.observations).toBe(coach.observations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = coach.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coach.id)
    expect(view.fullName).toBe(coach.fullName)
    expect(view.email).toBe(coach.email)
    expect(view.speciality).toBe(coach.speciality)
    expect(view.phone).toBe(coach.phone)
    expect(view.address).toBe(coach.address)
    expect(view.city).toBe(coach.city)
    expect(view.country).toBe(coach.country)
    expect(view.observations).toBe(coach.observations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
