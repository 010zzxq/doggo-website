import ZoomieCat from './ZoomieCat';

export default function Footer() {
    return (
        <footer className="relative bg-[#081210] border-t border-white/10 pt-16 pb-10 overflow-hidden">
            <div className="absolute inset-0 bg-radial-mint opacity-50" />

            <div className="relative max-w-4xl mx-auto px-4 text-center">
                <div className="flex justify-center mb-6">
                    <ZoomieCat size={80} />
                </div>

                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center overflow-hidden">
                        <img src="/dancing-doggo.gif" alt="Dancing Doggo" className="h-full w-full object-cover" />
                    </div>
                    <span className="font-display text-2xl">$DOGGO</span>
                </div>

                <p className="text-white/50 max-w-md mx-auto mb-8">
                    A little dog. A whole lot of dance. From Doggo, with love.
                </p>

                {/* Nav links */}
                <div className="flex flex-wrap gap-6 justify-center mb-8 text-sm text-white/50">
                    <a href="#scenes" className="hover:text-emerald-400 transition-colors">Scenes</a>
                    <a href="#community" className="hover:text-emerald-400 transition-colors">Community</a>
                    <a href="#token" className="hover:text-emerald-400 transition-colors">Token</a>
                    <a href="#" className="hover:text-emerald-400 transition-colors">Whitepaper</a>
                </div>

                <div className="pt-8 border-t border-white/10 text-white/30 text-xs max-w-lg mx-auto">
                    <p className="mb-2">
                        Community-made fan site. $DOGGO is a meme coin with no intrinsic value. Not financial advice.
                    </p>
                    <p>The doggo doesn't even know what money is. He just likes to dance.</p>
                </div>
            </div>
        </footer>
    );
}
