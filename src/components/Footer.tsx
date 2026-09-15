import { ArrowUpRight } from 'lucide-react';
import ZoomieCat from './ZoomieCat';

const links = [
    { label: 'SCENES', href: '#scenes' },
    { label: 'COMMUNITY', href: '#community' },
    { label: 'TOKEN', href: '#token' },
    { label: 'GAMES', href: '#games' },
];

const socials = [
    {
        label: 'TIKTOK',
        href: 'https://www.tiktok.com/@dancing_dog_on_sol',
    },
    {
        label: 'INSTAGRAM',
        href: 'https://www.instagram.com/doggo.memeonsol?stkn=MXVtN2NrZTA3cGt4cg%3D%3D',
    },
    {
        label: 'X',
        href: 'https://x.com/DoggoOnSol1',
    },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#10251b] text-[#f4f0df]">

            {/* Big background text */}
            <div className="absolute left-1/2 bottom-[-3vw] -translate-x-1/2 pointer-events-none select-none whitespace-nowrap">
                <span className="font-display text-[25vw] leading-none font-black tracking-[-0.08em] text-white/[0.025]">
                    DOGGO
                </span>
            </div>

            {/* Decorative shapes */}
            <div className="absolute top-16 right-[10%] w-5 h-5 rounded-full bg-[#35e77f]" />


            <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-10">

                {/* Final message */}
                <div className="text-center mb-20">

                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-[-10px] rounded-full bg-[#35e77f]/20 blur-xl" />

                            <div className="relative w-24 h-24 rounded-full bg-[#35e77f] border-4 border-[#f4f0df] overflow-hidden">
                                <img
                                    src="/dancing-doggo.gif"
                                    alt="Dancing Doggo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-xs font-black tracking-[0.3em] text-[#35e77f] mb-5">
                        THAT'S THE DOG.
                    </p>

                    <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[8vw] leading-[0.82] tracking-[-0.05em] font-black">
                        KEEP
                        <br />
                        <span className="text-[#ffd62c]">
                            DANCING.
                        </span>
                    </h2>

                    <p className="mt-8 max-w-md mx-auto text-base md:text-lg leading-relaxed font-medium text-white/45">
                        One little dog.
                        <br />
                        A whole lot of internet.
                        <br />
                        Same little dance.
                    </p>
                </div>

                {/* Footer navigation */}
                <div className="border-t border-white/15 pt-10">

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">

                        {/* Brand */}
                        <div>
                            <a
                                href="#"
                                className="font-display text-4xl font-black tracking-tight"
                            >
                                DOGGO<span className="text-[#35e77f]">.</span>
                            </a>

                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/35">
                                A community-made fan site for the little
                                dancing dog.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-4">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-xs font-black tracking-[0.15em] text-white/45 hover:text-[#35e77f] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Socials */}
                        <div className="flex flex-wrap gap-2">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-black tracking-wider text-white/50 hover:border-[#35e77f] hover:text-[#35e77f] transition-colors"
                                >
                                    {social.label}
                                    <ArrowUpRight
                                        size={13}
                                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] font-bold tracking-wide text-white/25">

                    <p>
                        © {new Date().getFullYear()} DOGGO. COMMUNITY-MADE FAN SITE.
                    </p>

                    <p>
                        THE DOGGO DOESN'T EVEN KNOW WHAT MONEY IS.
                    </p>
                </div>

                {/* Tiny ZoomieCat */}
                <div className="absolute right-4 bottom-6 opacity-60 hidden md:block">
                    <ZoomieCat size={55} />
                </div>

            </div>
        </footer>
    );
}