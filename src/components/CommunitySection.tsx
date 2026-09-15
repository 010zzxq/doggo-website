import { useEffect, useState } from 'react';
import { Camera, Music2, AtSign, Coins } from 'lucide-react';

const socials = [
    {
        label: 'Instagram',
        icon: Camera,
        href: 'https://www.instagram.com/doggo.memeonsol?stkn=MXVtN2NrZTA3cGt4cg%3D%3D'
    },
    {
        label: 'TikTok',
        icon: Music2,
        href: 'https://www.tiktok.com/@dancing_dog_on_sol'
    },
    {
        label: 'X / Twitter',
        icon: AtSign,
        href: 'https://x.com/DoggoOnSol1'
    },
    {
        label: 'Pump.fun',
        icon: Coins,
        href: 'https://pump.fun/coin/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump'
    },
];

type TikTokPost = {
    username: string;
    publishedAt: string | null;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    videoId: string | null;
    videoUrl: string | null;
    coverUrl: string | null;
};

type TikTokData = {
    posts: TikTokPost[];
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    hasMore: boolean;
    nextCursor: string | null;
};

export default function CommunitySection() {
    const [tiktokData, setTiktokData] = useState<TikTokData | null>(null);
    const [tiktokLoading, setTiktokLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState<'1H' | '24H' | 'ALL'>('ALL');

    useEffect(() => {
        fetch('http://localhost:3001/api/tiktok')
            .then((response) => response.json())
            .then((data) => {
                setTiktokData(data);
                setTiktokLoading(false);
            })
            .catch((error) => {
                console.error('Failed to load TikTok data:', error);
                setTiktokLoading(false);
            });
    }, []);

    const sortedPosts = [...(tiktokData?.posts ?? [])].sort((a, b) => {
        const dateA = a.publishedAt
            ? new Date(a.publishedAt).getTime()
            : 0;

        const dateB = b.publishedAt
            ? new Date(b.publishedAt).getTime()
            : 0;

        return dateB - dateA;
    });

    const newestPostTime =
        sortedPosts.length > 0 && sortedPosts[0].publishedAt
            ? new Date(sortedPosts[0].publishedAt).getTime()
            : Date.now();

    const filteredPosts = sortedPosts.filter((post) => {
        if (selectedRange === 'ALL') {
            return true;
        }

        if (!post.publishedAt) {
            return false;
        }

        const publishedTime = new Date(post.publishedAt).getTime();

        const rangeMs =
            selectedRange === '1H'
                ? 60 * 60 * 1000
                : 24 * 60 * 60 * 1000;

        return (
            newestPostTime - publishedTime >= 0 &&
            newestPostTime - publishedTime <= rangeMs
        );
    });

    return (
        <section
            id="community"
            className="relative py-20 md:py-32 bg-[#081210] overflow-hidden"
        >
            <div className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-emerald-400 font-display text-sm tracking-[0.3em] mb-3">
                        EVERYONE'S INVITED
                    </p>

                    <h2 className="font-display text-5xl md:text-7xl mb-4">
                        One little dog. <br />
                        <span className="text-emerald-400 glow-mint">
                            A lot of friends.
                        </span>
                    </h2>

                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        You don't need a wallet to dance with the doggo. Just bring the energy.
                    </p>
                </div>

                {/* TikTok Stats */}
                <div className="mb-16 max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-emerald-400 font-display text-sm tracking-[0.3em] mb-3">
                            THE DANCE, IN NUMBERS
                        </p>

                        <h3 className="font-display text-3xl md:text-5xl text-white mb-3">
                            TikTok activity
                        </h3>

                        <p className="text-white/40 text-sm">
                            Posts using the DOGGO sound
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
                        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
                            <div>
                                <p className="text-white/40 text-xs tracking-widest mb-2">
                                    TOTAL POSTS
                                </p>

                                <p className="font-display text-4xl md:text-5xl text-white">
                                    {tiktokLoading
                                        ? '...'
                                        : tiktokData
                                            ? tiktokData.posts.length
                                            : '—'}
                                </p>
                            </div>

                            <div>
                                <p className="text-white/40 text-xs tracking-widest mb-2">
                                    TOTAL VIEWS
                                </p>

                                <p className="font-display text-2xl text-emerald-400">
                                    {tiktokLoading
                                        ? '...'
                                        : tiktokData
                                            ? `${(
                                                tiktokData.totalViews / 1000000
                                            ).toFixed(2)}M`
                                            : '—'}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                {['1H', '24H', 'ALL'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() =>
                                            setSelectedRange(
                                                range as '1H' | '24H' | 'ALL'
                                            )
                                        }
                                        className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${selectedRange === range
                                            ? 'bg-emerald-400 text-black border-emerald-400'
                                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-emerald-400 hover:text-black hover:border-emerald-400'
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* TikTok Activity Chart */}
                        <div className="h-56 rounded-2xl bg-black/20 border border-white/5 p-4">
                            {filteredPosts.length > 0 ? (
                                <div className="h-full flex items-end gap-2">
                                    {filteredPosts.map((post, index) => {
                                        const maxViews = Math.max(
                                            ...filteredPosts.map(
                                                (item) => item.views
                                            )
                                        );

                                        const height =
                                            maxViews > 0
                                                ? Math.max(
                                                    (post.views / maxViews) * 100,
                                                    4
                                                )
                                                : 4;

                                        const formattedViews =
                                            post.views >= 1000000
                                                ? `${(
                                                    post.views / 1000000
                                                ).toFixed(1)}M`
                                                : post.views >= 1000
                                                    ? `${(
                                                        post.views / 1000
                                                    ).toFixed(0)}K`
                                                    : post.views.toString();

                                        return (
                                            <div
                                                key={`${post.username}-${index}`}
                                                className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                                                title={`${post.username}: ${post.views.toLocaleString()} views`}
                                            >
                                                <span className="text-[10px] text-white/50 whitespace-nowrap">
                                                    {formattedViews}
                                                </span>

                                                <div
                                                    className="w-full bg-emerald-400/70 hover:bg-emerald-400 rounded-t-lg transition-all"
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-white/30 text-sm">
                                    No posts found in this range.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Engagement Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                        <p className="text-white/40 text-xs tracking-widest mb-2">
                            LIKES
                        </p>

                        <p className="font-display text-3xl text-white">
                            {tiktokLoading
                                ? '...'
                                : tiktokData
                                    ? `${(
                                        tiktokData.totalLikes / 1000000
                                    ).toFixed(2)}M`
                                    : '—'}
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                        <p className="text-white/40 text-xs tracking-widest mb-2">
                            VIEWS
                        </p>

                        <p className="font-display text-3xl text-white">
                            {tiktokLoading
                                ? '...'
                                : tiktokData
                                    ? `${(
                                        tiktokData.totalViews / 1000000
                                    ).toFixed(2)}M`
                                    : '—'}
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-center">
                        <p className="text-white/40 text-xs tracking-widest mb-2">
                            SHARES
                        </p>

                        <p className="font-display text-3xl text-white">
                            {tiktokLoading
                                ? '...'
                                : tiktokData
                                    ? `${(
                                        tiktokData.totalShares / 1000000
                                    ).toFixed(2)}M`
                                    : '—'}
                        </p>
                    </div>
                </div>
                {/* Clips */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <p className="text-emerald-400 font-display text-sm tracking-[0.3em] mb-3">
                            CLIPS MAKING MOVES
                        </p>

                        <h3 className="font-display text-3xl md:text-5xl text-white mb-3">
                            Doggo is moving.
                        </h3>

                        <p className="text-white/40 text-sm">
                            The latest clips using the DOGGO sound.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedPosts.slice(0, 6).map((post) => (
                            <a
                                key={post.videoId}
                                href={post.videoUrl ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-emerald-400/40 hover:bg-white/[0.05] transition-all"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-emerald-400 font-display text-sm">
                                        @{post.username}
                                    </span>

                                    <span className="text-white/30 text-xs">
                                        TikTok ↗
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-white font-display text-lg">
                                            {(post.views / 1000000).toFixed(1)}M
                                        </p>
                                        <p className="text-white/30 text-[10px] tracking-wider">
                                            VIEWS
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-white font-display text-lg">
                                            {(post.likes / 1000).toFixed(0)}K
                                        </p>
                                        <p className="text-white/30 text-[10px] tracking-wider">
                                            LIKES
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-white font-display text-lg">
                                            {(post.shares / 1000).toFixed(0)}K
                                        </p>
                                        <p className="text-white/30 text-[10px] tracking-wider">
                                            SHARES
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-white/5 text-white/30 text-xs group-hover:text-emerald-400 transition-colors">
                                    Watch clip →
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* Socials */}
                <div className="flex flex-wrap gap-4 justify-center">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-all"
                        >
                            <s.icon
                                size={20}
                                className="text-emerald-400 group-hover:text-black transition-colors"
                            />

                            <span className="font-display tracking-wide">
                                {s.label}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Manifesto */}
                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <p className="text-white/40 text-lg leading-relaxed italic">
                        "One little dog, a thousand places to be.
                        <br />
                        Bring him on your run. Drop him in the chat.
                        <br />
                        Good company. Same little dance."
                    </p>
                </div>
            </div>
        </section>
    );
}