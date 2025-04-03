import { Contact, MapIcon } from "lucide-react";
import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="bg-[#F1E8DD] " id="contact">
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
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2">
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-[#287371]">
                We are here to support your journey towards emotional well-being. Whether you're struggling or just need guidance, reach out to us.
              </p>
              <ul className="mb-6 md:mb-0">
                <li className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded text-black">
                  <MapIcon/>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-bold leading-6 text-[#2a4660]">Our Address</h3>
                    <p className="text-[#3ca8a4] font-semibold">123 Serenity Avenue, Peaceful City</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded text-black">
                    <Contact/>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-bold leading-6 text-[#2a4660] ">Contact</h3>
                    <p className="text-[#3ca8a4] font-semibold">Phone: +91 6351415942</p>
                    <p className="text-[#3ca8a4] font-semibold">Email: support@mindwell.org</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card h-fit max-w-6xl p-5 md:p-12 rounded-xl bg-gradient-to-r from-[#A7D7C5] to-[#6AA889]">
              <h2 className="mb-4 text-2xl font-bold text-[#2a4660]">Reach Out to Us</h2>
              <form id="contactForm">
                <div className="mb-6">
                  <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="mb-2 w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] "
                    name="name"
                  />
                  <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="mb-2 w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] "
                    name="email"
                  />
                  <label htmlFor="message" className="pb-1 text-xs uppercase tracking-wider text-[#436a57] font-extrabold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    cols={30}
                    rows={5}
                    placeholder="How can we help you?"
                    className="mb-2 w-full rounded-md border border-black py-2 px-4 shadow-sm bg-[#f9f5ef] "
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="w-full rounded-md bg-[#2a4660] px-6 py-3 text-white font-xl hover:bg-[#1c2f40]">
                    Send Message
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
