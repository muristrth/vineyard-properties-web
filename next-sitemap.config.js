/** @type {import('next-sitemap').IConfig} */
import blogData from './src/data/blogData';
import propertyData from './src/data/propertyData';

const blogPaths = Object.keys(blogData).map(
  (slug) => `/blog/${slug}`
);

const propertyPaths = Object.keys(propertyData).map(
  (id) => `/properties/${id}`
);

const config = {
  siteUrl: process.env.SITE_URL || 'https://vineyardproperties.co.ke',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  additionalPaths: async (config) => {
    const now = new Date().toISOString();

    const allPaths = [
      ...blogPaths.map((path) => ({ loc: path, lastmod: now })),
      ...propertyPaths.map((path) => ({ loc: path, lastmod: now })),
    ];

    return allPaths;
  },
};

export default config;
