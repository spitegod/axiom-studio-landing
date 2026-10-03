import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Partnership } from './components/Partnership/Partnership';
import { Exchange } from './components/Exchange/Exchange';
import { Process } from './components/Process/Process';
import { FounderFit } from './components/FounderFit/FounderFit';
import { Projects } from './components/Projects/Projects';
import { Faq } from './components/Faq/Faq';
import { ContactCTA } from './components/ContactCTA/ContactCTA';
import { Footer } from './components/Footer/Footer';
import { YandexMetrika } from './components/Analytics/YandexMetrika';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partnership />
        <Exchange />
        <Process />
        <FounderFit />
        <Projects />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
      <YandexMetrika />
    </>
  );
}

export default App;
