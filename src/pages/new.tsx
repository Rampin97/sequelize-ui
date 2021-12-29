import { createSchema } from '@src/api/schema'
import { emptySchema, Schema } from '@src/core/schema'
import { goTo } from '@src/routing/navigation'
import { indexRoute, schemaRoute } from '@src/routing/routes'
import withLayout from '@src/ui/hocs/withLayout'
import SchemaLayout from '@src/ui/layouts/SchemaLayout'
import React from 'react'

function SchemaPage(): React.ReactElement {
  const schema = React.useMemo(emptySchema, [])

  const handleChange = React.useCallback(async (schema: Schema) => {
    const created = await createSchema(schema)
    goTo(schemaRoute(created.id), { replace: true })
    return created
  }, [])

  const handleCancel = () => goTo(indexRoute())

  return (
    <SchemaLayout
      initiallyEditing
      schema={schema}
      onChange={handleChange}
      onClickClose={handleCancel}
    />
  )
}

export default withLayout(() => ({
  compact: true,
  title: 'Sequelize UI | Create a Schema',
  metaDescription:
    'Use Sequelize UI to quickly generate Sequelize TypeScript code online. Customize your data model and database settings, then export your Node.js project.',
}))(SchemaPage)
