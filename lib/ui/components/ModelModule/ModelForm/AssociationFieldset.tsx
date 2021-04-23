import {
  Association,
  AssociationTypeType,
  displayAssociationTypeType,
  displayThroughType,
  ManyToManyAssociation,
  Model,
  Schema,
  ThroughType,
} from '@lib/core/schema'
import { snakeCase } from '@lib/core/utils'
import Radio from '@lib/ui/components/form/Radio'
import Select from '@lib/ui/components/form/Select'
import TextInput from '@lib/ui/components/form/TextInput'
import React, { useCallback, useMemo } from 'react'
import { AssociationFormErrors } from './validation'

type AssociationFieldsetProps = {
  association: Association
  schema: Schema
  errors?: AssociationFormErrors
  onChange: (id: Association['id'], changes: Partial<Association>) => void
  onDelete: (id: Association['id']) => void
}

function AssociationFieldset({
  association,
  schema,
  errors,
  onChange,
  onDelete,
}: AssociationFieldsetProps): React.ReactElement {
  const modelOptions = React.useMemo(
    () => schema.models.map<[string, Model]>((m) => [m.id, m]),
    [schema.models],
  )

  const model: Model = useMemo(
    () => schema.models.find((m) => m.id === association.sourceModelId) as Model,
    [schema.models, association.sourceModelId],
  )

  const targetModel: Model = useMemo(
    () => schema.models.find((m) => m.id === association.targetModelId) as Model,
    [schema.models, association.targetModelId],
  )

  const throughModel: Model | undefined = useMemo(
    () =>
      schema.models.find(
        (m) =>
          association.type.type === AssociationTypeType.ManyToMany &&
          association.type.through.type === ThroughType.ThroughModel &&
          m.id === association.type.through.modelId,
      ),
    [schema.models, association.type],
  )

  const handleChange = useCallback(
    (changes: Partial<Association>): void => {
      onChange(association.id, changes)
    },
    [association.id, onChange],
  )

  const handleChangeManyToMany = useCallback(
    (cb: (type: ManyToManyAssociation) => ManyToManyAssociation): void => {
      if (association.type.type !== AssociationTypeType.ManyToMany) {
        const table = snakeCase(`${model.name} ${targetModel.name}`)

        handleChange({
          type: cb({
            type: AssociationTypeType.ManyToMany,
            through: { type: ThroughType.ThroughTable, table },
          }),
        })
        return
      }
      handleChange({ type: cb(association.type) })
    },
    [model, targetModel, association.type, handleChange],
  )

  const handleChangeType = useCallback(
    (type: AssociationTypeType) => {
      handleChange({
        type:
          type === AssociationTypeType.ManyToMany
            ? {
                type,
                through: {
                  type: ThroughType.ThroughTable,
                  table: snakeCase(`${model.name} ${targetModel.name}`),
                },
              }
            : { type },
      })
    },
    [model, targetModel, handleChange],
  )

  const handleChangeTarget = useCallback(
    (model: Model) => handleChange({ targetModelId: model.id }),
    [handleChange],
  )

  const handleChangeAlias = useCallback(
    (alias?: string) => handleChange({ alias: alias || undefined }),
    [handleChange],
  )

  const handleChangeForeignKey = useCallback(
    (foreignKey?: string) => handleChange({ foreignKey: foreignKey || undefined }),
    [handleChange],
  )

  const handleChangeThroughType = useCallback(
    (type: ThroughType) => {
      const table = snakeCase(`${model.name} ${targetModel.name}`)

      const throughModel =
        schema.models.find((m) => snakeCase(m.name) === table) || schema.models[0]

      if (type === ThroughType.ThroughModel && throughModel) {
        handleChangeManyToMany((currType) => ({
          ...currType,
          through: { type, modelId: throughModel.id },
        }))
        return
      }

      if (type === ThroughType.ThroughTable) {
        handleChangeManyToMany((currType) => ({ ...currType, through: { type, table } }))
      }
    },
    [model, targetModel, schema.models, handleChangeManyToMany],
  )

  const handleChangeThroughModel = useCallback(
    (model: Model) => {
      handleChangeManyToMany((type) => ({
        ...type,
        through: { type: ThroughType.ThroughModel, modelId: model.id },
      }))
    },
    [handleChangeManyToMany],
  )

  const handleChangeThroughTable = useCallback(
    (table?: string) =>
      handleChangeManyToMany((type) => ({
        ...type,
        through: { type: ThroughType.ThroughTable, table: table || '' },
      })),
    [handleChangeManyToMany],
  )

  const handleChangeTargetForeignKey = useCallback(
    (targetFk?: string) =>
      handleChangeManyToMany((type) => ({ ...type, targetFk: targetFk || undefined })),
    [handleChangeManyToMany],
  )

  const handleDelete = useCallback(() => onDelete(association.id), [onDelete, association.id])

  return (
    <fieldset>
      <Select
        id="association-type"
        label="Type"
        options={AssociationTypeType}
        display={displayAssociationTypeType}
        value={association.type.type}
        onChange={handleChangeType}
      />
      <Select
        id="association-target-model"
        label="Target model"
        options={modelOptions}
        display={modelName}
        value={targetModel}
        onChange={handleChangeTarget}
      />
      <TextInput
        id="association-alias"
        label="as"
        value={association.alias || ''}
        error={errors?.alias}
        onChange={handleChangeAlias}
      />
      <TextInput
        id="association-fk"
        label="Foreign key"
        value={association.foreignKey || ''}
        error={errors?.foreignKey}
        onChange={handleChangeForeignKey}
      />
      {association.type.type === AssociationTypeType.ManyToMany && schema.models.length > 0 && (
        <>
          <Radio
            options={ThroughType}
            value={association.type.through.type}
            display={displayThroughType}
            onChange={handleChangeThroughType}
          />
          {association.type.through.type === ThroughType.ThroughModel && (
            <Select
              id="association-through-model"
              label="Through model"
              options={modelOptions}
              display={modelName}
              value={throughModel}
              onChange={handleChangeThroughModel}
            />
          )}
          {association.type.through.type === ThroughType.ThroughTable && (
            <>
              <TextInput
                id="association-through-table"
                label="Through table"
                value={association.type.through.table}
                error={errors?.throughTable}
                onChange={handleChangeThroughTable}
              />
            </>
          )}
          <TextInput
            id="association-target-fk"
            label="Target foreign key"
            value={association.type.targetFk || ''}
            error={errors?.targetForeignKey}
            onChange={handleChangeTargetForeignKey}
          />
        </>
      )}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </fieldset>
  )
}

function modelName(model: Model): string {
  return model.name
}

export default React.memo(AssociationFieldset)
