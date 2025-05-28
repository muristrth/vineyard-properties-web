'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, User, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 'home-buying-tips',
    title: 'Essential Home Buying Tips for First-Time Buyers',
    excerpt:
      'Navigate the home buying process with confidence using these expert tips and strategies for first-time buyers.',
    content:
      'Buying your first home is an exciting milestone, but it can also feel overwhelming...',
    author: 'Mark Muriithi',
    category: 'Tips',
    date: '2025-02-05',
    readTime: '8 min read',
    image: 'https://ext.same-assets.com/2009473017/2828581621.jpeg',
    featured: true,
  },
  {
    id: 'serviced-apartments-vs-hotels',
    title: 'Services apartments vs Hotels: Which is Right for You?',
    excerpt:
      'Investing in serviced apartments is a fairly new concept, especially in the Kenyan real estate market.',
    content:
      'Sustainability has become a driving force in modern home design and construction...',
    author: 'Mark Muriithi',
    category: 'Trends',
    date: '2024-05-13',
    readTime: '10 min read',
    image: 'https://ext.same-assets.com/2009473017/923357109.jpeg',
  },
  {
    id: 'real-estate-investment-amount-kenya',
    title: 'How Much Do You Need to Invest in Real Estate in Kenya',
    excerpt:
      'Investing in real estate in Kenya has become a popular option for many investors looking to diversify their portfolios and build long-term wealth.',
    content:
      'Investing in real estate in Kenya has become a popular option for many investors looking...',
    author: 'Mark Muriithi',
    category: 'Investment',
    date: '2023-07-19',
    readTime: '10 min read',
    image: 'https://ext.same-assets.com/616702439/4224781709.jpeg',
  },
  {
    id: 'making-money-real-estate-kenya',
    title: 'How to Make Money in Real Estate in Kenya',
    excerpt:
      'Overview of the real estate in Kenya. Real estate in Kenya is one of the most lucrative investment opportunities available today.',
    content:
      'The mortgage landscape continues to evolve, and staying informed is crucial for buyers...',
    author: 'Mark Muriithi',
    category: 'Updates',
    date: '2022-10-10',
    readTime: '15 min read',
    image: 'https://ext.same-assets.com/2009473017/1062973807.jpeg',
  },
  {
    id: 'what-is-real-estate-investment',
    title: 'What is Real Estate Investment?',
    excerpt:
      'Real estate investment is the purchase, ownership, management, rental, and/or sale of real estate for profit. Learn the fundamentals of property investment.',
    content: 'Real estate investment involves putting capital into property...',
    author: 'Mark Muriithi',
    category: 'Investment',
    date: '2022-10-10',
    readTime: '9 min read',
    image: 'https://ext.same-assets.com/2009473017/1161467979.jpeg',
  },
  {
    id: 'boost-home-value',
    title: '10 Ways to Boost Your Home Value Before Selling',
    excerpt:
      "Discover strategic improvements that can significantly increase your property's market value and appeal to buyers.",
    content:
      'As we move through 2025, real estate investment opportunities continue to evolve...',
    author: 'Mark Muriithi',
    category: 'Guides',
    date: '2025-01-09',
    readTime: '12 min read',
    image: 'https://ext.same-assets.com/2009473017/1161467979.jpeg',
  },
];

const categories = [
  'All',
  'Tips',
  'Guides',
  'Updates',
  'Insights',
  'Investment',
  'Trends',
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = sortedPosts.filter((post) => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 pb-16 pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/20 text-primary"
            >
              Real Estate Blog
            </Badge>
            <h1 className="mb-6 font-radio-canada text-4xl font-bold md:text-6xl">
              Real Estate
              <br />
              <span className="text-primary">Insights</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
              Stay ahead in the property market with expert advice, market
              updates, and insider insights from our real estate professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchQuery && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge className="mb-4 bg-primary text-white">
                Featured Article
              </Badge>
              <h2 className="font-radio-canada text-2xl font-bold text-gray-900">
                Editor's Pick
              </h2>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute left-4 top-4 bg-primary text-white">
                    {featuredPost.category}
                  </Badge>
                </div>
                <CardContent className="flex flex-col justify-center p-8">
                  <div className="mb-4 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span className="mr-4">
                      {formatDate(featuredPost.date)}
                    </span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span className="mr-4">{featuredPost.readTime}</span>
                    <User className="mr-1 h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>

                  <h3 className="mb-4 font-radio-canada text-2xl font-bold text-gray-900">
                    {featuredPost.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-gray-600">
                    {featuredPost.excerpt}
                  </p>

                  <Button
                    asChild
                    className="w-fit bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/blogs/${featuredPost.id}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-radio-canada text-2xl font-bold text-gray-900">
                {sortedPosts.length} Articles Found
              </h2>
              <p className="mt-1 text-gray-600">
                Latest insights and market updates
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="transform animate-fade-in border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                    <Badge className="absolute left-4 top-4 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span className="mr-3">{formatDate(post.date)}</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mb-3 line-clamp-2 font-radio-canada text-xl font-bold text-gray-900">
                      <Link
                        href={`/blogs/${post.id}`}
                        className="transition-colors hover:text-primary"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="mr-1 h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80"
                      >
                        <Link href={`/blogs/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 font-radio-canada text-xl font-bold text-gray-900">
                No Articles Found
              </h3>
              <p className="mb-6 text-gray-600">
                Try adjusting your search criteria or browse all available
                articles.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {sortedPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-radio-canada text-4xl font-bold">
            Stay Updated with Market Insights
          </h2>
          <p className="mb-8 text-xl text-primary-foreground/80">
            Subscribe to our newsletter for the latest real estate trends, tips,
            and exclusive market analysis.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Enter your email address"
              className="border-0 bg-white text-gray-900"
            />
            <Button variant="secondary" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
