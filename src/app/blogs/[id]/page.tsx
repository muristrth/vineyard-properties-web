"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// Define an interface for a single blog post
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  tags?: string[]; // tags is optional
  featured: boolean;
}

// Define an interface for the related post data
interface RelatedPost {
  id: string;
  title: string;
  category: string;
  image: string;
}

// Mock blog data - in a real app, this would come from an API
const blogData: Record<string, BlogPost> = { // Changed `any` to `BlogPost`
  "home-buying-tips": {
    id: "home-buying-tips",
    title: "Essential Home Buying Tips for First-Time Buyers",
    excerpt: "Navigate the home buying process with confidence using these expert tips and strategies for first-time buyers.",
    author: "Sarah Vineyard",
    category: "Tips",
    date: "2025-02-05",
    readTime: "8 min read",
    image: "https://ext.same-assets.com/2009473017/2828581621.jpeg",
    content: `
      <p>Buying your first home is an exciting milestone, but it can also feel overwhelming. With proper preparation and knowledge, you can navigate the process with confidence and make informed decisions that will benefit you for years to come.</p>

      <h2>1. Assess Your Financial Readiness</h2>
      <p>Before you start looking at homes, take a thorough look at your finances. Calculate your monthly income, expenses, and existing debts. Most lenders recommend that your housing costs shouldn't exceed 28% of your gross monthly income.</p>

      <h3>Key Financial Considerations:</h3>
      <ul>
        <li>Down payment (typically 10-20% of home price)</li>
        <li>Closing costs (2-5% of home price)</li>
        <li>Emergency fund for repairs and maintenance</li>
        <li>Pre-approval for a mortgage</li>
      </ul>

      <h2>2. Get Pre-Approved for a Mortgage</h2>
      <p>Getting pre-approved shows sellers that you're a serious buyer and helps you understand exactly how much you can afford. Shop around with different lenders to find the best rates and terms.</p>

      <h2>3. Find the Right Real Estate Agent</h2>
      <p>A good real estate agent will be your advocate throughout the process. Look for someone who knows the local market, has experience with first-time buyers, and communicates well.</p>

      <h2>4. Know What You Want vs. What You Need</h2>
      <p>Create two lists: must-haves and nice-to-haves. This will help you stay focused during your search and make decisions more easily when you find potential homes.</p>

      <h2>5. Don't Skip the Home Inspection</h2>
      <p>A professional home inspection can reveal potential issues that could cost thousands of dollars down the road. Even if the seller has provided inspection reports, consider getting your own independent inspection.</p>

      <h2>6. Understand the Total Cost of Homeownership</h2>
      <p>Beyond your mortgage payment, consider property taxes, insurance, HOA fees, utilities, and maintenance costs. These can add significantly to your monthly housing expenses.</p>

      <h2>Final Thoughts</h2>
      <p>Take your time and don't let emotions drive your decisions. The right home for you is out there, and with patience and preparation, you'll find it. Remember, buying a home is not just a financial investment—it's an investment in your future and lifestyle.</p>
    `,
    tags: ["First-time buyers", "Home buying", "Real estate tips", "Mortgage"],
    featured: true
  },
  "boost-home-value": {
    id: "boost-home-value",
    title: "10 Ways to Boost Your Home Value Before Selling",
    excerpt: "Discover strategic improvements that can significantly increase your property's market value and appeal to buyers.",
    author: "Michael Chen",
    category: "Guides",
    date: "2025-01-09",
    readTime: "12 min read",
    image: "https://ext.same-assets.com/2009473017/1161467979.jpeg",
    content: `
      <p>When preparing to sell your home, strategic improvements can make a significant difference in both your selling price and how quickly your property sells. Here are ten proven ways to boost your home's value.</p>

      <h2>1. Enhance Curb Appeal</h2>
      <p>First impressions matter. Simple improvements like fresh landscaping, a new front door, or pressure washing can dramatically improve your home's appearance from the street.</p>

      <h2>2. Update the Kitchen</h2>
      <p>Kitchen renovations typically offer excellent returns on investment. Consider updating cabinets, countertops, and appliances for maximum impact.</p>

      <h2>3. Modernize Bathrooms</h2>
      <p>Updated bathrooms are highly valued by buyers. Focus on fixtures, lighting, and creating a spa-like atmosphere.</p>

      <h2>4. Fresh Paint Throughout</h2>
      <p>A fresh coat of paint in neutral colors can make your home feel new and well-maintained. It's one of the most cost-effective improvements you can make.</p>

      <h2>5. Improve Energy Efficiency</h2>
      <p>Energy-efficient improvements like new windows, insulation, or HVAC systems appeal to environmentally conscious buyers and can reduce utility costs.</p>

      <h2>6. Add Square Footage</h2>
      <p>If possible, consider finishing a basement, attic, or adding a room. Additional living space directly translates to higher value.</p>

      <h2>7. Update Flooring</h2>
      <p>Replace worn carpets with hardwood, laminate, or tile. Quality flooring makes a significant impact on perceived value.</p>

      <h2>8. Smart Home Features</h2>
      <p>Modern buyers appreciate smart home technology. Consider adding smart thermostats, security systems, or lighting controls.</p>

      <h2>9. Storage Solutions</h2>
      <p>Maximize storage with built-in closets, pantries, or garage organization systems. Buyers always want more storage space.</p>

      <h2>10. Professional Staging</h2>
      <p>Proper staging helps buyers envision themselves in the space and can significantly impact both sale price and time on market.</p>

      <h2>Return on Investment</h2>
      <p>Not all improvements offer the same return. Focus on projects that appeal to the broadest range of buyers and consider your local market conditions when making decisions.</p>
    `,
    tags: ["Home selling", "Property value", "Home improvement", "ROI"],
    featured: false
  }
};

