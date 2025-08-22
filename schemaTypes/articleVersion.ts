import {defineType, defineField} from 'sanity'

export const articleVersion = defineType({
  name: 'articleVersion',
  title: 'Article Version',
  type: 'document',
  fields: [
    defineField({ name: 'article', type: 'reference', to: [{ type: 'article' }], validation: R => R.required() }),
    defineField({ name: 'snapshotTitle', type: 'string' }),
    defineField({ name: 'snapshotDek', type: 'text' }),
    defineField({ name: 'snapshotBody', type: 'portableText' }),
    defineField({ name: 'snapshotMeta', title: 'Meta', type: 'object', fields: [
      { name: 'tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }] },
      { name: 'authors', type: 'array', of: [{ type: 'reference', to: [{ type: 'user' }] }] },
      { name: 'editors', type: 'array', of: [{ type: 'reference', to: [{ type: 'user' }] }] },
      { name: 'kind', type: 'string' },
      { name: 'visibility', type: 'string' },
      { name: 'premiumLevel', type: 'string' }
    ]}),
    defineField({ name: 'commitMessage', type: 'string' }),
    defineField({ name: 'diff', title: 'Diff (opaque JSON)', type: 'text' }),
    defineField({ name: 'versionCreatedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'actor', title: 'Actor', type: 'reference', to: [{ type: 'user' }] })
  ],
  preview: { select: { title: 'commitMessage', subtitle: 'versionCreatedAt' } }
})
