
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartSign Translate. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Created for educational purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
