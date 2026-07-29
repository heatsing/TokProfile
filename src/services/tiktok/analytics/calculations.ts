export interface AnalyticsPostInput {
  comments: number;
  description?: string;
  id: string;
  likes: number;
  publishedAt: string;
  shareUrl?: string;
  shares: number;
  views: number;
}

export interface CreatorAnalyticsInput {
  posts: AnalyticsPostInput[];
  username: string;
  windowEnd: string;
  windowStart: string;
}

export interface EstimatedMetric {
  estimated: true;
  formula: string;
  officialTikTokData: false;
  sampleSize: number;
  unit: "percent" | "posts_per_week" | "views" | "likes";
  value: number | null;
}

export interface RankedAnalyticsPost extends AnalyticsPostInput {
  engagementRate: number | null;
}

export interface CreatorAnalyticsReport {
  disclosure: {
    estimated: true;
    methodologyVersion: "1.0";
    officialTikTokData: false;
  };
  metrics: {
    averageLikes: EstimatedMetric;
    averageViews: EstimatedMetric;
    engagementRate: EstimatedMetric;
    postingFrequency: EstimatedMetric;
  };
  period: {
    end: string;
    start: string;
  };
  postCount: number;
  topPerformingPosts: RankedAnalyticsPost[];
  username: string;
}

const FORMULAS = {
  averageLikes: "Total likes across sampled posts ÷ Number of sampled posts",
  averageViews: "Total views across sampled posts ÷ Number of sampled posts",
  engagementRate:
    "(Total likes + comments + shares across sampled posts) ÷ Total views × 100",
  postingFrequency: "Number of sampled posts ÷ Observed days × 7",
} as const;

function assertValidCount(value: number, field: string) {
  if (!Number.isFinite(value) || !Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${field} must be a non-negative safe integer.`);
  }
}

function parseDate(value: string, field: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`${field} must be a valid date.`);
  }

  return date;
}

function round(value: number, precision = 2) {
  const multiplier = 10 ** precision;
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}

function metric(
  value: number | null,
  formula: string,
  sampleSize: number,
  unit: EstimatedMetric["unit"],
): EstimatedMetric {
  return {
    estimated: true,
    formula,
    officialTikTokData: false,
    sampleSize,
    unit,
    value,
  };
}

export function calculatePostEngagementRate(
  post: Pick<AnalyticsPostInput, "comments" | "likes" | "shares" | "views">,
) {
  assertValidCount(post.likes, "likes");
  assertValidCount(post.comments, "comments");
  assertValidCount(post.shares, "shares");
  assertValidCount(post.views, "views");

  if (post.views === 0) {
    return null;
  }

  return round(((post.likes + post.comments + post.shares) / post.views) * 100);
}

export function calculateCreatorAnalytics(
  input: CreatorAnalyticsInput,
): CreatorAnalyticsReport {
  const start = parseDate(input.windowStart, "windowStart");
  const end = parseDate(input.windowEnd, "windowEnd");

  if (end < start) {
    throw new RangeError("windowEnd must be on or after windowStart.");
  }

  for (const post of input.posts) {
    assertValidCount(post.views, "views");
    assertValidCount(post.likes, "likes");
    assertValidCount(post.comments, "comments");
    assertValidCount(post.shares, "shares");
    parseDate(post.publishedAt, "publishedAt");
  }

  const postCount = input.posts.length;
  const totals = input.posts.reduce(
    (result, post) => ({
      comments: result.comments + post.comments,
      likes: result.likes + post.likes,
      shares: result.shares + post.shares,
      views: result.views + post.views,
    }),
    { comments: 0, likes: 0, shares: 0, views: 0 },
  );
  const observedDays = Math.max(
    1,
    Math.floor((end.getTime() - start.getTime()) / 86_400_000) + 1,
  );
  const engagementActions = totals.likes + totals.comments + totals.shares;

  const topPerformingPosts = input.posts
    .map((post) => ({
      ...post,
      engagementRate: calculatePostEngagementRate(post),
    }))
    .sort((a, b) => {
      const rateDifference = (b.engagementRate ?? -1) - (a.engagementRate ?? -1);
      return rateDifference || b.views - a.views;
    })
    .slice(0, 5);

  return {
    disclosure: {
      estimated: true,
      methodologyVersion: "1.0",
      officialTikTokData: false,
    },
    metrics: {
      averageLikes: metric(
        postCount ? round(totals.likes / postCount) : null,
        FORMULAS.averageLikes,
        postCount,
        "likes",
      ),
      averageViews: metric(
        postCount ? round(totals.views / postCount) : null,
        FORMULAS.averageViews,
        postCount,
        "views",
      ),
      engagementRate: metric(
        totals.views ? round((engagementActions / totals.views) * 100) : null,
        FORMULAS.engagementRate,
        postCount,
        "percent",
      ),
      postingFrequency: metric(
        postCount ? round((postCount / observedDays) * 7) : null,
        FORMULAS.postingFrequency,
        postCount,
        "posts_per_week",
      ),
    },
    period: {
      end: input.windowEnd,
      start: input.windowStart,
    },
    postCount,
    topPerformingPosts,
    username: input.username,
  };
}

export { FORMULAS as CREATOR_ANALYTICS_FORMULAS };
