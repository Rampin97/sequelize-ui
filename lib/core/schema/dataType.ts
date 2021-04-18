export type DataType =
  | StringDataType
  | TextDataType
  | IntegerDataType
  | BigIntDataType
  | SmallIntDataType
  | FloatDataType
  | RealDataType
  | DoubleDataType
  | DecimalDataType
  | DateTimeDataType
  | DateDataType
  | TimeDataType
  | BooleanDataType
  | EnumDataType
  | ArrayDataType
  | JsonDataType
  | BlobDataType
  | UuidDataType

type DataTypeBase<T extends DataTypeType> = { type: T }
type DateTypeOptions = { defaultNow?: boolean }
type NumberOptions = { unsigned?: boolean }
type IntegerOptions = NumberOptions & { autoincrement?: boolean }
type NumericOptions = NumberOptions & { precision?: Precision }
export type Precision = { precision: number; scale?: number }

export type StringDataType = DataTypeBase<DataTypeType.String>
export type TextDataType = DataTypeBase<DataTypeType.Text>
export type IntegerDataType = DataTypeBase<DataTypeType.Integer> & IntegerOptions
export type SmallIntDataType = DataTypeBase<DataTypeType.SmallInt> & IntegerOptions
export type BigIntDataType = DataTypeBase<DataTypeType.BigInt> & IntegerOptions
export type FloatDataType = DataTypeBase<DataTypeType.Float> & NumberOptions
export type RealDataType = DataTypeBase<DataTypeType.Real> & NumberOptions
export type DoubleDataType = DataTypeBase<DataTypeType.Double> & NumberOptions
export type DecimalDataType = DataTypeBase<DataTypeType.Decimal> & NumericOptions
export type DateTimeDataType = DataTypeBase<DataTypeType.DateTime> & DateTypeOptions
export type DateDataType = DataTypeBase<DataTypeType.Date> & DateTypeOptions
export type TimeDataType = DataTypeBase<DataTypeType.Time> & DateTypeOptions
export type BooleanDataType = DataTypeBase<DataTypeType.Boolean>
export type EnumDataType = DataTypeBase<DataTypeType.Enum> & {
  values: string[]
}

export type ArrayDataType = DataTypeBase<DataTypeType.Array> & {
  arrayType: DataType
}

export type JsonDataType = DataTypeBase<DataTypeType.Json>
export type BlobDataType = DataTypeBase<DataTypeType.Blob>
export type UuidDataType = DataTypeBase<DataTypeType.Uuid> & { defaultVersion?: UuidType }

export enum DataTypeType {
  String = 'STRING',
  Text = 'TEXT',
  Integer = 'INTEGER',
  BigInt = 'BIGINT',
  SmallInt = 'SMALLINT',
  Float = 'FLOAT',
  Real = 'REAL',
  Double = 'DOUBLE',
  Decimal = 'DECIMAL',
  DateTime = 'DATE_TIME',
  Date = 'DATE',
  Time = 'TIME',
  Boolean = 'BOOLEAN',
  Enum = 'ENUM',
  Array = 'ARRAY',
  Json = 'JSON',
  Blob = 'BLOB',
  Uuid = 'UUID',
}

export enum UuidType {
  V1 = 'V1',
  V4 = 'V4',
}

export function displayDataType(dataType: DataType): string {
  switch (dataType.type) {
    case DataTypeType.String:
      return 'String'
    case DataTypeType.Text:
      return 'Text'
    case DataTypeType.Uuid:
      return 'UUID'
    case DataTypeType.DateTime:
      return 'Date Time'
    case DataTypeType.Time:
      return 'Time'
    case DataTypeType.Date:
      return 'Date'
    case DataTypeType.Integer:
      return 'Integer'
    case DataTypeType.BigInt:
      return 'Big Int'
    case DataTypeType.SmallInt:
      return 'Small Int'
    case DataTypeType.Float:
      return 'Float'
    case DataTypeType.Real:
      return 'Real'
    case DataTypeType.Double:
      return 'Double'
    case DataTypeType.Decimal:
      return 'Decimal'
    case DataTypeType.Boolean:
      return 'Boolean'
    case DataTypeType.Enum: {
      const types = dataType.values.length > 0 ? dataType.values.join(', ') : undefined
      return `Enum${types ? ` (${types})` : ''}`
    }
    case DataTypeType.Array: {
      const type = displayDataType(dataType.arrayType)
      return `Array (${type})`
    }
    case DataTypeType.Json:
      return 'JSON'
    case DataTypeType.Blob:
      return 'Buffer'
  }
}

