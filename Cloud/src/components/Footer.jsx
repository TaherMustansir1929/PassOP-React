import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-teal-500/20 py-4">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>
          made by{' '}
          <span className="text-teal-400 font-medium">ZeoXD</span> © 2024{' '}
          <span className="text-teal-400 font-medium">PassOP</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;