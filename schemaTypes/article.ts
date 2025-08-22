import {defineType, defineField} from 'sanity'
import {visibilityField, premiumLevelField, statusField, dateMetaFields, bylineFields, citationField} from './shared'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'workflow', title: 'Workflow' },
  ],
  fields: [
    defineField({ name: 'kind', title: 'Type', type: 'string', initialValue: 'lecture_note',
      options: { list: [
        { title: 'Lecture Note', value: 'lecture_note' },
        { title: 'News', value: 'news' },
        { title: 'Historical Vignette', value: 'historical_vignette' },
        { title: 'In Memoriam', value: 'in_memoriam' },
      ]},
      validation: R => R.required(),
      group: 'meta'
    }),
    defineField({
      name: 'slug', type: 'slug', group: 'meta',
      options: {
        source: (doc:any) => doc.title,
        isUnique: (slug, ctx) => ctx.defaultIsUnique(slug, ctx)
      },
      validation: R => R.required()
    }),
    defineField({ name: 'title', type: 'string', validation: R => R.required().min(3), group: 'content' }),
    defineField({ name: 'dek', title: 'Standfirst / Dek', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'body', title: 'Body', type: 'portableText', validation: R => R.required(), group: 'content' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'reference', to: [{type:'mediaAsset'}], group: 'content' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }], options: { layout:'tags' }, group: 'meta' }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url', group: 'meta' }),

    // External forum integration
    defineField({ name: 'discourseTopicId', title: 'Discourse Topic ID', type: 'string', group: 'meta' }),

    // Type-specific fields (conditionally shown)
    defineField({
      name: 'lectureNote',
      title: 'Lecture Note Fields',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      hidden: ({ parent }) => parent?.kind !== 'lecture_note',
      fields: [
        { name: 'learningObjectives', type: 'array', of: [{ type: 'string' }] },
        { name: 'prerequisites', type: 'array', of: [{ type: 'string' }] },
        { name: 'readingTimeMin', type: 'number' },
        { name: 'revisionPolicy', type: 'text' },
        { name: 'license', type: 'string' }
      ],
      group: 'content'
    }),
    defineField({
      name: 'news',
      title: 'News Fields',
      type: 'object',
      hidden: ({ parent }) => parent?.kind !== 'news',
      fields: [
        { name: 'sourceOrg', type: 'string' },
        { name: 'sourceDate', type: 'date' },
        { name: 'newsworthinessNotes', type: 'text' }
      ],
      group: 'content'
    }),
    defineField({
      name: 'historicalVignette',
      title: 'Historical Vignette Fields',
      type: 'object',
      hidden: ({ parent }) => parent?.kind !== 'historical_vignette',
      fields: [
        { name: 'period', type: 'string' },
        { name: 'figures', type: 'array', of: [{ type: 'string' }] }
      ],
      group: 'content'
    }),
    defineField({
      name: 'inMemoriam',
      title: 'In Memoriam Fields',
      type: 'object',
      hidden: ({ parent }) => parent?.kind !== 'in_memoriam',
      fields: [
        { name: 'personName', type: 'string' },
        { name: 'birthDate', type: 'date' },
        { name: 'deathDate', type: 'date' },
        { name: 'affiliations', type: 'array', of: [{ type: 'string' }] },
        { name: 'tributes', type: 'array', of: [{ type: 'text' }] }
      ],
      group: 'content'
    }),

    // Workflow & access
    statusField,
    defineField({ name: 'scheduledFor', title: 'Scheduled For', type: 'datetime', hidden: ({ parent }) => parent?.status !== 'scheduled' }),
    visibilityField,
    premiumLevelField,
    ...bylineFields,
    ...dateMetaFields,

    citationField
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind' }
  }
})
