import { useEffect, useRef, useState } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';

export default function Hero() {
    const dogRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState({ x: 72, y: 58 });
    const [dragging, setDragging] = useState(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!dogRef.current) return;

        setDragging(true);
        dogRef.current.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;

        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        setPosition({
            x: Math.max(8, Math.min(92, x)),
            y: Math.max(15, Math.min(88, y)),
        });
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    const resetPosition = () => {
        setPosition({ x: 72, y: 58 });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const amount = 2;

            setPosition((prev) => {
                let { x, y } = prev;

                if (e.key === 'ArrowLeft') x -= amount;
                if (e.key === 'ArrowRight') x += amount;
                if (e.key === 'ArrowUp') y -= amount;
                if (e.key === 'ArrowDown') y += amount;

                if (e.key === 'Home') {
                    x = 72;
                    y = 58;
                }

                return {
                    x: Math.max(8, Math.min(92, x)),
                    y: Math.max(15, Math.min(88, y)),
                };
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#f4f0df] text-[#10251b]">

            {/* Small decorative shapes */}
            <div className="absolute top-28 left-8 md:left-16 w-3 h-3 rounded-full bg-[#35e77f]" />
            <div className="absolute top-40 right-[18%] w-5 h-5 rounded-full bg-[#ffd62c]" />

            {/* Navigation */}
            <nav className="relative z-40 flex items-center justify-between px-6 py-6 md:px-10">

                <a
                    href="#"
                    className="font-display text-2xl md:text-3xl font-black tracking-tight"
                >
                    DOGGO<span className="text-[#35a85f]">.</span>
                </a>

                <div className="hidden lg:flex items-center gap-7 text-[11px] font-bold tracking-[0.18em]">
                    <a
                        href="https://www.tiktok.com/music/original-sound-7664730339339668255"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        TIKTOK
                    </a>

                    <a
                        href="https://www.instagram.com/reels/audio/422882598269159?stkn=eHVldHFneTVydmR1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        INSTAGRAM
                    </a>

                    <a
                        href="#scenes"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        SCENES
                    </a>

                    <a
                        href="#community"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        COMMUNITY
                    </a>

                    <a
                        href="#token"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        TOKEN
                    </a>

                    <a
                        href="#games"
                        className="hover:text-[#35a85f] transition-colors"
                    >
                        GAMES
                    </a>
                </div>

                <a
                    href="#token"
                    className="rounded-full bg-[#10251b] px-5 py-3 text-xs font-black tracking-wider text-[#f4f0df] hover:bg-[#35a85f] hover:text-[#10251b] transition-colors"
                >
                    BUY $DOGGO
                </a>
            </nav>

            {/* Main Hero */}
            <div className="relative z-10 min-h-[calc(100vh-90px)] px-6 md:px-12 lg:px-20">

                {/* Left copy */}
                <div className="absolute left-6 md:left-12 lg:left-20 top-[18%] md:top-[20%] max-w-[850px]">

                    <p className="mb-5 text-xs md:text-sm font-black tracking-[0.3em] text-[#35a85f]">
                        HE'S JUST GETTING STARTED.
                    </p>

                    <h1 className="font-display text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.85] tracking-[-0.04em] font-black">
                        <span className="block">DOGGO</span>

                        <span className="block ml-[1vw] text-[#35a85f]">
                            DANCES.
                        </span>
                    </h1>

                    <p className="mt-10 max-w-[340px] text-base md:text-lg leading-relaxed font-medium text-[#10251b]/65">
                        One little dog.
                        <br />
                        One unstoppable dance.
                        <br />
                        Somehow, the internet joined in.
                    </p>
                </div>

                {/* Big yellow circle behind Doggo */}
                <div className="absolute z-0 right-[5%] md:right-[12%] top-[30%] w-[48vw] h-[48vw] max-w-[620px] max-h-[620px] rounded-full bg-[#ffd62c]" />

                {/* Decorative text */}
                <div className="absolute right-6 md:right-12 bottom-[17%] z-10 hidden md:block">
                    <p className="text-[10px] font-black tracking-[0.25em] rotate-90 origin-right text-[#10251b]/40">
                        NEVER STOPS DANCING
                    </p>
                </div>

                {/* Draggable Doggo */}
                <img
                    ref={dogRef}
                    src="/dancing-doggo.gif"
                    alt="Dancing Doggo"
                    draggable={false}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className={`absolute z-30 w-44 md:w-56 lg:w-72 select-none touch-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                    style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Interaction hint */}
                <div className="absolute left-6 md:left-12 lg:left-20 bottom-[13%] z-20">
                    <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#10251b] text-xs font-black">
                            ↔
                        </span>

                        <span className="text-[10px] md:text-xs font-black tracking-[0.18em]">
                            MOVE THE DOGGO
                        </span>
                    </div>
                </div>

                {/* Reset */}
                <button
                    onClick={resetPosition}
                    className="absolute left-6 md:left-12 lg:left-20 bottom-[7%] z-40 flex items-center gap-2 rounded-full border-2 border-[#10251b] bg-[#f4f0df] px-4 py-2 text-[10px] font-black tracking-[0.18em] hover:bg-[#10251b] hover:text-[#f4f0df] transition-colors"
                >
                    <RotateCcw size={13} />
                    RESET
                </button>

                {/* Scroll */}
                <a
                    href="#scenes"
                    className="absolute bottom-20 right-6 md:right-12 z-40 flex items-center gap-3 text-xs font-black tracking-[0.18em] hover:text-[#35a85f] transition-colors"
                >
                    SCROLL
                    <ArrowDown size={15} />
                </a>
            </div>

            {/* Bottom ticker */}
            <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t-2 border-[#10251b] bg-[#35e77f]">
                <div className="flex whitespace-nowrap py-3 text-[10px] md:text-xs font-black tracking-[0.25em]">
                    <span className="mx-6">
                        DOGGO IS DANCING ✦ DOGGO IS DANCING ✦ DOGGO IS DANCING ✦
                    </span>
                    <span className="mx-6">
                        DOGGO IS DANCING ✦ DOGGO IS DANCING ✦ DOGGO IS DANCING ✦
                    </span>
                </div>
            </div>
        </section>
    );
}