import {defineType, defineField} from 'sanity'

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'kind', title: 'Type', type: 'string', initialValue: 'image',
      options: { list: ['image','video','pdf'] }, validation: R => R.required()
    }),
    // Either external URL or uploaded file
    defineField({ name: 'url', type: 'url', hidden: ({parent}) => !!parent?.file }),
    defineField({ name: 'file', type: 'file', hidden: ({parent}) => !!parent?.url }),
    defineField({ name: 'mime', type: 'string' }),
    defineField({ name: 'altText', title: 'Alt text', type: 'string' }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'credit', type: 'string' }),
    defineField({ name: 'license', type: 'string' }),
    defineField({ name: 'width', type: 'number' }),
    defineField({ name: 'height', type: 'number' }),
    defineField({ name: 'hash', type: 'string' }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'kind', media: 'file' }
  }
})
