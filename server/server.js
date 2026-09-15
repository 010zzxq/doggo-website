const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3001;
const SOUND_ID = "7664730339339668255";

function getApiKey() {
  return process.env.SOCIALCRAWL_API_KEY;
}

  const line = env
    .split(/\r?\n/)
    .find((line) => line.startsWith("SOCIALCRAWL_API_KEY="));

  return line?.substring("SOCIALCRAWL_API_KEY=".length).trim();

app.get("/api/tiktok", async (req, res) => {
  try {
    const apiKey = getApiKey();

    if (!apiKey || !apiKey.startsWith("sc_")) {
      return res.status(500).json({
        error: "SocialCrawl API key is missing or invalid."
      });
    }

    let allItems = [];
    let cursor = null;
    let hasMore = true;

    // Fetch multiple pages so the 1H / 24H filters
    // have more recent posts to work with.
    for (let page = 0; page < 5 && hasMore; page++) {
      let url =
        `https://www.socialcrawl.dev/v1/tiktok/song/videos?clipId=${SOUND_ID}`;

      if (cursor) {
        url += `&cursor=${encodeURIComponent(cursor)}`;
      }

      const response = await fetch(url, {
        headers: {
          "x-api-key": apiKey
        }
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return res.status(response.status || 500).json({
          error: "Failed to fetch TikTok data."
        });
      }

      if (data.data?.items) {
        allItems.push(...data.data.items);
      }

      hasMore = data.data?.has_more ?? false;
      cursor = data.data?.next_cursor ?? null;

      if (!cursor) {
        break;
      }
    }

    const posts = allItems.map((item) => {
    const post = item.post;

    return {
        username: post?.author?.username ?? "unknown",
        publishedAt: post?.published_at ?? null,
        views: post?.engagement?.views ?? 0,
        likes: post?.engagement?.likes ?? 0,
        comments: post?.engagement?.comments ?? 0,
        shares: post?.engagement?.shares ?? 0,
        saves: post?.engagement?.saves ?? 0,

        // TikTok clip data
        videoId: post?.id ?? null,
        videoUrl: post?.url ?? null,
        coverUrl: post?.cover_url ?? null
    };
});

    const totalViews = posts.reduce(
      (sum, post) => sum + post.views,
      0
    );

    const totalLikes = posts.reduce(
      (sum, post) => sum + post.likes,
      0
    );

    const totalShares = posts.reduce(
      (sum, post) => sum + post.shares,
      0
    );

    res.json({
      posts,
      totalViews,
      totalLikes,
      totalShares,
      hasMore,
      nextCursor: cursor
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch TikTok data."
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `DOGGO TikTok API running on http://localhost:${PORT}`
  );
});