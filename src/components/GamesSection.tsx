import { Gamepad2, ArrowUpRight } from 'lucide-react';

const games = [
    {
        title: 'Disco Dog Dash',
        desc: 'Jump, dodge, and keep the dance going. How long can you last?',
        href: '/game.html',
        number: '01',
        accent: 'bg-[#ffd62c]',
    },
    {
        title: 'Alley Dodge',
        desc: 'Switch lanes, grab bones, and outrun the Elder. Three hits and you’re done.',
        href: '/game2.html',
        number: '02',
        accent: 'bg-[#35e77f]',
    },
];

export default function GamesSection() {
    return (
        <section
            id="games"
            className="relative overflow-hidden bg-[#f4f0df] text-[#10251b] py-24 md:py-36"
        >
            {/* Decorative shapes */}
            <div className="absolute top-24 right-[8%] w-4 h-4 rounded-full bg-[#35a85f]" />
            <div className="absolute bottom-20 left-[6%] w-6 h-6 rounded-full bg-[#ffd62c]" />

            <div className="relative max-w-6xl mx-auto px-6 md:px-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">

                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#10251b] text-[#35e77f]">
                                <Gamepad2 size={18} />
                            </div>

                            <p className="text-xs font-black tracking-[0.3em] text-[#35a85f]">
                                DOGGO ARCADE
                            </p>
                        </div>

                        <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[7vw] leading-[0.82] tracking-[-0.05em] font-black">
                            PLAY WITH
                            <br />
                            <span className="text-[#35a85f]">
                                THE DOG.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-sm text-base md:text-lg leading-relaxed font-medium text-[#10251b]/55 md:pb-2">
                        Tired of staring at charts?
                        <br />
                        Good. Go play something.
                    </p>
                </div>

                {/* Games */}
                <div className="grid md:grid-cols-2 gap-5">

                    {games.map((game) => (
                        <a
                            key={game.href}
                            href={game.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-[2rem] border-2 border-[#10251b] bg-[#10251b] text-[#f4f0df] min-h-[360px] p-7 md:p-9 flex flex-col justify-between hover:-translate-y-2 transition-transform"
                        >
                            {/* Number */}
                            <div className="flex items-start justify-between">
                                <span
                                    className={`flex items-center justify-center w-12 h-12 rounded-full ${game.accent} text-[#10251b] font-black text-sm`}
                                >
                                    {game.number}
                                </span>

                                <div className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 group-hover:bg-[#f4f0df] group-hover:text-[#10251b] transition-colors">
                                    <ArrowUpRight size={18} />
                                </div>
                            </div>

                            {/* Game info */}
                            <div>
                                <p className="text-[10px] font-black tracking-[0.25em] text-[#35e77f] mb-3">
                                    DOGGO GAME
                                </p>

                                <h3 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-4">
                                    {game.title}
                                </h3>

                                <p className="max-w-sm text-sm md:text-base leading-relaxed text-white/50 mb-7">
                                    {game.desc}
                                </p>

                                <div className="flex items-center gap-3 text-xs font-black tracking-[0.18em]">
                                    PLAY NOW
                                    <span className="w-8 h-[2px] bg-[#35e77f] group-hover:w-12 transition-all" />
                                </div>
                            </div>

                            {/* Decorative Doggo text */}
                            <div className="absolute -right-4 -bottom-10 pointer-events-none select-none">
                                <span className="font-display text-[9rem] font-black leading-none text-white/[0.035]">
                                    DOG
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom line */}
                <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t-2 border-[#10251b] pt-6">
                    <p className="text-xs font-black tracking-[0.2em] text-[#10251b]/40">
                        TWO GAMES. ZERO SERIOUSNESS.
                    </p>

                    <p className="text-xs font-bold text-[#10251b]/40">
                        PICK A GAME. GO.
                    </p>
                </div>
            </div>
        </section>
    );
}