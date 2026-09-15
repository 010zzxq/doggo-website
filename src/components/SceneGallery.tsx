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

    const handleStart = useCallback(
        (clientX: number, clientY: number) => {
            const rect = containerRef.current?.getBoundingClientRect();

            if (!rect) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            offset.current = {
                x: x - (catPos.x * rect.width) / 100,
                y: y - (catPos.y * rect.height) / 100,
            };

            setDragging(true);
        },
        [catPos]
    );

    const handleMove = useCallback(
        (clientX: number, clientY: number) => {
            if (!dragging || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();

            const x =
                ((clientX - rect.left - offset.current.x) /
                    rect.width) *
                100;

            const y =
                ((clientY - rect.top - offset.current.y) /
                    rect.height) *
                100;

            setCatPos({
                x: Math.max(5, Math.min(85, x)),
                y: Math.max(10, Math.min(80, y)),
            });
        },
        [dragging]
    );

    const handleEnd = useCallback(() => {
        setDragging(false);
    }, []);

    return (
        <section
            id="scenes"
            className="relative overflow-hidden bg-[#10251b] py-24 md:py-36 text-[#f4f0df]"
        >


            <div className="relative mx-auto max-w-7xl px-5 md:px-10">

                {/* Section intro */}
                <div className="mb-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">

                    <div>
                        <p className="mb-4 text-xs font-black tracking-[0.3em] text-[#35e77f]">
                            DOGGO HAS BEEN BUSY
                        </p>

                        <h2 className="font-display text-6xl leading-[0.82] tracking-[-0.05em] font-black md:text-8xl lg:text-9xl">
                            PUT HIM
                            <br />
                            <span className="text-[#ffd62c]">
                                ANYWHERE.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-xs text-sm leading-relaxed text-white/55 md:text-right">
                        Different place.
                        <br />
                        Same dog.
                        <br />
                        Still dancing.
                    </p>
                </div>

                {/* Scene selector */}
                <div
                    className="mb-7 flex w-full gap-2 overflow-x-scroll overflow-y-hidden pb-3"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {scenes.map((scene, index) => (
                        <button
                            key={scene.id}
                            onClick={() => setActive(index)}
                            className={`flex-shrink-0 rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.12em] transition-all md:px-5 md:text-xs ${active === index
                                ? 'border-[#ffd62c] bg-[#ffd62c] text-[#10251b]'
                                : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
                                }`}
                        >
                            {String(scene.id).padStart(2, '0')}
                            {' · '}
                            {scene.name}
                        </button>
                    ))}
                </div>

                {/* Interactive scene */}
                <div
                    ref={containerRef}
                    className="group relative aspect-[16/9] w-full cursor-grab overflow-hidden rounded-[2rem] border-2 border-white/10 bg-black active:cursor-grabbing select-none md:rounded-[3rem]"
                    onMouseDown={(e) => {
                        setShowHint(false);
                        handleStart(e.clientX, e.clientY);
                    }}
                    onMouseMove={(e) =>
                        handleMove(e.clientX, e.clientY)
                    }
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => {
                        setShowHint(false);
                        handleStart(
                            e.touches[0].clientX,
                            e.touches[0].clientY
                        );
                    }}
                    onTouchMove={(e) =>
                        handleMove(
                            e.touches[0].clientX,
                            e.touches[0].clientY
                        )
                    }
                    onTouchEnd={handleEnd}
                >
                    <img
                        src={scenes[active].image}
                        alt={scenes[active].name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        draggable={false}
                    />

                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                    {/* Draggable Doggo */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            left: `${catPos.x}%`,
                            top: `${catPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            transition: dragging
                                ? 'none'
                                : 'left 0.3s ease, top 0.3s ease',
                        }}
                    >
                        <div className="relative">

                            {/* Speed lines */}
                            {dragging && (
                                <div className="absolute -left-16 top-1/2 flex -translate-y-1/2 gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="h-1 rounded-full bg-[#ffd62c] animate-speed-lines"
                                            style={{
                                                width: 20 + i * 10,
                                                animationDelay: `${i * 0.1}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Dust */}
                            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                                {[0, 1].map((i) => (
                                    <div
                                        key={i}
                                        className="h-3 w-3 rounded-full bg-white/40 animate-dust"
                                        style={{
                                            animationDelay: `${i * 0.2}s`,
                                        }}
                                    />
                                ))}
                            </div>

                            <ZoomieCat
                                size={90}
                                fast={dragging}
                            />
                        </div>
                    </div>

                    {/* Scene information */}
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                        <p className="mb-2 text-xs font-black tracking-[0.25em] text-[#ffd62c]">
                            {String(active + 1).padStart(2, '0')} /{' '}
                            {String(scenes.length).padStart(2, '0')}
                        </p>

                        <h3 className="font-display text-3xl font-black tracking-tight text-white md:text-5xl">
                            {scenes[active].name}
                        </h3>

                        <p className="mt-1 text-sm text-white/60 md:text-base">
                            {scenes[active].caption}
                        </p>
                    </div>

                    {/* Hint */}
                    {showHint && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-5 py-3 text-xs font-bold text-white backdrop-blur-md">
                            <span className="mr-2 text-[#35e77f]">●</span>
                            DRAG DOGGO AROUND
                        </div>
                    )}
                </div>

                {/* Bottom instruction */}
                <div className="mt-5 flex items-center justify-between text-[10px] font-bold tracking-[0.15em] text-white/30">
                    <span>
                        DRAG · TAP · MOVE
                    </span>

                    <span>
                        HOME TO RESET
                    </span>
                </div>
            </div>
        </section>
    );
}