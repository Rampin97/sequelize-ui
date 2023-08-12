import {
  Association,
  associationIsCircular,
  associationsAreSame,
  associationsHaveSameForm,
  AssociationType,
  associationTypeIsPlural,
  associationTypeIsSingular,
  AssociationTypeType,
  BelongsToAssociation,
  belongsToType,
  displayAssociation,
  displayAssociationTypeType,
  displayThroughType,
  HasManyAssociation,
  hasManyType,
  HasOneAssociation,
  hasOneType,
  ManyToManyAssociation,
  manyToManyModelType,
  manyToManyTableType,
  ThroughType,
} from '../association'
import {
  belongsTo,
  belongsToType_,
  hasMany,
  hasManyType_,
  hasOne,
  hasOneType_,
  manyToManyModel,
  manyToManyModelType_,
  manyToManyTable,
  manyToManyTableType_,
  throughModel_,
  throughTable_,
} from './__fixtures__/association'

describe('schema dataTypes', () => {
  describe('displayAssociationType', () => {
    const cases: [a: Association, expected: string][] = [
      [belongsTo, 'belongs to'],
      [hasMany, 'has many'],
      [hasOne, 'has one'],
      [manyToManyTable, 'many to many'],
      [manyToManyModel, 'many to many'],
    ]

    it.each(cases)('displayAssociationType(%o) === %s', (a, expected) => {
      expect(displayAssociation(a)).toEqual(expected)
    })
  })

  describe('displayAssociationTypeType', () => {
    const cases: [type: AssociationTypeType, expected: string][] = [
      [AssociationTypeType.BelongsTo, 'belongs to'],
      [AssociationTypeType.HasMany, 'has many'],
      [AssociationTypeType.HasOne, 'has one'],
      [AssociationTypeType.ManyToMany, 'many to many'],
    ]

    describe.each(cases)('displayAssociationTypeType(%s) === %s', (type, expected) => {
      expect(displayAssociationTypeType(type)).toEqual(expected)
    })
  })

  describe('displayThroughType', () => {
    const cases: [type: ThroughType, expected: string][] = [
      [ThroughType.ThroughTable, 'Through table'],
      [ThroughType.ThroughModel, 'Through model'],
    ]

    describe.each(cases)('displayThroughType(%s) === %s', (type, expected) => {
      expect(displayThroughType(type)).toEqual(expected)
    })
  })

  describe('associationsHaveSameForm', () => {
    const cases: [a: Association, b: Association, expected: boolean][] = [
      [belongsTo, belongsTo, true],
      [belongsTo, hasMany, false],
      [belongsTo, hasOne, true],
      [belongsTo, manyToManyTable, false],
      [belongsTo, manyToManyModel, false],

      [hasMany, belongsTo, false],
      [hasMany, hasMany, true],
      [hasMany, hasOne, false],
      [hasMany, manyToManyTable, true],
      [hasMany, manyToManyModel, true],

      [hasOne, belongsTo, true],
      [hasOne, hasMany, false],
      [hasOne, hasOne, true],
      [hasOne, manyToManyTable, false],
      [hasOne, manyToManyModel, false],

      [manyToManyTable, belongsTo, false],
      [manyToManyTable, hasMany, true],
      [manyToManyTable, hasOne, false],
      [manyToManyTable, manyToManyTable, true],
      [manyToManyTable, manyToManyModel, true],

      [manyToManyModel, belongsTo, false],
      [manyToManyModel, hasMany, true],
      [manyToManyModel, hasOne, false],
      [manyToManyModel, manyToManyTable, true],
      [manyToManyModel, manyToManyModel, true],
    ]
    it.each(cases)('associationsHaveSameForm(%o, %o) === %s', (a, b, expected) => {
      expect(associationsHaveSameForm(a, b)).toEqual(expected)
    })
  })

  describe('associationTypeIsSingular', () => {
    const cases: [type: AssociationType, expected: boolean][] = [
      [belongsToType_, true],
      [hasManyType_, false],
      [hasOneType_, true],
      [manyToManyTableType_, false],
      [manyToManyModelType_, false],
    ]
    it.each(cases)('associationTypeIsSingular(%o) === %s', (type, expected) => {
      expect(associationTypeIsSingular(type)).toEqual(expected)
    })
  })

  describe('associationTypeIsPlural', () => {
    const cases: [type: AssociationType, expected: boolean][] = [
      [belongsToType_, false],
      [hasManyType_, true],
      [hasOneType_, false],
      [manyToManyTableType_, true],
      [manyToManyModelType_, true],
    ]
    it.each(cases)('associationTypeIsPlural(%o) === %s', (type, expected) => {
      expect(associationTypeIsPlural(type)).toEqual(expected)
    })
  })

  describe('belongsToType', () => {
    it('returns the correct value', () => {
      expect(belongsToType()).toEqual(belongsToType_)
    })
  })

  describe('hasManyType', () => {
    it('returns the correct value', () => {
      expect(hasManyType()).toEqual(hasManyType_)
    })
  })

  describe('hasOneType', () => {
    it('returns the correct value', () => {
      expect(hasOneType()).toEqual(hasOneType_)
    })
  })

  describe('manyToManyTableType', () => {
    it('returns the correct value', () => {
      expect(manyToManyTableType(throughTable_.table)).toEqual(manyToManyTableType_)
    })
  })

  describe('manyToManyModelType', () => {
    it('returns the correct value', () => {
      expect(manyToManyModelType(throughModel_.modelId)).toEqual(manyToManyModelType_)
    })
  })

  describe('associationIsCircular', () => {
    const aBelongsToB: Association<BelongsToAssociation> = {
      id: 'aBelongsToB',
      alias: null,
      foreignKey: null,
      sourceModelId: 'a',
      targetModelId: 'b',
      type: belongsToType(),
      allowNull: null,
    }

    const aHasManyB: Association<HasManyAssociation> = {
      id: 'aHasManyB',
      alias: null,
      foreignKey: null,
      sourceModelId: 'a',
      targetModelId: 'b',
      type: hasManyType(),
      allowNull: null,
    }

    const aHasOneB: Association<HasOneAssociation> = {
      id: 'aHasOneB',
      alias: null,
      foreignKey: null,
      sourceModelId: 'a',
      targetModelId: 'b',
      type: hasOneType(),
      allowNull: null,
    }

    const bBelongsToA: Association<BelongsToAssociation> = {
      id: 'bBelongsToA',
      alias: null,
      foreignKey: null,
      sourceModelId: 'b',
      targetModelId: 'a',
      type: belongsToType(),
      allowNull: null,
    }

    const bHasManyA: Association<HasManyAssociation> = {
      id: 'bHasManyA',
      alias: null,
      foreignKey: null,
      sourceModelId: 'b',
      targetModelId: 'a',
      type: hasManyType(),
      allowNull: null,
    }

    const bHasOneA: Association<HasManyAssociation> = {
      id: 'bHasOneA',
      alias: null,
      foreignKey: null,
      sourceModelId: 'b',
      targetModelId: 'a',
      type: hasManyType(),
      allowNull: null,
    }

    const aBelongsToC: Association<BelongsToAssociation> = {
      id: 'aBelongsToC',
      alias: null,
      foreignKey: null,
      sourceModelId: 'a',
      targetModelId: 'c',
      type: belongsToType(),
      allowNull: null,
    }

    const aManyToManyB: Association<ManyToManyAssociation> = {
      id: 'aManyToManyB',
      alias: null,
      foreignKey: null,
      sourceModelId: 'a',
      targetModelId: 'b',
      type: manyToManyTableType('foo'),
      allowNull: null,
    }

    const bManyToManyA: Association<ManyToManyAssociation> = {
      id: 'bManyToManyA',
      alias: null,
      foreignKey: null,
      sourceModelId: 'b',
      targetModelId: 'a',
      type: manyToManyTableType('bar'),
      allowNull: null,
    }

    const commonAssociations = [aBelongsToC, aManyToManyB, bManyToManyA]

    const cases: [association: Association, associations: Association[], expected: boolean][] = [
      [aBelongsToB, [aHasManyB, aBelongsToB, ...commonAssociations], true],
      [aBelongsToB, [aHasOneB, aBelongsToB, ...commonAssociations], true],
      [aBelongsToB, [bBelongsToA, aBelongsToB, ...commonAssociations], true],
      [aHasManyB, [bHasManyA, aHasManyB, ...commonAssociations], true],
      [aHasManyB, [bHasOneA, aHasManyB, ...commonAssociations], true],
      [aHasOneB, [bHasOneA, aHasOneB, ...commonAssociations], true],
      [aHasOneB, [bHasManyA, aHasOneB, ...commonAssociations], true],
      [bBelongsToA, [aBelongsToB, bBelongsToA, ...commonAssociations], true],
      [bHasManyA, [aHasManyB, bHasManyA, ...commonAssociations], true],
      [bHasManyA, [aHasOneB, bHasManyA, ...commonAssociations], true],
      [bHasOneA, [aHasManyB, bHasOneA, ...commonAssociations], true],
      [bHasOneA, [aHasOneB, bHasOneA, ...commonAssociations], true],
      [aHasManyB, [aBelongsToB, aHasManyB, ...commonAssociations], true],
      [aHasOneB, [aBelongsToB, aHasOneB, ...commonAssociations], true],
      [aBelongsToB, [bHasManyA, aBelongsToB, ...commonAssociations], false],
      [aBelongsToB, [bHasOneA, aBelongsToB, ...commonAssociations], false],
      [bHasManyA, [aBelongsToB, bHasManyA, ...commonAssociations], false],
      [bHasOneA, [aBelongsToB, bHasOneA, ...commonAssociations], false],
      [aBelongsToB, [aBelongsToB, ...commonAssociations], false],
    ]

    it.each(cases)(
      'associationIsCircular(%s, %o) === %s',
      (association, associations, expected) => {
        expect(associationIsCircular(association, associations)).toBe(expected)
      },
    )
  })

  describe('associationsAreSame', () => {
    const cases: [
      a: Association,
      nameA: string,
      b: Association,
      nameB: string,
      expected: boolean,
    ][] = [
      [{ ...belongsTo, alias: 'foo' }, 'bar', { ...hasOne, alias: 'foo' }, 'baz', true],
      [{ ...belongsTo, alias: 'foo' }, 'bar', hasOne, 'foo', true],
      [{ ...belongsTo }, 'foo', hasOne, 'foo', true],
      [{ ...belongsTo }, 'foo', { ...hasOne, alias: 'foo' }, 'bar', true],
      [{ ...belongsTo, alias: 'foo' }, 'bar', { ...hasOne, alias: 'baz' }, 'qux', false],
      [{ ...belongsTo, alias: 'foo' }, 'bar', hasOne, 'baz', false],
      [{ ...belongsTo }, 'foo', hasOne, 'bar', false],
      [{ ...belongsTo }, 'foo', { ...hasOne, alias: 'bar' }, 'baz', false],
    ]

    it.each(cases)(
      'associationsAreSame(%s, %o) === %s',
      (associationA, targetNameA, associationB, targetNameB, expected) => {
        expect(associationsAreSame({ associationA, targetNameA, associationB, targetNameB })).toBe(
          expected,
        )
      },
    )
  })
})
