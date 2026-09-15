interface MarqueeProps {
    items: string[];
    reverse?: boolean;
    className?: string;
}

export default function Marquee({ items, reverse = false, className = '' }: MarqueeProps) {
    const content = [...items, ...items, ...items, ...items];
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className={`flex gap-8 whitespace-nowrap ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
                {content.map((item, i) => (
                    <span key={i} className="font-display text-2xl md:text-4xl text-stroke-white flex items-center gap-8">
                        {item}
                        <span className="text-orange-400 text-3xl md:text-5xl">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
