import {defineType, defineField} from 'sanity'
import {visibilityField, premiumLevelField, statusField} from './shared'

export const organization  = defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'url', type: 'url' }),
    defineField({ name: 'logo', type: 'reference', to: [{ type: 'mediaAsset' }] }),
    defineField({ name: 'address', type: 'text' }),
    defineField({ name: 'contacts', type: 'array', of: [{ type: 'string' }] })
  ]
})

export const classifiedCategory = defineType({
  name: 'classifiedCategory',
  title: 'Classified Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name', isUnique: (s,c)=>c.defaultIsUnique(s,c) }, validation: R => R.required() }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'classifiedCategory' }] }),
    defineField({ name: 'description', type: 'text' })
  ]
})

export const classifiedListing = defineType({
  name: 'classifiedListing',
  title: 'Classified Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'type', type: 'string', options: { list: ['job','event','course','equipment','service','housing','misc'] }, validation: R => R.required()
    }),
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', isUnique: (s,c)=>c.defaultIsUnique(s,c) }, validation: R => R.required() }),
    defineField({ name: 'body', type: 'portableText' }),
    defineField({ name: 'photos', type: 'array', of: [{ type: 'reference', to: [{ type: 'mediaAsset' }] }] }),
    defineField({ name: 'price', type: 'number' }),
    defineField({ name: 'currency', type: 'string' }),
    defineField({
      name: 'contact', type: 'object', fields: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'website', type: 'url' }
      ]
    }),
    defineField({
      name: 'location', type: 'object', fields: [
        { name: 'city', type: 'string' }, { name: 'region', type: 'string' }, { name: 'country', type: 'string' },
        { name: 'lat', type: 'number' }, { name: 'lon', type: 'number' }
      ]
    }),
    defineField({ name: 'organization', type: 'reference', to: [{ type: 'organization' }] }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }], options: { layout:'tags' } }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'classifiedCategory' }], validation: R => R.required() }),
    statusField, // draft | in_review | scheduled | published | archived (you can map pending/expired in app layer)
    defineField({ name: 'visibility', type: 'string', options: { list: ['public','registered','premium'] }, initialValue: 'public' }),
    defineField({ name: 'postedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'expiresAt', type: 'datetime' }),
    defineField({ name: 'moderationNotes', type: 'text' })
  ]
})
