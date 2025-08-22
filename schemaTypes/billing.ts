import {defineType, defineField} from 'sanity'

export const plan = defineType({
  name: 'plan',
  title: 'Membership Plan',
  type: 'document',
  fields: [
    defineField({ name: 'code', type: 'string', validation: R => R.required() }),
    defineField({ name: 'name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'price', type: 'number' }),
    defineField({ name: 'billingCycle', type: 'string', options: { list: ['monthly','yearly','one_time'] } })
  ]
})

export const subscription = defineType({
  name: 'subscription',
  title: 'Subscription',
  type: 'document',
  fields: [
    defineField({ name: 'user', type: 'reference', to: [{ type: 'user' }], validation: R => R.required() }),
    defineField({ name: 'plan', type: 'reference', to: [{ type: 'plan' }], validation: R => R.required() }),
    defineField({ name: 'status', type: 'string', options: { list: ['active','past_due','canceled','expired'] }, initialValue: 'active' }),
    defineField({ name: 'start', type: 'datetime' }),
    defineField({ name: 'end', type: 'datetime' }),
    defineField({ name: 'providerRef', type: 'string' })
  ]
})
