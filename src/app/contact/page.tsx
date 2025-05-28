'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

// Define an interface for ContactInfo items
interface ContactInfoItem {
  icon: React.ElementType; // Represents the LucideReact icon component
  title: string;
  content: string;
  actionText: string;
  actionHref?: string; // Optional for link types
  actionType: 'link' | 'modal' | 'function'; // Define specific action types
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to an API)
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: '',
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Dummy function for modal action, replace with actual modal logic
  const handleScheduleVisit = () => {
    alert(
      'Opening scheduling modal! (Implement your modal logic here, e.g., setShowScheduleModal(true);)',
    );
  };

  const contactInfo: ContactInfoItem[] = [
    // Added type annotation
    {
      icon: MapPin,
      title: 'Visit Our Office',
      content: 'Odyssey Plaza\nSouth B, Mukoma Road\nNairobi, Kenya',
      actionText: 'Get Directions',
      actionHref: 'https://maps.app.goo.gl/cwn8XL6mS2VndSoB9', // Replace with your actual Google Maps link
      actionType: 'link',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: 'Mark James',
      actionText: 'Call Now',
      actionHref: 'tel:+254729170156',
      actionType: 'link',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'sales@vineyardproperties.co.ke\n',
      actionText: 'Send Email',
      actionHref: 'mailto:sales@vineyardproperties.co.ke',
      actionType: 'link',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content:
        'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: By Appointment',
      actionText: 'Schedule Visit',
      actionType: 'modal', // Or "function" depending on what you want to do
    },
  ];

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
              Contact Us
            </Badge>
            <h1 className="mb-6 font-radio-canada text-4xl font-bold md:text-6xl">
              Let's Start Your
              <br />
              <span className="text-primary">Property Journey</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
              Ready to find your dream property or discuss investment
              opportunities? Our expert team is here to help you every step of
              the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="font-radio-canada text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="mb-2 font-radio-canada text-xl font-bold text-gray-900">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for contacting us. We'll be in touch soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange('name', e.target.value)
                            }
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange('email', e.target.value)
                            }
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange('phone', e.target.value)
                            }
                            placeholder="+254 729 170 156"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Inquiry Type
                          </label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) =>
                              handleInputChange('inquiryType', value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buying">
                                Property Buying
                              </SelectItem>
                              <SelectItem value="selling">
                                Property Selling
                              </SelectItem>
                              <SelectItem value="investment">
                                Investment Opportunities
                              </SelectItem>
                              <SelectItem value="rental">
                                Property Rental
                              </SelectItem>
                              <SelectItem value="valuation">
                                Property Valuation
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange('subject', e.target.value)
                          }
                          placeholder="How can we help you?"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Message *
                        </label>
                        <Textarea
                          required
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange('message', e.target.value)
                          }
                          placeholder="Tell us about your property needs, budget, preferences, or any questions you have..."
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary py-3 text-white hover:bg-primary/90"
                        size="lg"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon; // Get the icon component
                return (
                  <Card
                    key={info.title}
                    className="animate-fade-in border-0 shadow-lg transition-shadow hover:shadow-xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 font-radio-canada font-bold text-gray-900">
                            {info.title}
                          </h3>
                          <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                            {info.content}
                          </p>
                          {info.actionType === 'link' && info.actionHref ? (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                            >
                              <a
                                href={info.actionHref}
                                target={
                                  info.actionHref.startsWith('http') ||
                                  info.actionHref.startsWith('https')
                                    ? '_blank'
                                    : undefined
                                }
                                rel={
                                  info.actionHref.startsWith('http') ||
                                  info.actionHref.startsWith('https')
                                    ? 'noopener noreferrer'
                                    : undefined
                                }
                              >
                                {info.actionText}
                              </a>
                            </Button>
                          ) : info.actionType === 'modal' ? (
                            <Button
                              onClick={handleScheduleVisit}
                              variant="outline"
                              size="sm"
                              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                            >
                              {info.actionText}
                            </Button>
                          ) : (
                            // Fallback for other action types or if actionHref is missing for a link type
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                              disabled
                            >
                              {info.actionText} (Action Not Set)
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-radio-canada text-4xl font-bold text-gray-900">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Palm Springs, our office is easily
              accessible and welcoming.
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-96 overflow-hidden rounded-2xl bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 font-radio-canada text-xl font-bold text-gray-900">
                  Interactive Map
                </h3>
                <p className="text-gray-600">
                  Odyssey Plaza, South B, Mukoma Road, Nairobi, Kenya
                </p>
                <Button className="mt-4 bg-primary hover:bg-primary/90" asChild>
                  <a
                    href="https://maps.app.goo.gl/your-office-location"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-radio-canada text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can you respond to my inquiry?',
                answer:
                  'We typically respond to all inquiries within 2-4 hours during business hours, and within 24 hours on weekends.',
              },
              {
                question: 'Do you offer virtual property tours?',
                answer:
                  'Yes, we provide comprehensive virtual tours including 360° walkthroughs, live video calls, and detailed property videos.',
              },
              {
                question: 'What areas do you serve?',
                answer:
                  'We specialize in luxury properties across California, with primary focus on Palm Springs, Los Angeles, San Diego, and the Bay Area.',
              },
              {
                question: 'Do you help with property investment analysis?',
                answer:
                  'Absolutely! Our investment specialists provide detailed market analysis, ROI calculations, and investment strategy guidance.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-radio-canada font-bold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
