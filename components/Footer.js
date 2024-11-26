// app/footer.js
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className=" text-white py-2 mt-12 px-6"
      style={{ backgroundColor: "red" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium" style={{ color: "white" }}>
          <Image
            src="/logo.svg" // Change this to your image path
            alt="Special Tree Image"
            width={120} // Adjust image size if necessary
            height={120}
            className="m-auto pt-1 pb-2"
          />
        </div>
        &copy; {new Date().getFullYear()} Your Special Tree. All rights
        reserved.
        <div className="space-x-4 flex flex-col md:flex-row gap-2  pb-2">
          <a href="/terms" className="text-sm ">
            Terms & Conditions
          </a>
          <a href="/contact" className="text-sm ">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
