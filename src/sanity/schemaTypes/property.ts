// src/sanity/schemaTypes/property.ts
import { defineType } from 'sanity';

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Land', value: 'land' },
          { title: 'House', value: 'house' },
          { title: 'Rental Apartments', value: 'apartments' },
          { title: 'Commercial Land', value: 'commercial-land' },
          { title: 'Commercial Property', value: 'commercial-property' },
          { title: 'Rental Houses', value: 'rental-houses' },
        ],
      },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
});
