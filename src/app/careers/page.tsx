'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
};

const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    location: 'Nairobi, Kenya',
    type: 'Full-Time',
    description:
      'We are looking for a skilled Frontend Developer to join our team and help build responsive, user-friendly web applications.',
    requirements: [
      '3+ years experience with React or Next.js',
      'Strong knowledge of JavaScript, HTML, CSS',
      'Experience with REST APIs and version control (Git)',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible working hours',
      'Professional development opportunities',
    ],
  },
  {
    id: '2',
    title: 'Marketing Specialist',
    location: 'Remote',
    type: 'Part-Time',
    description:
      'Join our marketing team to strategize and execute campaigns that elevate our brand presence.',
    requirements: [
      'Proven experience in digital marketing',
      'SEO and content marketing knowledge',
      'Strong communication and analytical skills',
    ],
    benefits: ['Remote-friendly', 'Performance bonuses', 'Team events'],
  },
];

export default function Careers() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [submittingJobId, setSubmittingJobId] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function toggleJob(id: string) {
    setExpandedJobId((prev) => (prev === id ? null : id));
    setSubmitSuccess(false);
    setFormErrors([]);
    setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file || null,
    }));
  }

  function validateForm() {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push('Name is required.');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Valid email is required.');
    if (!formData.phone.trim()) errors.push('Phone number is required.');
    if (!formData.resume) errors.push('Resume upload is required.');
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (errors.length) return;

    setSubmittingJobId(expandedJobId);
    setSubmitSuccess(false);

    // Simulate API submission delay
    setTimeout(() => {
      setSubmittingJobId(null);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', coverLetter: '', resume: null });
    }, 2000);
  }

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-4xl font-extrabold text-gray-900 pt-20"
        >
          Careers at Vineyard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12 text-lg text-gray-600"
        >
          Join our team and help us build a better future. Check out our current openings and apply below.
        </motion.p>

        {jobs.map((job) => (
          <section
            key={job.id}
            className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            aria-expanded={expandedJobId === job.id}
          >
            <header
              onClick={() => toggleJob(job.id)}
              className="flex cursor-pointer items-center justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') toggleJob(job.id);
              }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
                <p className="text-sm text-gray-500">
                  {job.location} &mdash; {job.type}
                </p>
              </div>
              <span className="text-red-600 font-bold select-none text-2xl">{expandedJobId === job.id ? '−' : '+'}</span>
            </header>

            <AnimatePresence>
              {expandedJobId === job.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <p className="mb-4 text-gray-700">{job.description}</p>

                  <div className="mb-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Requirements:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Benefits:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {job.benefits.map((ben, i) => (
                        <li key={i}>{ben}</li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formErrors.length > 0 && (
                      <div className="rounded border border-red-500 bg-red-100 p-3 text-red-700">
                        <ul className="list-disc list-inside">
                          {formErrors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {submitSuccess && (
                      <p className="rounded bg-green-100 p-3 text-green-700">Application submitted successfully!</p>
                    )}

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-red-600 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-red-600 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-red-600 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-red-600 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume (PDF, DOC) *
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-gray-700"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingJobId === job.id}
                      className="w-full rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
                    >
                      {submittingJobId === job.id ? 'Submitting...' : 'Apply Now'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ))}

      </main>

      <Footer />
    </>
  );
}
