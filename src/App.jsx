import React from 'react';
import Navbar from './components/Navbar';
import PasswordForm from './components/PasswordForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
          Password Manager
        </h2>
        <PasswordForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;