import React from 'react';
import { ContactView } from '../components/contact/ContactView';

const Contact = () => {
  return (
    <ContactView>
      <ContactView.Navbar />
      <ContactView.Header />

      <main className="flex-1 max-w-6xl 2xl:max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <ContactView.InfoPanel />
          </div>
          <div className="lg:col-span-7">
            <ContactView.Form />
          </div>
        </div>
      </main>

      <ContactView.Footer />
    </ContactView>
  );
};

export default Contact;
