import { useEffect, useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const TOKEN_ADDRESS = 'FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump';
const DEXSCREENER_API =
    'https://api.dexscreener.com/latest/dex/tokens/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump';

const links = [
    {
        label: 'Pump.fun',
        href: 'https://pump.fun/coin/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump',
    },
    {
        label: 'DexScreener',
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
            className="relative py-20 md:py-32 bg-[#081210] overflow-hidden"
        >
            <div className="absolute inset-0 bg-radial-mint" />
            <div className="absolute inset-0 bg-grid opacity-50" />

            <div className="relative max-w-4xl mx-auto px-4 text-center">
                <h2 className="font-display text-5xl md:text-7xl mb-3">
                    Same doggo.{' '}
                    <span className="text-emerald-400 glow-mint">
                        On chain.
                    </span>
                </h2>

                <p className="text-white/50 text-lg mb-12 max-w-lg mx-auto">
                    Doggo on solana. Check the address. Find his people.
                </p>

                <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm card-glow">

                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center overflow-hidden">
                            <img
                                src="/dancing-doggo.gif"
                                alt="Dancing Doggo"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="text-left">
                            <p className="font-display text-2xl text-white">
                                Dancing Doggo
                            </p>
                            <p className="text-emerald-400 font-display text-lg">
                                $DOGGO
                            </p>
                        </div>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6">
                        <p className="text-white/40 text-xs font-mono mb-2 tracking-wider">
                            CONTRACT ADDRESS
                        </p>

                        <div className="flex items-center justify-between gap-3">
                            <code className="text-emerald-400 text-xs md:text-sm font-mono break-all text-left flex-1">
                                {TOKEN_ADDRESS}
                            </code>

                            <button
                                onClick={copyAddress}
                                className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-400 hover:text-black transition-all flex items-center justify-center"
                                aria-label="Copy address"
                            >
                                {copied ? (
                                    <Check size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                        <div className="bg-white/5 rounded-2xl p-4">
                            <p className="text-white/40 text-xs mb-1">
                                PRICE
                            </p>

                            <p className="font-display text-lg text-white">
                                {tokenData?.priceUsd
                                    ? `$${Number(
                                        tokenData.priceUsd
                                    ).toFixed(8)}`
                                    : 'Loading...'}
                            </p>

                            {tokenData?.priceChange24h !== undefined && (
                                <p
                                    className={`text-xs mt-1 ${tokenData.priceChange24h >= 0
                                        ? 'text-emerald-400'
                                        : 'text-red-400'
                                        }`}
                                >
                                    {tokenData.priceChange24h >= 0 ? '+' : ''}
                                    {tokenData.priceChange24h.toFixed(2)}% 24h
                                </p>
                            )}
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4">
                            <p className="text-white/40 text-xs mb-1">
                                MARKET CAP
                            </p>

                            <p className="font-display text-lg text-white">
                                {tokenData?.marketCap
                                    ? `$${tokenData.marketCap.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4">
                            <p className="text-white/40 text-xs mb-1">
                                LIQUIDITY
                            </p>

                            <p className="font-display text-lg text-white">
                                {tokenData?.liquidity
                                    ? `$${tokenData.liquidity.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-4">
                            <p className="text-white/40 text-xs mb-1">
                                24H VOLUME
                            </p>

                            <p className="font-display text-lg text-white">
                                {tokenData?.volume24h
                                    ? `$${tokenData.volume24h.toLocaleString()}`
                                    : 'Loading...'}
                            </p>
                        </div>

                    </div>

                    <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-white/40 text-xs mb-1">
                            LAUNCHPAD
                        </p>

                        <p className="font-display text-lg text-white">
                            Pump.fun
                        </p>
                    </div>

                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-emerald-400 hover:text-black text-white/70 text-sm font-display tracking-wide transition-all"
                        >
                            {link.label}
                            <ExternalLink size={14} />
                        </a>
                    ))}
                </div>
            </div>

            <p className="text-white/30 text-xs mt-6 max-w-md mx-auto">
                or just search the token address above in your chosen tool.
                Not financial advice. The doggo doesn't even know what money is.
            </p>

        </section>
    );
}