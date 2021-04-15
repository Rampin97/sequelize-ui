import { MAX_IDENTIFIER_LENGTH, Schema } from '@lib/core'
import {
  deepEmpty,
  nameEmpty,
  nameLongerThan,
  namesEqSingular,
  nameStartsWithNumber,
} from '@lib/utils'

export type SchemaFormErrors = {
  name?: string
}

export const emptyErrors: SchemaFormErrors = {
  name: undefined,
}

export function validateSchema(schema: Schema, schemas: Schema[]): SchemaFormErrors {
  return {
    name: validateSchemaName(schema, schemas),
  }
}

export function noSchemaFormErrors(errors: SchemaFormErrors): boolean {
  return deepEmpty(errors)
}

function validateSchemaName(schema: Schema, schemas: Schema[]): string | undefined {
  if (nameEmpty(schema.name)) {
    return 'Schema name is required'
  }

  if (nameStartsWithNumber(schema.name)) {
    return 'Schema name cannot start with a number'
  }

  if (nameLongerThan(schema.name, MAX_IDENTIFIER_LENGTH)) {
    return 'Schema name cannot be longer than 63 characters'
  }

  if (findDuplicateSchema(schema, schemas)) {
    return 'Schema name must be unique'
  }
}

function findDuplicateSchema(schema: Schema, schemas: Schema[]): Schema | undefined {
  return schemas.find((s) => s.id !== schema.id && namesEqSingular(s.name, schema.name))
}
