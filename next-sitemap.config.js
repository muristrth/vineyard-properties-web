/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://vineyardproperties.co.ke',
  generateRobotsTxt: true,
  sitemapSize: 5000,
};

export default config;
