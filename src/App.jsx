import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Activities from './components/Activities';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 cyber-grid transition-colors duration-300">
        {/* Dynamic neural / particle canvas */}
        <BackgroundCanvas />

        {/* Sticky glassmorphic navbar with theme toggle */}
        <Navbar />

        {/* Main content sections */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <Activities />
          <Achievements />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
