import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light py-3 fixed-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="text-left">
          &copy; {currentYear}
        </div>
        <div className="text-right">
          Author LFL
        </div>
      </div>
    </footer>
  );
}

export default Footer;
