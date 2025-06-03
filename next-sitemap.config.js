/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vineyardproperties.co.ke',
  generateRobotsTxt: true,
  sitemapSize: 5000, // optional: splits sitemaps if needed
};
