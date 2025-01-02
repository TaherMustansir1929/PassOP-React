import React from 'react';
import { Github } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-teal-500/20 px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className='text-2xl text-white font-bold text-center cursor-pointer hover:opacity-90'>
          <a href="/">
            <span className='text-teal-400'> &lt;</span>
            <span>Pass</span>
            <span className='text-teal-400'>OP/&gt;</span>
          </a>
        </h1>
        <a
          href="https://github.com/TaherMustansir1929"
          className="text-gray-300 hover:text-teal-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;