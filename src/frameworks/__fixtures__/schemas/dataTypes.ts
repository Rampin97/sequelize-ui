import {
  arrayDataType,
  bigIntDataType,
  blobDataType,
  booleanDataType,
  ciTextDataType,
  dateDataType,
  dateTimeDataType,
  decimalDataType,
  doubleDataType,
  enumDataType,
  floatDataType,
  integerDataType,
  jsonBDataType,
  jsonDataType,
  Model,
  realDataType,
  Schema,
  smallIntDataType,
  stringDataType,
  textDataType,
  timeDataType,
  uuidDataType,
  UuidType,
} from '@src/core/schema'
import { fromParts } from '@src/utils/dateTime'
import shortid from 'shortid'

const time = fromParts(2021, 1, 1)

const Id = {
  DataType: shortid(),
} as const

const dataTypes: Model = {
  id: Id.DataType,
  name: 'category',
  createdAt: time,
  updatedAt: time,
  fields: [
    {
      id: shortid(),
      name: 'string',
      type: stringDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'string with length',
      type: stringDataType({ length: 100 }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'text',
      type: textDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'ci text',
      type: ciTextDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'integer',
      type: integerDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'integer unsigned',
      type: integerDataType({ unsigned: true }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'integer autoincrement',
      type: integerDataType({ autoincrement: true }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'big int',
      type: bigIntDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'small int',
      type: smallIntDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'float',
      type: floatDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'real',
      type: realDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'double',
      type: doubleDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'decimal',
      type: decimalDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'decimal precision',
      type: decimalDataType({ precision: { precision: 14, scale: null } }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'decimal precision and scale',
      type: decimalDataType({ precision: { precision: 14, scale: 2 } }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'date time',
      type: dateTimeDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'date time default now',
      type: dateTimeDataType({ defaultNow: true }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'date',
      type: dateDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'date default now',
      type: dateDataType({ defaultNow: true }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'time',
      type: timeDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'time default now',
      type: timeDataType({ defaultNow: true }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'boolean',
      type: booleanDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'enum',
      type: enumDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'array',
      type: arrayDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'json',
      type: jsonDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'json b',
      type: jsonBDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'blob',
      type: blobDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'uuid',
      type: uuidDataType(),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'uuid default v4',
      type: uuidDataType({ defaultVersion: UuidType.V4 }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
    {
      id: shortid(),
      name: 'uuid default v1',
      type: uuidDataType({ defaultVersion: UuidType.V1 }),
      primaryKey: false,
      required: false,
      unique: false,
      generated: false,
    },
  ],
  associations: [],
}

const dataTypesSchema: Schema = {
  id: shortid(),
  name: 'data types',
  createdAt: time,
  updatedAt: time,
  forkedFrom: null,
  models: [dataTypes],
}

export default dataTypesSchema
