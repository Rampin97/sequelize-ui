import { DbCaseStyle, defaultDbOptions } from '@src/core/database'
import schema from '@src/frameworks/__fixtures__/schemas/dataTypes'
import { SequelizeFramework } from '../..'

describe('Sequelize Framework', () => {
  describe('camel case database options', () => {
    it('generates correct code', () => {
      const code = SequelizeFramework.generate({
        schema,
        dbOptions: {
          ...defaultDbOptions,
          caseStyle: DbCaseStyle.Camel,
        },
      })
      expect(code).toMatchSnapshot()
    })
  })
})