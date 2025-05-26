import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, Home, TrendingUp, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Years of Experience", value: "15+", icon: Award },
  { label: "Properties Sold", value: "1,000+", icon: Home },
  { label: "Happy Clients", value: "2,500+", icon: Users },
  { label: "Market Growth", value: "25%", icon: TrendingUp },
];

const teamMembers = [
  {
    name: "Sarah Vineyard",
    role: "Founder & CEO",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    bio: "With over 20 years in luxury real estate, Sarah founded Vineyard Properties to provide exceptional service and curated property experiences.",
    email: "sarah@vineyardproperties.com",
    phone: "+1-555-VINEYARD"
  },
  {
    name: "Michael Chen",
    role: "Head of Sales",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    bio: "Michael leads our sales team with expertise in luxury markets and investment properties, ensuring clients find their perfect match.",
    email: "michael@vineyardproperties.com",
    phone: "+1-555-VINEYARD"
  },
  {
    name: "Emma Rodriguez",
    role: "Investment Advisor",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    bio: "Emma specializes in real estate investments and helps clients build profitable property portfolios with strategic guidance.",
    email: "emma@vineyardproperties.com",
    phone: "+1-555-VINEYARD"
  },
  {
    name: "David Thompson",
    role: "Property Manager",
    image: "https://ext.same-assets.com/2009473017/3756399664.png",
    bio: "David oversees property management services, ensuring all client investments are well-maintained and profitable.",
    email: "david@vineyardproperties.com",
    phone: "+1-555-VINEYARD"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
              About Vineyard Properties
            </Badge>
            <h1 className="text-4xl md:text-6xl font-radio-canada font-bold mb-6">
              Redefining Luxury
              <br />
              <span className="text-primary">Real Estate</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, Vineyard Properties has been the trusted name in luxury real estate,
              delivering exceptional service and curating the finest properties for discerning clients.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-radio-canada font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-radio-canada font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2009 by Sarah Vineyard, Vineyard Properties began with a simple vision:
                to revolutionize the luxury real estate experience by combining cutting-edge technology
                with personalized service.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a boutique agency has grown into a premier real estate firm,
                known for our integrity, innovation, and unwavering commitment to client satisfaction.
                We specialize in luxury residential properties, investment opportunities, and
                exclusive developments across prime locations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue to set new standards in the industry, helping clients not just
                find properties, but discover their perfect lifestyle and investment opportunities.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://ext.same-assets.com/2009473017/4194055538.jpeg"
                alt="Vineyard Properties Office"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Founded</p>
                <p className="text-2xl font-radio-canada font-bold text-gray-900">2009</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-radio-canada font-bold text-gray-900 mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional results through innovation, integrity, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                  Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We strive for excellence in every transaction, ensuring our clients receive
                  the highest quality service and results that exceed expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                  Client-Centric
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our clients are at the heart of everything we do. We listen, understand,
                  and deliver personalized solutions that align with their unique goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We embrace cutting-edge technology and innovative approaches to provide
                  our clients with competitive advantages in the market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-radio-canada font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced professionals are dedicated to helping you achieve your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VP</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-radio-canada font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-radio-canada font-bold mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let our experienced team help you find your dream property or achieve your investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="px-8">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white hover:text-primary">
              <Link href="/properties">View Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
