import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Services } from './components/Services/Services';
import { Advantages } from './components/Advantages/Advantages';
import { Projects } from './components/Projects/Projects';
import { Process } from './components/Process/Process';
import { ContactCTA } from './components/ContactCTA/ContactCTA';
import { Footer } from './components/Footer/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Projects />
        <Process />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
