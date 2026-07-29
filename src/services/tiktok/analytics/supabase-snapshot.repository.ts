import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  AuthorizedCreatorSnapshot,
  CreatorSnapshotRepository,
} from "./snapshot-types";
import { normalizeSnapshotUsername } from "./snapshot-validation";

interface CreatorRow {
  avatar_url: string | null;
  bio_description: string | null;
  display_name: string | null;
  follower_count: number | null;
  following_count: number | null;
  id: number;
  is_verified: boolean | null;
  likes_count: number | null;
  source_account_id: string | null;
  username: string;
  video_count: number | null;
}

interface SnapshotRow {
  captured_at: string;
  id: number;
  window_end: string;
  window_start: string;
}

interface PostRow {
  comment_count: number;
  description: string | null;
  like_count: number;
  published_at: string;
  share_count: number;
  share_url: string | null;
  tiktok_post_id: string;
  view_count: number;
}

export class SupabaseCreatorSnapshotRepository implements CreatorSnapshotRepository {
  constructor(private readonly client: SupabaseClient) {}

  async findLatest(username: string) {
    const creatorResult = await this.client
      .from("tiktok_creators")
      .select(
        "id,username,display_name,avatar_url,bio_description,is_verified,follower_count,following_count,likes_count,video_count,source_account_id",
      )
      .eq("username", normalizeSnapshotUsername(username))
      .maybeSingle<CreatorRow>();

    if (creatorResult.error) {
      throw creatorResult.error;
    }
    if (!creatorResult.data) {
      return null;
    }

    const snapshotResult = await this.client
      .from("tiktok_creator_snapshots")
      .select("id,captured_at,window_start,window_end")
      .eq("creator_id", creatorResult.data.id)
      .order("captured_at", { ascending: false })
      .limit(1)
      .maybeSingle<SnapshotRow>();

    if (snapshotResult.error) {
      throw snapshotResult.error;
    }
    if (!snapshotResult.data) {
      return null;
    }

    const postsResult = await this.client
      .from("tiktok_post_snapshots")
      .select(
        "tiktok_post_id,published_at,description,share_url,view_count,like_count,comment_count,share_count",
      )
      .eq("snapshot_id", snapshotResult.data.id)
      .order("published_at", { ascending: false })
      .returns<PostRow[]>();

    if (postsResult.error) {
      throw postsResult.error;
    }

    return this.toSnapshot(creatorResult.data, snapshotResult.data, postsResult.data);
  }

  async save(snapshot: AuthorizedCreatorSnapshot) {
    const result = await this.client.rpc("store_tiktok_creator_snapshot", {
      payload: snapshot,
    });

    if (result.error) {
      throw result.error;
    }
  }

  private toSnapshot(
    creator: CreatorRow,
    snapshot: SnapshotRow,
    posts: PostRow[],
  ): AuthorizedCreatorSnapshot {
    return {
      capturedAt: snapshot.captured_at,
      creator: {
        avatarUrl: creator.avatar_url ?? undefined,
        bioDescription: creator.bio_description ?? undefined,
        displayName: creator.display_name ?? undefined,
        followerCount: creator.follower_count ?? undefined,
        followingCount: creator.following_count ?? undefined,
        isVerified: creator.is_verified ?? undefined,
        likesCount: creator.likes_count ?? undefined,
        sourceAccountId: creator.source_account_id ?? undefined,
        username: creator.username,
        videoCount: creator.video_count ?? undefined,
      },
      posts: posts.map((post) => ({
        comments: post.comment_count,
        description: post.description ?? undefined,
        id: post.tiktok_post_id,
        likes: post.like_count,
        publishedAt: post.published_at,
        shareUrl: post.share_url ?? undefined,
        shares: post.share_count,
        views: post.view_count,
      })),
      sourceAccess: "creator_authorized",
      sourceProvider: "tiktok_display_api",
      windowEnd: snapshot.window_end,
      windowStart: snapshot.window_start,
    };
  }
}
