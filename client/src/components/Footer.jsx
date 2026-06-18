const Footer = () => {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        // textAlign: "center",
        padding: "40px 40px",
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 ">
        <div className="footerLogo">
          <h1 className="text-3xl font-bold">CampusLearn</h1>
          <p className="">Learn Today, Lead Tommorow</p>
          Empowering students with quality education and skills to build a successful career.

          <div>
            <p>Instagram | Facebook | Youtube</p>
          </div>
        </div>
        <div className="text-xl">
          Categories
            <li>Programming</li>
            <li>Data Science</li>
            <li>web Development</li>
            <li>Aptitude & Reasoning</li>
            <li>Cyber Security</li>
        </div>
        <div className="text-xl">
          Support
            <li>Help Center</li>
            <li>FAQ's</li>
            <li>Privacy Policy</li>
            <li>Terms of Services</li>
            <li>Refund Policy</li>
        </div>
        <div className="text-xl">
          Contact Us
            <li>+91 821633985</li>
            <li>support@campusLearn.com</li>
            <li>Chandigarh, India</li>

        </div>
      </div>

      <div className="footer-line">
        <p className="border-t border-gray-700"></p>
        <p>© 2025 CampusLearn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;