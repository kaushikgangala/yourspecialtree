// app/terms/page.js

import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
    <div className="flex-grow">
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Terms and Conditions</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-6">
          Welcome to our website. By accessing or using our services, you agree to comply with these terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Terms of Use</h2>
        <ul className="list-disc list-inside space-y-4 text-gray-600 text-lg mt-4">
          <li>By using our website, you agree to our privacy policy.</li>
          <li>You must be at least 18 years old to make purchases on this website.</li>
          <li>All sales are final unless otherwise specified.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          We are not liable for any direct, indirect, incidental, or consequential damages that may occur while using this website.
        </p>
      </div>

    </div>
    </div>
      <Footer />
    </div>
      </>
  );
};

export default Terms;
