import {defineField} from 'sanity'

export const visibilityField = defineField({
  name: 'visibility',
  title: 'Visibility',
  type: 'string',
  initialValue: 'public',
  options: {
    list: [
      { title: 'Public', value: 'public' },
      { title: 'Registered', value: 'registered' },
      { title: 'Premium', value: 'premium' }
    ],
    layout: 'dropdown'
  },
})

export const premiumLevelField = defineField({
  name: 'premiumLevel',
  title: 'Premium Level',
  type: 'string',
  hidden: ({ parent }) => parent?.visibility !== 'premium',
  options: {
    list: [
      { title: 'Silver', value: 'silver' },
      { title: 'Gold', value: 'gold' },
      { title: 'Institutional', value: 'institutional' },
    ]
  }
})

export const statusField = defineField({
  name: 'status',
  title: 'Status',
  type: 'string',
  initialValue: 'draft',
  options: {
    list: [
      { title: 'Draft', value: 'draft' },
      { title: 'In Review', value: 'in_review' },
      { title: 'Scheduled', value: 'scheduled' },
      { title: 'Published', value: 'published' },
      { title: 'Archived', value: 'archived' }
    ],
    layout: 'dropdown'
  },
  validation: (R) => R.required()
})

export const dateMetaFields = [
  defineField({
    name: 'createdAt',
    title: 'Created At',
    type: 'datetime',
    initialValue: () => new Date().toISOString(),
    readOnly: true
  }),
  defineField({
    name: 'updatedAt',
    title: 'Updated At',
    type: 'datetime',
    initialValue: () => new Date().toISOString()
  }),
  defineField({
    name: 'publishAt',
    title: 'Publish At',
    type: 'datetime'
  }),
]

export const bylineFields = [
  defineField({
    name: 'authors',
    title: 'Authors (ordered)',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'user' }] }],
    options: { sortable: true }
  }),
  defineField({
    name: 'editors',
    title: 'Editors',
    type: 'array',
    of: [{ type: 'reference', to: [{ type: 'user' }] }],
  }),
]

export const citationField = defineField({
  name: 'citations',
  title: 'Citations',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'label', type: 'string', validation: (R) => R.required() },
        { name: 'doi', type: 'string' },
        { name: 'url', type: 'url' },
        { name: 'accessDate', title: 'Access Date', type: 'date' }
      ]
    }
  ]
})
