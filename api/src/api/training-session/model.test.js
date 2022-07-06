import { TrainigSession } from '.'

let trainigSession

beforeEach(async () => {
  trainigSession = await TrainigSession.create({ plannedStartDate: 'test', plannedEndDate: 'test', formation: 'test', coach: 'test', closed: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trainigSession.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trainigSession.id)
    expect(view.plannedStartDate).toBe(trainigSession.plannedStartDate)
    expect(view.plannedEndDate).toBe(trainigSession.plannedEndDate)
    expect(view.formation).toBe(trainigSession.formation)
    expect(view.coach).toBe(trainigSession.coach)
    expect(view.closed).toBe(trainigSession.closed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = trainigSession.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trainigSession.id)
    expect(view.plannedStartDate).toBe(trainigSession.plannedStartDate)
    expect(view.plannedEndDate).toBe(trainigSession.plannedEndDate)
    expect(view.formation).toBe(trainigSession.formation)
    expect(view.coach).toBe(trainigSession.coach)
    expect(view.closed).toBe(trainigSession.closed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
