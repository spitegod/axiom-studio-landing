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
import { LandingPage } from './components/Landing/LandingPage';
import { YandexMetrika } from './components/Analytics/YandexMetrika';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { usePageMeta } from './hooks/usePageMeta';
import { getLanding } from './data/landings';
import { PRIVACY_PATH } from './data/privacy';
import { currentPath } from './router/path';
import { metaForPath } from './seo/site';

function Home() {
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
  useScrollReveal();
  const path = currentPath();
  const landing = getLanding(path);
  usePageMeta(metaForPath(path));

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <main>
          {path === PRIVACY_PATH ? (
            <Privacy />
          ) : landing ? (
            <LandingPage page={landing} />
          ) : (
            <Home />
          )}
        </main>
        <Footer />
        <YandexMetrika />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
