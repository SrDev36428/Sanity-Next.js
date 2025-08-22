import {defineType, defineField} from 'sanity'
import {visibilityField, premiumLevelField} from './shared'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', isUnique: (s,c)=>c.defaultIsUnique(s,c) }, validation: R => R.required() }),
    defineField({ name: 'body', type: 'portableText' }),
    visibilityField, premiumLevelField
  ]
})

export const navNode = defineType({
  name: 'navNode',
  title: 'Navigation Node',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'string' }),
    defineField({ name: 'position', type: 'number' }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'navNode' }] }),
    defineField({ name: 'page', type: 'reference', to: [{ type: 'page' }] }),
    defineField({ name: 'externalUrl', type: 'url' }),
    defineField({ name: 'visibility', type: 'string', options: { list: ['public','registered','premium'] }, initialValue: 'public' })
  ],
  preview: { select: { title: 'title', subtitle: 'slug' } }
})
