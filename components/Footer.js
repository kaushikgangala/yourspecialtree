// app/footer.js

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Special Tree. All rights reserved.
          </div>
          <div className="space-x-4">
            <a href="/terms" className="text-sm text-red-600 hover:text-red-400">
              Terms & Conditions
            </a>
            <a href="/contact" className="text-sm text-red-600 hover:text-red-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  