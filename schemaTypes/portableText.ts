import {defineType} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' }
        ],
        annotations: [
          { name: 'link', title: 'Link', type: 'object', fields: [{ name: 'href', type: 'url' }, { name: 'openInNewTab', type: 'boolean', initialValue: true }] },
        ]
      }
    },
    { type: 'image', options: { hotspot: true } },
    { type: 'code' }
  ]
})
