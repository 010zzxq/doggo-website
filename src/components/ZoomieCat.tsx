interface ZoomieCatProps {
    size?: number;
    fast?: boolean;
    className?: string;
}

export default function ZoomieCat({ size = 120, fast = false, className = '' }: ZoomieCatProps) {
    return (
        <div
            className={`relative inline-block ${fast ? 'animate-zoomie-fast' : 'animate-zoomie'} ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src="/dancing-doggo.gif"
                alt="Dancing Doggo"
                width={size}
                height={size}
                className="h-full w-full object-contain"
                draggable={false}
            />
        </div>
    );
}
