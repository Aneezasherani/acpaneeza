const Footer = () => (
  <footer
    className="text-white text-center py-4 mt-4"
    style={{
      background: "linear-gradient(to right,rgb(147, 191, 222),rgb(14, 13, 106),rgb(90, 110, 147))",
    }}
  >
    <p>&copy; {new Date().getFullYear()} Habit Tracker App</p>
  </footer>
);

export default Footer;
