import {defineType, defineField} from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96, isUnique: (slug, ctx) => ctx.defaultIsUnique(slug, ctx) },
      validation: R => R.required()
    }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'parent', title: 'Parent Tag', type: 'reference', to: [{ type: 'tag' }] }),
    defineField({ name: 'synonyms', title: 'Synonyms', type: 'array', of: [{ type: 'string' }] })
  ],
  preview: { select: { title: 'name', subtitle: 'slug.current' } }
})