export function displayDataTypeType(type: DataTypeType): string {
  switch (type) {
    case DataTypeType.String:
      return 'String'
    case DataTypeType.Text:
      return 'Text'
    case DataTypeType.Uuid:
      return 'UUID'
    case DataTypeType.DateTime:
      return 'Date Time'
    case DataTypeType.Time:
      return 'Time'
    case DataTypeType.Date:
      return 'Date'
    case DataTypeType.Integer:
      return 'Integer'
    case DataTypeType.BigInt:
      return 'Big Int'
    case DataTypeType.SmallInt:
      return 'Small Int'
    case DataTypeType.Float:
      return 'Float'
    case DataTypeType.Real:
      return 'Real'
    case DataTypeType.Double:
      return 'Double'
    case DataTypeType.Decimal:
      return 'Decimal'
    case DataTypeType.Boolean:
      return 'Boolean'
    case DataTypeType.Enum:
      return 'Enum'
    case DataTypeType.Array:
      return 'Array'
    case DataTypeType.Json:
      return 'JSON'
    case DataTypeType.Blob:
      return 'Buffer'
  }
}

export function isDateTimeType(
  dataType: DataType,
): dataType is DateTimeDataType | DateDataType | TimeDataType {
  return [DataTypeType.DateTime, DataTypeType.Date, DataTypeType.Time].includes(dataType.type)
}

type NumberType =
  | IntegerDataType
  | BigIntDataType
  | SmallIntDataType
  | FloatDataType
  | RealDataType
  | DoubleDataType
  | FloatDataType
  | DecimalDataType

export function isNumberType(dataType: DataType): dataType is NumberType {
  return [
    DataTypeType.Integer,
    DataTypeType.BigInt,
    DataTypeType.SmallInt,
    DataTypeType.Float,
    DataTypeType.Real,
    DataTypeType.Double,
    DataTypeType.Float,
    DataTypeType.Decimal,
  ].includes(dataType.type)
}

type IntegerType = IntegerDataType | BigIntDataType | SmallIntDataType

export function isIntegerType(dataType: DataType): dataType is IntegerType {
  return [DataTypeType.Integer, DataTypeType.BigInt, DataTypeType.SmallInt].includes(dataType.type)
}

type NumericType = DecimalDataType

export function isNumericType(dataType: DataType): dataType is NumericType {
  return [DataTypeType.Decimal].includes(dataType.type)
}
export function stringDataType(): StringDataType {
  return { type: DataTypeType.String }
}

export function textDataType(): TextDataType {
  return { type: DataTypeType.Text }
}

export function integerDataType(): IntegerDataType {
  return { type: DataTypeType.Integer }
}

export function bigIntDataType(): BigIntDataType {
  return { type: DataTypeType.BigInt }
}

export function smallIntDataType(): SmallIntDataType {
  return { type: DataTypeType.SmallInt }
}

export function floatDataType(): FloatDataType {
  return { type: DataTypeType.Float }
}

export function realDataType(): RealDataType {
  return { type: DataTypeType.Real }
}

export function doubleDataType(): DoubleDataType {
  return { type: DataTypeType.Double }
}

export function decimalDataType(): DecimalDataType {
  return { type: DataTypeType.Decimal }
}

export function dateTimeDataType(): DateTimeDataType {
  return { type: DataTypeType.DateTime }
}

export function dateDataType(): DateDataType {
  return { type: DataTypeType.Date }
}

export function timeDataType(): TimeDataType {
  return { type: DataTypeType.Time }
}

export function booleanDataType(): BooleanDataType {
  return { type: DataTypeType.Boolean }
}

export function enumDataType(values: string[] = []): EnumDataType {
  return { type: DataTypeType.Enum, values }
}

export function arrayDataType(arrayType = stringDataType()): ArrayDataType {
  return { type: DataTypeType.Array, arrayType }
}

export function jsonDataType(): JsonDataType {
  return { type: DataTypeType.Json }
}

export function blobDataType(): BlobDataType {
  return { type: DataTypeType.Blob }
}

export function uuidDataType(): UuidDataType {
  return { type: DataTypeType.Uuid }
}

export function dataTypeFromDataTypeType(type: DataTypeType): DataType {
  switch (type) {
    case DataTypeType.String:
      return stringDataType()
    case DataTypeType.Text:
      return textDataType()
    case DataTypeType.Uuid:
      return uuidDataType()
    case DataTypeType.DateTime:
      return dateTimeDataType()
    case DataTypeType.Time:
      return timeDataType()
    case DataTypeType.Date:
      return dateDataType()
    case DataTypeType.Integer:
      return integerDataType()
    case DataTypeType.BigInt:
      return bigIntDataType()
    case DataTypeType.SmallInt:
      return smallIntDataType()
    case DataTypeType.Float:
      return floatDataType()
    case DataTypeType.Real:
      return realDataType()
    case DataTypeType.Double:
      return doubleDataType()
    case DataTypeType.Decimal:
      return decimalDataType()
    case DataTypeType.Boolean:
      return booleanDataType()
    case DataTypeType.Enum:
      return enumDataType()
    case DataTypeType.Array:
      return arrayDataType()
    case DataTypeType.Json:
      return jsonDataType()
    case DataTypeType.Blob:
      return blobDataType()
  }
}
