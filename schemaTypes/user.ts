import { defineField, defineType } from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'userEmail', title: 'Email', type: 'string', validation: R => R.required().email() }),
    defineField({
      name: 'password',
      title: 'Password (hashed)',
      type: 'string',
      description: 'Store hashed password, not plaintext. init 121 : $2b$12$LYn9YouwWnTiygy/5b5c1e0TxoA/p2ylDmz2jF4jgcN0fN1w8QNS6',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'registerDate',
      title: 'Register Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Registered', value: 'registered' },
          { title: 'Premium', value: 'premium' },
          { title: 'Author ', value: 'author' },
          { title: 'Editor', value: 'editor' },
          { title: 'Publisher', value: 'publisher' },
          { title: 'Super User', value: 'superuser' }
        ],
        layout: 'dropdown'
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'premiumLevel', title: 'Premium Level', type: 'string', options: { list: [ {title:'Silver', value:'silver'}, {title:'Gold', value:'gold'}, {title:'Institutional', value:'institutional'} ] } }),
    defineField({
      name: 'lastVisitDate',
      title: 'Last Visit Date',
      type: 'datetime'
    }),
    defineField({
      name: 'blocked',
      title: 'Blocked',
      type: 'boolean',
      initialValue: false,
      description: 'If true, the user is prevented from logging in.'
    }),
    defineField({ name: 'discourseUserId', title: 'Discourse User ID', type: 'string' })
  ],
  preview: { select: { title: 'fullName', subtitle: 'userEmail' } }
})
