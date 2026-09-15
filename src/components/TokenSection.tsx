import { useEffect, useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const TOKEN_ADDRESS = 'FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump';

const DEXSCREENER_API =
    'https://api.dexscreener.com/latest/dex/tokens/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump';

const links = [
    {
        label: 'BUY ON PUMP.FUN',
        href: 'https://pump.fun/coin/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump',
    },
    {
        label: 'VIEW ON DEXSCREENER',
        href: 'https://dexscreener.com/solana/DBqbqUehE6kr9c4oGvoESs9JJWJJRoVLgCcSPEePD5qT',
    },
];

export default function TokenSection() {
    const [copied, setCopied] = useState(false);

    const [tokenData, setTokenData] = useState<{
        priceUsd?: string;
        marketCap?: number;
        liquidity?: number;
        volume24h?: number;
        priceChange24h?: number;
    } | null>(null);

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                const response = await fetch(DEXSCREENER_API);
                const data = await response.json();

                if (data.pairs && data.pairs.length > 0) {
                    const pair =
                        data.pairs.find(
                            (p: any) =>
                                p.chainId === 'solana' &&
                                p.pairAddress ===
                                'DBqbqUehE6kr9c4oGvoESs9JJWJJRoVLgCcSPEePD5qT'
                        ) || data.pairs[0];

                    setTokenData({
                        priceUsd: pair.priceUsd,
                        marketCap: pair.marketCap,
                        liquidity: pair.liquidity?.usd,
                        volume24h: pair.volume?.h24,
                        priceChange24h: pair.priceChange?.h24,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch DOGGO data:', error);
            }
        };

        fetchTokenData();

        const interval = setInterval(fetchTokenData, 30000);

        return () => clearInterval(interval);
    }, []);

    const copyAddress = () => {
        navigator.clipboard.writeText(TOKEN_ADDRESS);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="token"
            className="relative overflow-hidden bg-[#10251b] text-[#f4f0df] py-24 md:py-36"
        >
            {/* Decorative circles */}
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#35e77f]" />

            <div className="absolute bottom-20 -left-24 w-48 h-48 rounded-full bg-[#ffd62c]" />

            <div className="relative max-w-6xl mx-auto px-6 md:px-10">

                {/* Header */}
                <div className="max-w-5xl mb-16">

                    <p className="mb-5 text-xs md:text-sm font-black tracking-[0.3em] text-[#35e77f]">
                        THE DOGGO HAS AN ADDRESS.
                    </p>

                    <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[8vw] leading-[0.82] tracking-[-0.05em] font-black">
                        SAME DOGGO.
                        <br />
                        <span className="text-[#ffd62c]">
                            ON CHAIN.
                        </span>
                    </h2>

                    <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed font-medium text-[#f4f0df]/55">
                        If you want to find him, this is where he lives.
                        Check the address. Follow the numbers. Buy him
                        if you want. The doggo doesn't judge.
                    </p>
                </div>

                {/* Main token card */}
                <div className="relative rounded-[2rem] bg-[#f4f0df] text-[#10251b] p-6 md:p-10 lg:p-12">

                    {/* Top row */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">

                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#35e77f] overflow-hidden flex items-center justify-center border-4 border-[#10251b]">
                                <img
                                    src="/dancing-doggo.gif"
                                    alt="Dancing Doggo"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-black tracking-[0.2em] text-[#10251b]/40 mb-1">
                                    THE TOKEN
                                </p>

                                <h3 className="font-display text-3xl md:text-4xl font-black">
                                    Dancing Doggo
                                </h3>

                                <p className="font-display text-lg font-black text-[#35a85f]">
                                    $DOGGO
                                </p>
                            </div>
                        </div>

                        <div className="rounded-full bg-[#10251b] px-5 py-3 text-xs font-black tracking-[0.15em] text-[#35e77f] w-fit">
                            SOLANA ✦ PUMP.FUN
                        </div>
                    </div>

                    {/* Contract */}
                    <div className="rounded-2xl bg-[#10251b] text-[#f4f0df] p-5 md:p-6 mb-8">

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-[10px] font-black tracking-[0.2em] text-white/35 mb-2">
                                    CONTRACT ADDRESS
                                </p>

                                <code className="block text-xs md:text-sm font-mono text-[#35e77f] break-all">
                                    {TOKEN_ADDRESS}
                                </code>
                            </div>

                            <button
                                onClick={copyAddress}
                                className="flex-shrink-0 w-12 h-12 rounded-full bg-[#f4f0df]/10 hover:bg-[#35e77f] hover:text-[#10251b] flex items-center justify-center transition-colors"
                                aria-label="Copy token address"
                            >
                                {copied ? (
                                    <Check size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </div>

                        {copied && (
                            <p className="mt-3 text-xs font-bold text-[#35e77f]">
                                ADDRESS COPIED.
                            </p>
                        )}
                    </div>

                    {/* Live stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

                        <div className="rounded-2xl bg-[#e9e4d2] p-5">
                            <p className="text-[10px] font-black tracking-[0.2em] text-[#10251b]/40 mb-3">
                                PRICE
                            </p>

                            <p className="font-display text-xl md:text-2xl font-black">
                                {tokenData?.priceUsd
                                    ? `$${Number(
                                        tokenData.priceUsd
                                    ).toFixed(8)}`
                                    : 'Loading...'}
                            </p>

                            {tokenData?.priceChange24h !== undefined && (
                                <p
                                    className={`text-xs mt-2 font-black ${tokenData.priceChange24h >= 0
                                            ? 'text-[#35a85f]'
                                            : 'text-red-500'
                                        }`}
                                >
                                    {tokenData.priceChange24h >= 0 ? '+' : ''}
                                    {tokenData.priceChange24h.toFixed(2)}% 24H
                                </p>
                            )}
                        </div>

                        <div className="rounded-2xl bg-[#e9e4d2] p-5">
                            <p className="text-[10px] font-black tracking-[0.2em] text-[#10251b]/40 mb-3">
                                MARKET CAP
                            </p>

                            <p className="font-display text-xl md:text-2xl font-black">
                                {tokenData?.marketCap
                                    ? `$${tokenData.marketCap.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#e9e4d2] p-5">
                            <p className="text-[10px] font-black tracking-[0.2em] text-[#10251b]/40 mb-3">
                                LIQUIDITY
                            </p>

                            <p className="font-display text-xl md:text-2xl font-black">
                                {tokenData?.liquidity
                                    ? `$${tokenData.liquidity.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#e9e4d2] p-5">
                            <p className="text-[10px] font-black tracking-[0.2em] text-[#10251b]/40 mb-3">
                                24H VOLUME
                            </p>

                            <p className="font-display text-xl md:text-2xl font-black">
                                {tokenData?.volume24h
                                    ? `$${tokenData.volume24h.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                    {links.map((link, index) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-3 rounded-full px-6 py-4 text-xs md:text-sm font-black tracking-[0.12em] transition-colors ${index === 0
                                    ? 'bg-[#35e77f] text-[#10251b] hover:bg-[#ffd62c]'
                                    : 'border-2 border-[#f4f0df]/20 text-[#f4f0df] hover:bg-[#f4f0df] hover:text-[#10251b]'
                                }`}
                        >
                            {link.label}
                            <ArrowUpRight size={16} />
                        </a>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="mt-10 text-center text-[11px] font-bold tracking-wide text-[#f4f0df]/30">
                    NOT FINANCIAL ADVICE. THE DOGGO DOESN'T EVEN KNOW WHAT
                    MONEY IS.
                </p>
            </div>
        </section>
    );
}