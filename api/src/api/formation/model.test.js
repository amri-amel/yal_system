import { Formation } from '.'

let formation

beforeEach(async () => {
  formation = await Formation.create({ titre: 'test', dateDebut: 'test', duree: 'test', theme: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = formation.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(formation.id)
    expect(view.titre).toBe(formation.titre)
    expect(view.dateDebut).toBe(formation.dateDebut)
    expect(view.duree).toBe(formation.duree)
    expect(view.theme).toBe(formation.theme)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = formation.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(formation.id)
    expect(view.titre).toBe(formation.titre)
    expect(view.dateDebut).toBe(formation.dateDebut)
    expect(view.duree).toBe(formation.duree)
    expect(view.theme).toBe(formation.theme)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
