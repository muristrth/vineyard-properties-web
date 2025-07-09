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
      actionHref: 'https://maps.app.goo.gl/ENzWQBiWEfSw6sq1A', // Replace with your actual Google Maps link
      actionType: 'link',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: 'Mark M',
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
              South B Shopping Centre, Odssey Plaza along Mukoma
              rd, Next to Bounty Hotel, 2nd Floor Suite F2-22
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
                    href="https://maps.app.goo.gl/ENzWQBiWEfSw6sq1A"
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
           question: 'How long have you been in business?',
           answer:
             'Vineyard has been investing in property for 11 years since 2005. We have helped in the purchase of over 30 parcels of land and sold to over 1,500 clients.',
         },
         {
           question: 'Why should I buy from Vineyard Properties Ltd and not any other company?',
           answer:
             '1. Vineyard is efficient in every step of the buying process, and we are honest, just as our motto says. 2. Vineyard will take care of all the hassles of processing the title and keeping all records properly. 3. Vineyard has experience in land transactions, and we conduct due diligence to ensure you get good property.',
         },
         {
           question: 'Where are you located?',
           answer:
             'We are in South B Shopping Centre, South Gate Centre, 1st Floor, Suite 12A, next to Bounty Hotel or Total Petrol Station.',
         },
         {
           question: 'How do I know that your property is genuine?',
           answer:
             'We are very strict with the properties we buy. We carry out an official search from the Lands Office and also conduct a ground search to understand the history of the land and its owner.',
         },
         {
           question: 'How do I know the properties are worth what you say they are?',
           answer:
             'Once we believe we have found a good property to recommend to an investor, we ensure we check our estimations. We also consider our costs and add a margin for profit. However, our prices compete well in the market.',
         },
         {
           question: 'What is the approximate time for my plot to appreciate twice the value?',
           answer:
             'Depending on the location, it typically takes 2 to 5 years.',
         },
         {
           question: 'Is it possible to invest as a group or a company?',
           answer:
             'Yes, it is possible. We have clients who invest through their Ltd Companies. We also have social groups registered as welfare groups who invest a lot with us.',
         },
         {
           question: 'What are your payment terms?',
           answer:
             'We have different prices according to the payment period: Cash payments, 3 installments, 6 installments, 8 installments, and 11 to 1-year installments. Note that there is a discount for cash buyers.',
         },
         {
           question: 'How long do the title deeds take?',
           answer:
             'It is a government process that is hard to speed up; however, it typically takes 2–3 months to process.',
         },
         {
           question: 'Is the price inclusive of title processing?',
           answer:
             'No, the amount for processing the title is separate from the price of the plot. One has to complete paying for the plot, then you pay for the title. However, those who choose to pay both at the same time can do so. Another reason is that the stamp duty is determined at the time of valuation.',
         },
         {
           question: 'Who pays for the title deed?',
           answer:
             'It is the purchaser’s responsibility to pay the stamp duty, legal, and registration fees for the title to be under his/her name.',
         },
         {
           question: 'How is security in this region?',
           answer:
             'There is a police post around Kitengela and also Kangundo Road. As people settle down, security is enhanced.',
         },
         {
           question: 'What utilities are available in the area?',
           answer:
             'Our parcels are near shopping centers, schools, hotels, etc.',
         },
         {
           question: 'Are the plots easily accessible?',
           answer:
             'Most of our plots are accessible from the main road (tarmac road), and the roads are all-weather.',
         },
         {
           question: 'Why should I invest in land?',
           answer:
             'Land is a valuable asset as it appreciates and has no maintenance cost.',
         },
         {
           question: 'Is this area controlled?',
           answer:
             'No, because areas like Joska and Kitengela are freehold, but other areas like Utawala and Syokimau are controlled.',
         },
         {
           question: 'Are the plots for immediate development?',
           answer:
             'Some plots are for immediate development, while others are for speculation. They typically develop after four to five years.',
         },
         {
           question: 'What are the plot sizes?',
           answer:
             'Our plot sizes range between 1/8 of an acre to 100 acres.',
         },
         {
           question: 'When can I view the plots?',
           answer:
             'We ferry clients to the site from Monday to Saturday, 8:00 AM to 3:00 PM, free of charge.',
         },
         {
           question: 'Do you give after-sale service?',
           answer:
             'Yes, we take our clients to view their plots time and again as they may forget the exact location. We re-beacon the plots for them, resell the plots in case they want to dispose of them, and also settle minor disputes regarding plot boundaries.',
         },
         {
           question: 'Do you sell to Kenyans in the diaspora?',
           answer:
             'Yes, we have sold to clients outside Kenya. They send their close relatives to view land on their behalf, and then we communicate with them through email.',
         },
         {
           question: 'Who prepares the agreement for sale?',
           answer:
             'As Vineyard Properties, we have our own lawyer who handles our transactions at no cost, but the cheques are written directly to Vineyard.',
         },
         {
           question: 'Which other areas are you selling?',
           answer:
             'We focus on areas around Nairobi Metropolitan such as Kitengela, Magadi, Kangundo Road, Ngong, Kiambu, Lukenya, Namanga Road, Thika, and Ruiru.',
         },
         {
           question: 'Do you have cheap plots?',
           answer:
             'Our prices range between KES 250,000 and KES 1,000,000, depending on the location of the parcel of land. For houses, prices range from KES 8,000,000 to KES 40,000,000.',
         },
         {
           question: 'If one is unable to pay as agreed, what happens to the plot and also the money paid?',
           answer:
             'In case one is unable to pay as agreed, we usually give several options to the client: one, we can add one month to the agreed period; two, we can extend the payment period up to 4 months and revise the price upwards; the last option is we refund the money less 10%.',
         },
         {
           question: 'If I decide to stop the transaction, what are the charges?',
           answer:
             'We issue refunds to those clients who are unable to continue with the buying process, minus 10% of the amount paid to cover administrative costs.',
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