// Related posts
const relatedPosts: RelatedPost[] = [ // Changed to use RelatedPost interface
  {
    id: "luxury-homes-defined",
    title: "What Defines a Luxury Home in Today's Market",
    category: "Insights",
    image: "https://ext.same-assets.com/2009473017/4194055538.jpeg"
  },
  {
    id: "investment-strategies-2025",
    title: "Real Estate Investment Strategies for 2025",
    category: "Investment",
    image: "https://ext.same-assets.com/2009473017/299352832.jpeg"
  },
  {
    id: "sustainable-living-trends",
    title: "Sustainable Living: Eco-Friendly Home Trends",
    category: "Trends",
    image: "https://ext.same-assets.com/2009473017/923357109.jpeg"
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string; // 'as string' is fine for route params
  const post = blogData[postId];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/blogs" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Back Button */}
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="bg-primary text-white mb-4">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-radio-canada font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '18px'
              }}
            />
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-radio-canada font-bold text-gray-900 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <img
                  src="https://ext.same-assets.com/2009473017/3756399664.png"
                  alt={post.author}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-2">
                    {post.author}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.author === "Sarah Vineyard"
                      ? "Founder and CEO of Vineyard Properties with over 20 years of experience in luxury real estate. Sarah is passionate about helping clients find their perfect homes and make smart investment decisions."
                      : "Senior real estate advisor specializing in luxury properties and investment opportunities. With extensive market knowledge and a client-first approach, Michael helps buyers and sellers achieve their real estate goals."
                    }
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      More Articles
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-radio-canada font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-gray-600">
              Continue reading our latest insights and tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <Card
                key={relatedPost.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {relatedPost.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-radio-canada font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blogs/${relatedPost.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>

                  <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                    <Link href={`/blogs/${relatedPost.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* CSS for article content styling */}
      <style jsx global>{`
        .article-content h2 {
          font-size: 28px;
          font-weight: bold;
          margin: 32px 0 16px 0;
          color: #1f2937;
          font-family: var(--font-radio-canada);
        }

        .article-content h3 {
          font-size: 22px;
          font-weight: bold;
          margin: 24px 0 12px 0;
          color: #374151;
          font-family: var(--font-radio-canada);
        }

        .article-content p {
          margin: 16px 0;
          color: #4b5563;
          line-height: 1.8;
        }

        .article-content ul {
          margin: 16px 0;
          padding-left: 24px;
        }

        .article-content li {
          margin: 8px 0;
          color: #4b5563;
          line-height: 1.6;
        }

        .article-content ul li::marker {
          color: #0fbc8b;
        }
      `}</style>
    </div>
  );
}