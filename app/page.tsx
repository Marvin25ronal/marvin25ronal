import { HeroSection } from './components/HeroSection';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export default function Home() {
  return (
    <main>
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Hero Section with Subtle Storm Effect */}
      <HeroSection />

      {/* Future sections will go here */}
      {/* <TechnologiesSection /> */}
      {/* <PortfolioSection /> */}
      {/* <HobbiesSection /> */}
      {/* <ContactSection /> */}
    </main>
  );
}
