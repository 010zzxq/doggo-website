import { useState, useRef, useCallback } from 'react';
import ZoomieCat from './ZoomieCat';

interface Scene {
    id: number;
    name: string;
    caption: string;
    image: string;
}

const scenes: Scene[] = [
    {
        id: 1,
        name: '3AM LIVING ROOM',
        caption: 'no sleep. only dance.',
        image: 'https://images.pexels.com/photos/9890739/pexels-photo-9890739.jpeg?auto=compress&cs=tinysrgb&w=1280',
    },
    {
        id: 2,
        name: 'MOONLIT WOODS',
        caption: 'the moon is up. so is he.',
        image: 'https://images.pexels.com/photos/18981016/pexels-photo-18981016.jpeg?auto=compress&cs=tinysrgb&w=1280',
    },
    {
        id: 3,
        name: 'NEON NIGHTS',
        caption: 'bro has places to be..',
        image: '/scene.3.png',
    },
    {
        id: 4,
        name: 'LOST IN THE STATION',
        caption: 'no map. no problem..',
        image: '/scene.4.png',
    },
    {
        id: 5,
        name: 'DOGGO IN CAFE SHOP',
        caption: 'Doggo is chilling',
        image: '/scene.5.png',
    },
    {
        id: 6,
        name: 'DOGGO IN BACKROOMS',
        caption: 'Doggo is lost..',
        image: '/scene.6.png',
    },
    {
        id: 7,
        name: 'ANOTHER DIMENSION',
        caption: 'Doggo went somewhere..',
        image: '/scene.7.png',
    },
];

export default function SceneGallery() {
    const [active, setActive] = useState(0);
    const [catPos, setCatPos] = useState({ x: 50, y: 50 });
    const [dragging, setDragging] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const offset = useRef({ x: 0, y: 0 });

    const handleStart = useCallback((clientX: number, clientY: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        offset.current = { x: x - catPos.x * rect.width / 100, y: y - catPos.y * rect.height / 100 };
        setDragging(true);
    }, [catPos]);

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!dragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left - offset.current.x) / rect.width) * 100;
        const y = ((clientY - rect.top - offset.current.y) / rect.height) * 100;
        setCatPos({
            x: Math.max(5, Math.min(85, x)),
            y: Math.max(10, Math.min(80, y)),
        });
    }, [dragging]);

    const handleEnd = useCallback(() => setDragging(false), []);

    return (
        <section id="scenes" className="relative py-20 md:py-32 bg-[#081210] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-emerald-400 font-display text-sm tracking-[0.3em] mb-3">THE INTERNET IS HIS RACETRACK</p>
                    <h2 className="font-display text-5xl md:text-7xl mb-4">
                        Put him <span className="text-emerald-400 glow-mint">anywhere</span>.
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Pick a place. Drag the doggo. Watch him go.
                    </p>
                </div>

                {/* Scene selector */}
                <div className="flex gap-3 md:gap-4 mb-6 overflow-x-auto scrollbar-hide pb-2 justify-start md:justify-center">
                    {scenes.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => setActive(i)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-display text-xs md:text-sm tracking-wider transition-all ${active === i
                                ? 'bg-emerald-400 text-black scale-105'
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {String(s.id).padStart(2, '0')} · {s.name}
                        </button>
                    ))}
                </div>

                {/* Interactive scene */}
                <div
                    ref={containerRef}
                    className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none border border-emerald-400/20 card-glow"
                    onMouseDown={(e) => { setShowHint(false); handleStart(e.clientX, e.clientY); }}
                    onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => { setShowHint(false); handleStart(e.touches[0].clientX, e.touches[0].clientY); }}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchEnd={handleEnd}
                >
                    <img
                        src={scenes[active].image}
                        alt={scenes[active].name}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Draggable doggo */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            left: `${catPos.x}%`,
                            top: `${catPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            transition: dragging ? 'none' : 'left 0.3s ease, top 0.3s ease',
                        }}
                    >
                        <div className="relative">
                            {/* Speed lines when dragging */}
                            {dragging && (
                                <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="h-1 bg-white/60 rounded-full animate-speed-lines"
                                            style={{ width: 20 + i * 10, animationDelay: `${i * 0.1}s` }}
                                        />
                                    ))}
                                </div>
                            )}
                            {/* Dust puffs */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                {[0, 1].map((i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 bg-white/40 rounded-full animate-dust"
                                        style={{ animationDelay: `${i * 0.2}s` }}
                                    />
                                ))}
                            </div>
                            <ZoomieCat size={80} fast={dragging} />
                        </div>
                    </div>

                    {/* Hint */}
                    {showHint && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-5 py-3 rounded-full text-sm text-white/80 flex items-center gap-2 animate-float-slow">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Drag the doggo. He doesn't mind.
                        </div>
                    )}

                    {/* Scene label */}
                    <div className="absolute top-6 left-6">
                        <p className="text-emerald-400 font-display text-xs tracking-[0.3em] mb-1">
                            {String(active + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                        </p>
                        <h3 className="font-display text-2xl md:text-3xl text-white">{scenes[active].name}</h3>
                        <p className="text-white/60 text-sm mt-1">{scenes[active].caption}</p>
                    </div>
                </div>

                <p className="text-center text-white/30 text-sm mt-4">
                    Drag to move him · Tap to grab · Arrow keys work too (Home to reset)
                </p>
            </div>
        </section>
    );
}
