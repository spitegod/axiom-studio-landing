import { LazyMotion, MotionConfig, domAnimation } from './motion';
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
import { Privacy } from './components/Privacy/Privacy';
import { YandexMetrika } from './components/Analytics/YandexMetrika';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { isPrivacyPath } from './router/path';

function Home() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <Partnership />
      <Exchange />
      <Process />
      <FounderFit />
      <Projects />
      <Faq />
      <ContactCTA />
    </>
  );
}

function App() {
  useSmoothScroll();
  const privacy = isPrivacyPath();

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <main>{privacy ? <Privacy /> : <Home />}</main>
        <Footer />
        <YandexMetrika />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
