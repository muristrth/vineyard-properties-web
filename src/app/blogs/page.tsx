"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: "home-buying-tips",
    title: "Essential Home Buying Tips for First-Time Buyers",
    excerpt: "Navigate the home buying process with confidence using these expert tips and strategies for first-time buyers.",
    content: "Buying your first home is an exciting milestone, but it can also feel overwhelming...",
    author: "Sarah Vineyard",
    category: "Tips",
    date: "2025-02-05",
    readTime: "8 min read",
    image: "https://ext.same-assets.com/2009473017/2828581621.jpeg",
    featured: true
  },
  {
    id: "boost-home-value",
    title: "10 Ways to Boost Your Home Value Before Selling",
    excerpt: "Discover strategic improvements that can significantly increase your property's market value and appeal to buyers.",
    content: "When preparing to sell your home, strategic improvements can make a significant difference...",
    author: "Michael Chen",
    category: "Guides",
    date: "2025-01-09",
    readTime: "12 min read",
    image: "https://ext.same-assets.com/2009473017/1161467979.jpeg"
  },
  {
    id: "mortgage-rates-update",
    title: "Mortgage Rates Update: What Buyers Need to Know",
    excerpt: "Stay informed about current mortgage trends and how they impact your home buying decisions in 2025.",
    content: "The mortgage landscape continues to evolve, and staying informed is crucial for buyers...",
    author: "Emma Rodriguez",
    category: "Updates",
    date: "2024-12-19",
    readTime: "6 min read",
    image: "https://ext.same-assets.com/2009473017/1062973807.jpeg"
  },
  {
    id: "luxury-homes-defined",
    title: "What Defines a Luxury Home in Today's Market",
    excerpt: "Explore the characteristics and features that classify properties as luxury in the current real estate market.",
    content: "The definition of luxury in real estate has evolved significantly over the years...",
    author: "Sarah Vineyard",
    category: "Insights",
    date: "2025-01-01",
    readTime: "10 min read",
    image: "https://ext.same-assets.com/2009473017/4194055538.jpeg"
  },
  {
    id: "investment-strategies-2025",
    title: "Real Estate Investment Strategies for 2025",
    excerpt: "Discover profitable investment opportunities and strategies that smart investors are using this year.",
    content: "As we move through 2025, real estate investment opportunities continue to evolve...",
    author: "Emma Rodriguez",
    category: "Investment",
    date: "2025-01-15",
    readTime: "14 min read",
    image: "https://ext.same-assets.com/2009473017/299352832.jpeg"
  },
  {
    id: "sustainable-living-trends",
    title: "Sustainable Living: Eco-Friendly Home Trends",
    excerpt: "Learn about the latest sustainable home features and how they're shaping the future of real estate.",
    content: "Sustainability has become a driving force in modern home design and construction...",
    author: "David Thompson",
    category: "Trends",
    date: "2025-01-20",
    readTime: "9 min read",
    image: "https://ext.same-assets.com/2009473017/923357109.jpeg"
  }
];

const categories = ["All", "Tips", "Guides", "Updates", "Insights", "Investment", "Trends"];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = sortedPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
              Real Estate Blog
            </Badge>
            <h1 className="text-4xl md:text-6xl font-radio-canada font-bold mb-6">
              Real Estate
              <br />
              <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay ahead in the property market with expert advice, market updates,
              and insider insights from our real estate professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
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
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge className="bg-primary text-white mb-4">Featured Article</Badge>
              <h2 className="text-2xl font-radio-canada font-bold text-gray-900">
                Editor's Pick
              </h2>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {featuredPost.category}
                  </Badge>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{formatDate(featuredPost.date)}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="mr-4">{featuredPost.readTime}</span>
                    <User className="w-4 h-4 mr-1" />
                    <span>{featuredPost.author}</span>
                  </div>

                  <h3 className="text-2xl font-radio-canada font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <Button asChild className="bg-primary hover:bg-primary/90 w-fit">
                    <Link href={`/blogs/${featuredPost.id}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-radio-canada font-bold text-gray-900">
                {sortedPosts.length} Articles Found
              </h2>
              <p className="text-gray-600 mt-1">
                Latest insights and market updates
              </p>
            </div>
          </div>

          {/* Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-3">{formatDate(post.date)}</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link
                        href={`/blogs/${post.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <Link href={`/blogs/${post.id}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-2">
                No Articles Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available articles.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More Button */}
          {sortedPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-radio-canada font-bold mb-4">
            Stay Updated with Market Insights
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Subscribe to our newsletter for the latest real estate trends, tips, and exclusive market analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email address"
              className="bg-white text-gray-900 border-0"
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
