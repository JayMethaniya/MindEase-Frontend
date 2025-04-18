import { Contact, MapIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/contact/send', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#F1E8DD] min-h-screen" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center md:mx-auto md:mb-12">
            <p className="text-base font-bold uppercase tracking-wide text-[#287371]">
              Mental Wellness
            </p>
            <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-[#1e3245] sm:text-5xl">
              Let's Connect for a Healthier Mind
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-[#2a4660]">
              "Healing starts with a conversation. Reach out and take the first step towards mental wellness."
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
          <div className="w-full md:w-1/2 pr-6">
            <p className="mt-3 mb-12 text-lg text-[#287371]">
              We are here to support your journey towards emotional well-being. Whether you're struggling or just need guidance, reach out to us.
            </p>
            <ul className="mb-6 md:mb-0 space-y-6">
              <li className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A7D7C5] text-black">
                  <MapIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="mb-2 text-lg font-bold leading-6 text-[#2a4660]">Our Address</h3>
                  <p className="text-[#3ca8a4] font-semibold">123 Serenity Avenue, Peaceful City</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A7D7C5] text-black">
                  <Contact className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="mb-2 text-lg font-bold leading-6 text-[#2a4660]">Contact</h3>
                  <p className="text-[#3ca8a4] font-semibold">Phone: +91 6351415942</p>
                  <p className="text-[#3ca8a4] font-semibold">Email: support@mindwell.org</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2">
            <div className="card h-fit p-5 md:p-12 rounded-xl bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-[#2a4660]">Reach Out to Us</h2>
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="mb-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] focus:ring-2 focus:ring-[#287371] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] focus:ring-2 focus:ring-[#287371] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      cols={30}
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] focus:ring-2 focus:ring-[#287371] focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-[#2a4660] px-6 py-3 text-white font-xl hover:bg-[#1c2f40] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
