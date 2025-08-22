import {defineType, defineField} from 'sanity'

export const auditLog = defineType({
  name: 'auditLog',
  title: 'Audit Log',
  type: 'document',
  fields: [
    defineField({ name: 'actor', type: 'reference', to: [{ type: 'user' }] }),
    defineField({ name: 'action', type: 'string' }),
    defineField({ name: 'entity', type: 'string' }), // e.g., 'article', 'quizItem'
    defineField({ name: 'entityId', type: 'string' }),
    defineField({ name: 'timestamp', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField(
      { 
        name: 'metadata', 
        type: 'object', 
        options: { 
          collapsible: true 
        }, 
        fields: [
          { name: 'createdBy', type: 'string' },
          { name: 'createdAt', type: 'datetime' }
        ] 
      }
    )
  ],
  readOnly: true
})
