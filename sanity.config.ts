import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './src/sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './src/sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Vineyard Properties',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',
  plugins: [
    deskTool(), // 👈 This adds the Desk Tool
    visionTool(), // Optional: for GROQ queries inside Studio
  ],
  schema: {
    types: schemaTypes,
  },
});
