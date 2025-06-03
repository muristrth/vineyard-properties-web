// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://vineyardproperties.co.ke',
  generateRobotsTxt: true,
  sitemapSize: 5000,

  // Add dynamic URLs manually if needed
  additionalPaths: async (config) => {
    return [
 {
    "loc": "/blogs/home-buying-tips",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/serviced-apartments-vs-hotels",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/real-estate-investment-amount-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/making-money-real-estate-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/what-is-real-estate-investment",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/boost-home-value",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/kenyas-affordable-housing-progress-challenges-and-your-role-as-an-investor",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/rent-to-own-schemes-in-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/investing-in-kenyas-affordable-housing-projects",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/the-rise-of-satellite-towns-in-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/cheap-houses-for-sale-in-nairobi",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/government-housing-projects-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/housing-levy-kenya-investment",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/emerging-affordable-property-hubs",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/sustainable-designs-kenyan-housing",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/kenyan-real-estate-covid-impact",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/kenya-land-vs-apartment-investment",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/buying-land-vs-buying-house-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/nairobi-real-estate-trends-2025-investment-forecast",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/why-land-investment-in-kenya-remains-lucrative-in-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/affordable-housing-hotspots-beyond-nairobi-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/due-diligence-checklist-kenya-land-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/financing-real-estate-kenya-2025-options",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/maximizing-rental-yields-nairobi-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/impact-infrastructure-kenya-property-values-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/sectional-properties-act-kenya-2025-explained",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/sustainable-building-materials-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/real-estate-photography-videography-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/understanding-capital-gains-tax-kenya-real-estate-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/short-term-rentals-airbnb-kenya-2025-guide",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/warehousing-logistics-real-estate-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/retirement-homes-kenya-market-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/climate-change-coastal-properties-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/real-estate-auctions-kenya-2025-guide",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/renovating-older-properties-kenya-profit-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/women-in-kenyan-real-estate-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/serviced-apartments-vs-traditional-rentals-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/land-use-zoning-changes-nairobi-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/digital-nomads-kenya-real-estate-impact-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/agricultural-land-investment-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/nairobi-real-estate-market-trends-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/ngong-heritage-villas-opportunity-kenyan-buyers",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/affordable-housing-policy-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/diaspora-property-investment-guide-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/title-deeds-buying-land-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/gated-communities-vs-standalone-homes-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/land-ownership-women-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/buying-land-ngong-kiambu-areas",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/green-building-trends-kenya-2025",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/best-areas-to-buy-land-in-nairobi",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
  {
    "loc": "/blogs/commercial-property-investment-kenya",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:18:13.000Z"
  },
      {
    "loc": "/properties/heritage-villas-ngong",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kiambu-windsor",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/plot-nrbwest",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/mlolongo-warehouse",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/ridgeways-mansion",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/emali-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/muthaiga-mansion",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/edenville-villa",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/muthaiga-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kitengela-plot",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/karen-6acres",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/syokimau-industrial",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/cbd-commercial",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/westlands-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/isinya-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/neema-gardens",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kinoo-plot",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/joska-plots",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/utawala-plots",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/syokimau-5acres",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kisaju-10acres",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/syokimau-katani",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kitengela-bungalow",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kiambu-road-10acres",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/karen-mansion",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/lavington-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/cbd-building",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/athi-river-maisonette",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/lavington-quarter-acre",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/thika-commercial",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/karen-villa",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kiambu-road-house",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/chyuna-estate",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/ngong-plots",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/mombasa-industrial",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/redhill-land",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/muthaiga-5bedroom",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/karen-9acres",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kikambala-beach",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kileleshwa-apartment",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/runda-townhouse",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/westgate-mall-shop",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/nyali-beachfront",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/nakuru-farm",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/thika-factory",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/gigiri-penthouse",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/eldoret-maisonette",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/nanyuki-cottage",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/kisumu-commercial",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/machakos-villa",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/meru-mansion",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/malindi-beach-house",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/naivasha-resort",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/rongai-bungalow",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  },
  {
    "loc": "/properties/ruaka-duplex",
    "changefreq": "daily",
    "priority": 0.7,
    "lastmod": "2025-06-03T21:21:01.000Z"
  }
      // add more as needed
    ]
  },
};
