import Hero from './components/Hero';
import Marquee from './components/Marquee';
import SceneGallery from './components/SceneGallery';
import CommunitySection from './components/CommunitySection';
import TokenSection from './components/TokenSection';
import GamesSection from './components/GamesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#081210] min-h-screen">
      <Hero />

      {/* Marquee divider */}
      <div className="py-6 border-y border-emerald-400/10 bg-[#0a1816]">
        <Marquee
          items={[
            'STILL DANCING',
            'SAME DOGGO',
            'NEW SPEED',
            'NO SLEEP ONLY DANCE',
            'SOLANA CHAIN',
            '$DOGGO',
          ]}
        />
      </div>

      <SceneGallery />

      {/* Marquee divider */}
      <div className="py-6 border-y border-emerald-400/10 bg-[#0a1816]">
        <Marquee
          items={[
            'THE DANCE IS CATCHING ON',
            'ONE LITTLE DOG',
            'A LOT OF FRIENDS',
            'EVERYONE IS INVITED',
          ]}
          reverse
        />
      </div>

      <CommunitySection />

      <TokenSection />

      <GamesSection />

      <Footer />
    </div>
  );
}

export default App;
