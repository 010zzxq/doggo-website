import { useEffect, useRef, useState } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';

export default function Hero() {
    const dogRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState({ x: 20, y: 50 });
    const [dragging, setDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!dogRef.current) return;

        const rect = dogRef.current.getBoundingClientRect();

        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        setDragging(true);
        dogRef.current.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;

        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        setPosition({
            x: Math.max(5, Math.min(95, x)),
            y: Math.max(10, Math.min(90, y)),
        });
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    const resetPosition = () => {
        setPosition({ x: 20, y: 50 });
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
                    x = 20;
                    y = 50;
                }


                return {
                    x: Math.max(5, Math.min(95, x)),
                    y: Math.max(10, Math.min(90, y)),
                };
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <section
            className="relative min-h-screen bg-[#0a1714] overflow-hidden flex flex-col">
            {/* Background */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Navigation */}
            <nav className="relative z-20 flex items-center gap-8 px-6 py-6 md:px-10">
                {/* Logo */}
                <div className="font-display text-xl tracking-widest text-emerald-400">
                    $DOGGO
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-8 text-sm text-white/70">
                    {/* TikTok - First */}
                    <a
                        href="https://www.tiktok.com/music/original-sound-7664730339339668255"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        TIKTOK
                    </a>
                    <a
                        href="https://www.instagram.com/reels/audio/422882598269159?stkn=eHVldHFneTVydmR1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        INSTAGRAM
                    </a>
                    {/* Scenes */}
                    <a
                        href="#scenes"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        SCENES
                    </a>

                    {/* Community */}
                    <a
                        href="#community"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        COMMUNITY
                    </a>

                    {/* Token */}
                    <a
                        href="#token"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        TOKEN
                    </a>
                    <a
                        href="#games"
                        className="hover:text-emerald-400 transition-colors"
                    >
                        GAMES
                    </a>
                    {/* Buy */}
                    <a
                        href="#token"
                        className="px-4 py-2 rounded-full bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
                    >
                        Buy $DOGGO
                    </a>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
                <p className="font-display text-emerald-400 text-sm tracking-[0.4em] mb-5">
                    THE INTERNET'S FAVORITE DOG
                </p>

                <h1 className="font-display text-7xl md:text-9xl leading-none tracking-tight">
                    <span className="text-white">DOG</span>
                    <span className="text-emerald-400 glow-mint">GO</span>
                </h1>

                <p className="mt-6 text-white/50 max-w-md text-base md:text-lg">
                    One little dog. Infinite places to go.
                    <br />
                    The Memecoin that just keeps dancing.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 text-white/30 text-xs">
                    <span>DRAG DOGGO AROUND</span>
                    <span>OR USE ARROW KEYS</span>
                </div>
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
                className={`absolute z-30 w-32 md:w-44 select-none touch-none cursor-grab ${dragging ? 'cursor-grabbing' : ''
                    }`}
                style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Reset Button */}
            <button
                onClick={resetPosition}
                className="absolute bottom-8 left-8 z-40 flex items-center gap-2 text-xs text-white/30 hover:text-emerald-400 transition-colors"
            >
                <RotateCcw size={14} />
                reset doggo
            </button>

            {/* Scroll Indicator */}
            <a
                href="#scenes"
                className="absolute bottom-8 right-8 z-40 flex flex-col items-center gap-2 text-white/30 hover:text-emerald-400 transition-colors"
            >
                <span className="text-xs">scroll</span>
                <ArrowDown size={16} />
            </a>
        </section>
    );
}