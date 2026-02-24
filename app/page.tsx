import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { HobbiesSection } from './components/HobbiesSection';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { TechnologiesSection } from './components/TechnologiesSection';

export default function Home() {
  return (
    <main>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Hero Section */}
      <HeroSection />

      {/* Portfolio / Projects Section */}
      <PortfolioSection />

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Hobbies Section */}
      <HobbiesSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
