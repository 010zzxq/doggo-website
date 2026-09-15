import { useEffect, useState } from 'react';
import { Camera, Music2, AtSign, Coins, ArrowUpRight } from 'lucide-react';

const socials = [
    {
        label: 'Instagram',
        icon: Camera,
        href: 'https://www.instagram.com/doggo.memeonsol?stkn=MXVtN2NrZTA3cGt4cg%3D%3D',
    },
    {
        label: 'TikTok',
        icon: Music2,
        href: 'https://www.tiktok.com/@dancing_dog_on_sol',
    },
    {
        label: 'X / Twitter',
        icon: AtSign,
        href: 'https://x.com/DoggoOnSol1',
    },
    {
        label: 'Pump.fun',
        icon: Coins,
        href: 'https://pump.fun/coin/FgJReZeYfmKZeWrCaGYL8gLnUixwBhjdHuRknC6ypump',
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
    const [selectedRange, setSelectedRange] = useState<'1H' | '24H' | 'ALL'>(
        'ALL'
    );

    useEffect(() => {
        fetch('https://doggo-website.onrender.com/api/tiktok')
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
            className="relative overflow-hidden bg-[#f4f0df] text-[#10251b] py-24 md:py-36"
        >
            {/* Decorative shapes */}
            <div className="absolute top-20 right-[8%] w-5 h-5 rounded-full bg-[#35e77f]" />
            <div className="absolute top-[28%] left-[4%] w-3 h-3 rounded-full bg-[#ffd62c]" />

            <div className="relative max-w-6xl mx-auto px-6 md:px-10">

                {/* Header */}
                <div className="max-w-5xl mb-20">

                    <p className="mb-5 text-xs md:text-sm font-black tracking-[0.3em] text-[#35a85f]">
                        THE INTERNET GOT INVOLVED.
                    </p>

                    <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[8vw] leading-[0.82] tracking-[-0.05em] font-black">
                        ONE DOG.
                        <br />
                        <span className="text-[#35a85f]">
                            MANY FRIENDS.
                        </span>
                    </h2>

                    <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <p className="max-w-md text-base md:text-lg leading-relaxed font-medium text-[#10251b]/60">
                            You don't need a wallet to join the dance.
                            Just make something weird, tag Doggo, and
                            send him into the world.
                        </p>

                        <a
                            href="https://www.tiktok.com/@dancing_dog_on_sol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 w-fit rounded-full bg-[#10251b] px-6 py-3 text-xs font-black tracking-[0.15em] text-[#f4f0df] hover:bg-[#35a85f] hover:text-[#10251b] transition-colors"
                        >
                            JOIN THE DANCE
                            <ArrowUpRight size={15} />
                        </a>
                    </div>
                </div>

                {/* Big stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">

                    <div className="rounded-[2rem] bg-[#ffd62c] p-7 md:p-9 min-h-[210px] flex flex-col justify-between">
                        <p className="text-xs font-black tracking-[0.2em]">
                            POSTS
                        </p>

                        <div>
                            <p className="font-display text-6xl md:text-7xl font-black tracking-tight">
                                {tiktokLoading
                                    ? '...'
                                    : tiktokData
                                        ? tiktokData.posts.length
                                        : '—'}
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#10251b]/60">
                                clips found using the DOGGO sound
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-[#35e77f] p-7 md:p-9 min-h-[210px] flex flex-col justify-between">
                        <p className="text-xs font-black tracking-[0.2em]">
                            VIEWS
                        </p>

                        <div>
                            <p className="font-display text-6xl md:text-7xl font-black tracking-tight">
                                {tiktokLoading
                                    ? '...'
                                    : tiktokData
                                        ? `${(
                                            tiktokData.totalViews / 1000000
                                        ).toFixed(2)}M`
                                        : '—'}
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#10251b]/60">
                                people have seen the dance
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] bg-[#10251b] text-[#f4f0df] p-7 md:p-9 min-h-[210px] flex flex-col justify-between">
                        <p className="text-xs font-black tracking-[0.2em] text-[#35e77f]">
                            SHARES
                        </p>

                        <div>
                            <p className="font-display text-6xl md:text-7xl font-black tracking-tight">
                                {tiktokLoading
                                    ? '...'
                                    : tiktokData
                                        ? `${(
                                            tiktokData.totalShares / 1000000
                                        ).toFixed(2)}M`
                                        : '—'}
                            </p>

                            <p className="mt-2 text-sm font-bold text-[#f4f0df]/50">
                                times the doggo travelled further
                            </p>
                        </div>
                    </div>
                </div>

                {/* Activity */}
                <div className="mb-24">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
                        <div>
                            <p className="text-xs font-black tracking-[0.25em] text-[#35a85f] mb-3">
                                THE DANCE, IN NUMBERS
                            </p>

                            <h3 className="font-display text-4xl md:text-6xl font-black tracking-tight">
                                DOGGO IS MOVING.
                            </h3>
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
                                    className={`px-5 py-2.5 rounded-full border-2 text-xs font-black tracking-wider transition-all ${selectedRange === range
                                            ? 'bg-[#10251b] text-[#f4f0df] border-[#10251b]'
                                            : 'bg-transparent border-[#10251b]/20 text-[#10251b]/50 hover:border-[#10251b] hover:text-[#10251b]'
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border-2 border-[#10251b] bg-[#eee9d7] p-5 md:p-8">

                        <div className="flex items-center justify-between mb-7">
                            <p className="text-xs font-black tracking-[0.2em]">
                                RECENT ACTIVITY
                            </p>

                            <p className="text-xs font-bold text-[#10251b]/40">
                                LIVE DATA
                            </p>
                        </div>

                        <div className="h-56 flex items-end gap-2 md:gap-3">

                            {filteredPosts.length > 0 ? (
                                filteredPosts.map((post, index) => {
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
                                            className="flex-1 h-full flex flex-col justify-end items-center gap-2 group"
                                            title={`${post.username}: ${post.views.toLocaleString()} views`}
                                        >
                                            <span className="text-[9px] md:text-[10px] font-black text-[#10251b]/40 whitespace-nowrap">
                                                {formattedViews}
                                            </span>

                                            <div
                                                className="w-full max-w-12 bg-[#35a85f] rounded-t-xl group-hover:bg-[#ffd62c] transition-colors"
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-[#10251b]/30 text-sm font-bold">
                                    No posts found in this range.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Clips */}
                <div className="mb-24">

                    <div className="mb-10">
                        <p className="text-xs font-black tracking-[0.25em] text-[#35a85f] mb-3">
                            CLIPS MAKING MOVES
                        </p>

                        <h3 className="font-display text-4xl md:text-6xl font-black tracking-tight">
                            YOU MADE THESE.
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sortedPosts.slice(0, 6).map((post, index) => (
                            <a
                                key={post.videoId ?? `${post.username}-${index}`}
                                href={post.videoUrl ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-[2rem] border-2 border-[#10251b] bg-[#10251b] text-[#f4f0df] min-h-[250px] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[#35e77f] font-display text-lg font-black">
                                        @{post.username}
                                    </span>

                                    <ArrowUpRight
                                        size={20}
                                        className="text-white/40 group-hover:text-[#ffd62c] transition-colors"
                                    />
                                </div>

                                <div>
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        <div>
                                            <p className="font-display text-2xl font-black">
                                                {post.views >= 1000000
                                                    ? `${(
                                                        post.views / 1000000
                                                    ).toFixed(1)}M`
                                                    : `${(
                                                        post.views / 1000
                                                    ).toFixed(0)}K`}
                                            </p>
                                            <p className="text-[9px] font-black tracking-wider text-white/35">
                                                VIEWS
                                            </p>
                                        </div>

                                        <div>
                                            <p className="font-display text-2xl font-black">
                                                {post.likes >= 1000000
                                                    ? `${(
                                                        post.likes / 1000000
                                                    ).toFixed(1)}M`
                                                    : `${(
                                                        post.likes / 1000
                                                    ).toFixed(0)}K`}
                                            </p>
                                            <p className="text-[9px] font-black tracking-wider text-white/35">
                                                LIKES
                                            </p>
                                        </div>

                                        <div>
                                            <p className="font-display text-2xl font-black">
                                                {post.shares >= 1000000
                                                    ? `${(
                                                        post.shares / 1000000
                                                    ).toFixed(1)}M`
                                                    : `${(
                                                        post.shares / 1000
                                                    ).toFixed(0)}K`}
                                            </p>
                                            <p className="text-[9px] font-black tracking-wider text-white/35">
                                                SHARES
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 text-xs font-black tracking-[0.15em] text-white/40 group-hover:text-[#ffd62c] transition-colors">
                                        WATCH CLIP ↗
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Socials */}
                <div className="border-t-2 border-[#10251b] pt-12">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                        <div>
                            <p className="text-xs font-black tracking-[0.25em] text-[#35a85f] mb-3">
                                FIND THE DOG
                            </p>

                            <h3 className="font-display text-3xl md:text-4xl font-black">
                                EVERYWHERE.
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {socials.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 rounded-full border-2 border-[#10251b] px-5 py-3 text-sm font-black hover:bg-[#10251b] hover:text-[#f4f0df] transition-colors"
                                    >
                                        <Icon
                                            size={17}
                                            className="group-hover:text-[#35e77f] transition-colors"
                                        />

                                        {social.label}

                                        <ArrowUpRight size={14} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Manifesto */}
                <div className="mt-24 text-center">
                    <p className="font-display text-2xl md:text-4xl font-black leading-tight tracking-tight">
                        One little dog.
                        <br />
                        A thousand places to dance.
                        <br />
                        <span className="text-[#35a85f]">
                            Same little doggo.
                        </span>
                    </p>
                </div>

            </div>
        </section>
    );
}