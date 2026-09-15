import { Gamepad2, ArrowRight } from 'lucide-react';

const games = [
    {
        title: 'Disco Dog Dash',
        desc: 'Jump, dodge, and keep the dance going. How long can you last?',
        href: '/game.html',
        accent: 'from-pink-500/20 to-amber-500/20',
        border: 'border-pink-400/30',
        badge: 'bg-pink-500',
    },
    {
        title: 'Alley Dodge',
        desc: 'Switch lanes, grab bones, and outrun the Elder. Three hits and you\u2019re done.',
        href: '/game2.html',
        accent: 'from-violet-500/20 to-teal-500/20',
        border: 'border-violet-400/30',
        badge: 'bg-violet-500',
    },
];

export default function GamesSection() {
    return (
        <section id="games" className="py-24 px-6 bg-[#0a1816]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-5">
                        <Gamepad2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Play</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl text-white mb-3">
                        Doggo games
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Take a break from trading and play with the doggo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {games.map((game) => (
                        <a
                            key={game.href}
                            href={game.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative overflow-hidden rounded-2xl border ${game.border} bg-gradient-to-br ${game.accent} p-8 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-400/10`}
                        >
                            <div className={`absolute top-5 right-5 w-2.5 h-2.5 rounded-full ${game.badge} animate-pulse`} />
                            <h3 className="font-display text-2xl text-white mb-2">{game.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                                {game.desc}
                            </p>
                            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide uppercase">
                                Play now
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
