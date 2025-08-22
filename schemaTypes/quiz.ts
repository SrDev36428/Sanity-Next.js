import {defineType, defineField} from 'sanity'
import {visibilityField, premiumLevelField, statusField} from './shared'

export const quiz = defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', isUnique: (s, c) => c.defaultIsUnique(s, c) }, validation: R => R.required() }),
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'description', type: 'text' }),
    visibilityField, premiumLevelField,
    defineField({ name: 'tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }], options: { layout: 'tags' } }),
    defineField({
      name: 'items',
      title: 'Items (ordered)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'item', title: 'Quiz Item', type: 'reference', to: [{ type: 'quizItem' }], validation: R => R.required() },
            { name: 'weight', type: 'number', initialValue: 1 }
          ]
        }
      ]
    }),
    defineField({ name: 'version', type: 'number', initialValue: 1 }),
    statusField,
    defineField({ name: 'passMark', title: 'Pass Mark (%)', type: 'number' }),
    defineField({ name: 'timeLimitSec', type: 'number' }),
    defineField({ name: 'attemptLimit', type: 'number' }),
    defineField({
      name: 'gradingMode',
      title: 'Grading Mode',
      type: 'string',
      initialValue: 'best',
      options: { list: ['best','latest','average'] }
    })
  ]
})

export const quizItem = defineType({
  name: 'quizItem',
  title: 'Quiz Item (Bank)',
  type: 'document',
  fields: [
    defineField({
      name: 'type', type: 'string', initialValue: 'single_choice',
      options: { list: ['single_choice','multiple_select','true_false','short_answer','match','ordering','vignette_mcq'] },
      validation: R => R.required()
    }),
    defineField({ name: 'stem', title: 'Stem', type: 'portableText', validation: R => R.required() }),
    defineField({
      name: 'options',
      type: 'array',
      hidden: ({parent}) => ['short_answer','match','ordering'].includes(parent?.type),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string' },
            { name: 'text', type: 'portableText' },
            { name: 'isCorrect', type: 'boolean' },
            { name: 'rationale', type: 'text' }
          ]
        }
      ]
    }),
    defineField({
      name: 'answerKey',
      title: 'Answer Key (non-MCQ)',
      type: 'text',
      hidden: ({parent}) => ['short_answer','match','ordering'].includes(parent?.type) ? false : true
    }),
    defineField({ name: 'explanation', title: 'Post-submission Teaching', type: 'portableText' }),
    defineField({ name: 'tags', title: 'KSA/Topic Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }], options: { layout:'tags' } }),
    defineField({ name: 'difficulty', type: 'object', fields: [
      { name: 'b', type: 'number' }, { name: 'a', type: 'number' }, { name: 'c', type: 'number' }
    ]}),
    defineField({ name: 'refs', title: 'References', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'version', type: 'number', initialValue: 1 }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'user' }] }),
    defineField({ name: 'reviewers', type: 'array', of: [{ type: 'reference', to: [{ type: 'user' }] }] }),
    defineField({ name: 'status', type: 'string', initialValue: 'active', options: { list: ['active','retired'] } })
  ]
})

export const quizAttempt = defineType({
  name: 'quizAttempt',
  title: 'Quiz Attempt',
  type: 'document',
  fields: [
    defineField({ name: 'user', type: 'reference', to: [{ type: 'user' }], validation: R => R.required() }),
    defineField({ name: 'quiz', type: 'reference', to: [{ type: 'quiz' }], validation: R => R.required() }),
    defineField({ name: 'startedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'completedAt', type: 'datetime' }),
    defineField({
      name: 'responses', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'item', type: 'reference', to: [{ type: 'quizItem' }] },
          { name: 'selectedOptionIds', type: 'array', of: [{ type: 'string' }] },
          { name: 'freeText', type: 'text' },
        ]
      }]
    }),
    defineField({ name: 'scoreRaw', type: 'number' }),
    defineField({ name: 'scorePct', type: 'number' }),
    defineField({ name: 'passed', type: 'boolean' }),
    defineField({ name: 'feedbackReport', type: 'text' })
  ]
})
