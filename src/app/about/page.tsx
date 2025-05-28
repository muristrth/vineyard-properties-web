import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Award,
  Home,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Years of Experience', value: '15+', icon: Award },
  { label: 'Properties Sold', value: '1,000+', icon: Home },
  { label: 'Happy Clients', value: '2,500+', icon: Users },
  { label: 'Market Growth', value: '25%', icon: TrendingUp },
];

const teamMembers = [
  {
    name: 'Sarah Vineyard',
    role: 'Founder & CEO',
    image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    bio: 'With over 20 years in luxury real estate, Sarah founded Vineyard Properties to provide exceptional service and curated property experiences.',
    email: 'sarah@vineyardproperties.com',
    phone: '+1-555-VINEYARD',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Sales',
    image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    bio: 'Michael leads our sales team with expertise in luxury markets and investment properties, ensuring clients find their perfect match.',
    email: 'michael@vineyardproperties.com',
    phone: '+1-555-VINEYARD',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Investment Advisor',
    image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    bio: 'Emma specializes in real estate investments and helps clients build profitable property portfolios with strategic guidance.',
    email: 'emma@vineyardproperties.com',
    phone: '+1-555-VINEYARD',
  },
  {
    name: 'David Thompson',
    role: 'Property Manager',
    image: 'https://ext.same-assets.com/2009473017/3756399664.png',
    bio: 'David oversees property management services, ensuring all client investments are well-maintained and profitable.',
    email: 'david@vineyardproperties.com',
    phone: '+1-555-VINEYARD',
  },
];

export default function AboutPage() {
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
              About Vineyard Properties
            </Badge>
            <h1 className="mb-6 font-radio-canada text-4xl font-bold md:text-6xl">
              Redefining Luxury
              <br />
              <span className="text-primary">Real Estate</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
              For over 15 years, Vineyard Properties has been the trusted name
              in luxury real estate, delivering exceptional service and curating
              the finest properties for discerning clients.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2 font-radio-canada text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="font-radio-canada text-4xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Founded in 2009 by Sarah Vineyard, Vineyard Properties began
                with a simple vision: to revolutionize the luxury real estate
                experience by combining cutting-edge technology with
                personalized service.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                What started as a boutique agency has grown into a premier real
                estate firm, known for our integrity, innovation, and unwavering
                commitment to client satisfaction. We specialize in luxury
                residential properties, investment opportunities, and exclusive
                developments across prime locations.
              </p>
              <p className="text-lg leading-relaxed text-gray-600">
                Today, we continue to set new standards in the industry, helping
                clients not just find properties, but discover their perfect
                lifestyle and investment opportunities.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://ext.same-assets.com/2009473017/4194055538.jpeg"
                alt="Vineyard Properties Office"
                className="h-96 w-full rounded-2xl object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 shadow-lg">
                <p className="mb-1 text-sm text-gray-600">Founded</p>
                <p className="font-radio-canada text-2xl font-bold text-gray-900">
                  2009
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-radio-canada text-4xl font-bold text-gray-900">
              Our Mission & Values
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              We're committed to delivering exceptional results through
              innovation, integrity, and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900">
                  Excellence
                </h3>
                <p className="leading-relaxed text-gray-600">
                  We strive for excellence in every transaction, ensuring our
                  clients receive the highest quality service and results that
                  exceed expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900">
                  Client-Centric
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Our clients are at the heart of everything we do. We listen,
                  understand, and deliver personalized solutions that align with
                  their unique goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 font-radio-canada text-xl font-bold text-gray-900">
                  Innovation
                </h3>
                <p className="leading-relaxed text-gray-600">
                  We embrace cutting-edge technology and innovative approaches
                  to provide our clients with competitive advantages in the
                  market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-radio-canada text-4xl font-bold text-gray-900">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Our experienced professionals are dedicated to helping you achieve
              your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Card
                key={member.name}
                className="transform animate-fade-in border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <span className="text-xs font-bold text-white">VP</span>
                    </div>
                  </div>
                  <h3 className="mb-1 font-radio-canada text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-4 font-medium text-primary">{member.role}</p>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Phone className="mr-2 h-4 w-4" />
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
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-radio-canada text-4xl font-bold">
            Ready to Work with Us?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-foreground/80">
            Let our experienced team help you find your dream property or
            achieve your investment goals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="secondary" size="lg" className="px-8">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white px-8 text-white hover:bg-white hover:text-primary"
            >
              <Link href="/properties">View Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
