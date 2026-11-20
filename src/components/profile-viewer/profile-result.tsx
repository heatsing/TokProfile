import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clapperboard,
  Heart,
  LockKeyhole,
  Search,
  UserPlus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  AVAILABLE_PROFILE_VIEW_TABS,
  createProfileTabHref,
  PROFILE_VIEW_TABS,
  type ProfileViewTab,
  type ProfileViewerState,
} from "@/lib/profile-viewer";
import type { TikTokProfile } from "@/types/tiktok";
import { formatCompactNumber, formatExactNumber } from "@/utils/format-number";

const tabLabels: Record<ProfileViewTab, string> = {
  followers: "Followers",
  following: "Following",
  liked: "Liked Videos",
  overview: "Overview",
  reposts: "Reposts",
};

const metricDefinitions = [
  { icon: Users, key: "followers", label: "Followers" },
  { icon: UserPlus, key: "following", label: "Following" },
  { icon: Heart, key: "likes", label: "Likes" },
  { icon: Clapperboard, key: "posts", label: "Video count" },
] as const;

function ProfileAvatar({ profile }: { profile: TikTokProfile }) {
  return (
    <div
      aria-label={`${profile.username} avatar`}
      role="img"
      className="grid size-24 shrink-0 place-items-center rounded-[30px] border-4 border-white bg-acid bg-cover bg-center shadow-lift"
      style={
        profile.avatarUrl ? { backgroundImage: `url("${profile.avatarUrl}")` } : undefined
      }
    >
      {profile.avatarUrl ? null : (
        <span className="font-display text-3xl font-extrabold uppercase text-ink">
          {profile.username.slice(0, 1)}
        </span>
      )}
    </div>
  );
}

function ProfileTabs({ activeTab, input }: { activeTab: ProfileViewTab; input: string }) {
  return (
    <nav
      aria-label="Profile result sections"
      className="mt-8 flex gap-1 overflow-x-auto border-b border-ink/10"
    >
      {PROFILE_VIEW_TABS.map((tab) => {
        const available = AVAILABLE_PROFILE_VIEW_TABS.includes(tab);
        const className = `relative min-h-12 shrink-0 px-4 py-3 text-sm font-bold ${
          activeTab === tab ? "text-ink" : "text-ink/40"
        }`;

        return available ? (
          <Link
            key={tab}
            aria-current={activeTab === tab ? "page" : undefined}
            href={createProfileTabHref(input, tab)}
            className={`${className} transition-colors hover:text-ink`}
          >
            {tabLabels[tab]}
            {activeTab === tab ? (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-pine" />
            ) : null}
          </Link>
        ) : (
          <span
            key={tab}
            aria-disabled="true"
            title="Available after public data is connected"
            className={`${className} cursor-not-allowed`}
          >
            {tabLabels[tab]}
            <span className="ml-1.5 text-[9px] font-extrabold uppercase tracking-wide text-[#a13c0d]">
              Soon
            </span>
          </span>
        );
      })}
    </nav>
  );
}

function OverviewPanel({ profile }: { profile: TikTokProfile }) {
  return (
    <div className="pt-6">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metricDefinitions.map((metric) => {
          const value = profile.counts?.[metric.key];
          return (
            <div
              key={metric.key}
              className="rounded-2xl border border-ink/10 bg-sand p-4 sm:p-5"
            >
              <metric.icon className="size-4 text-pine" aria-hidden="true" />
              <dd
                className="mt-5 font-display text-2xl font-extrabold"
                title={value === undefined ? "Unavailable" : formatExactNumber(value)}
              >
                {value === undefined ? "—" : formatCompactNumber(value)}
              </dd>
              <dt className="mt-1 text-xs font-semibold text-ink/50">{metric.label}</dt>
            </div>
          );
        })}
      </dl>
      <p className="mt-4 text-xs leading-5 text-ink/45">
        A dash means the metric is not available from the current public source. It does
        not mean zero.
      </p>
    </div>
  );
}

function ProfileCard({
  activeTab,
  input,
  profile,
}: {
  activeTab: ProfileViewTab;
  input: string;
  profile: TikTokProfile;
}) {
  return (
    <section
      aria-labelledby="profile-result-title"
      className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-lift sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <ProfileAvatar profile={profile} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="profile-result-title"
              className="break-all font-display text-3xl font-extrabold tracking-[-0.04em]"
            >
              @{profile.username}
            </h2>
            {profile.verified ? (
              <CheckCircle2
                aria-label="Verified profile"
                className="size-5 fill-pine text-white"
              />
            ) : null}
          </div>
          {profile.displayName ? (
            <p className="mt-1 text-sm font-semibold text-ink/60">
              {profile.displayName}
            </p>
          ) : null}
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">
            {profile.bio || "Bio unavailable from the current public source."}
          </p>
        </div>
        <Badge className="self-start bg-emerald-50 text-emerald-800">
          {profile.source.status === "available" ? "Public profile" : "Source pending"}
        </Badge>
      </div>

      <ProfileTabs activeTab={activeTab} input={input} />

      {activeTab === "overview" ? <OverviewPanel profile={profile} /> : null}
    </section>
  );
}

export function ProfileViewerResult({
  activeTab,
  input,
  state,
}: {
  activeTab: ProfileViewTab;
  input: string;
  state: ProfileViewerState;
}) {
  if (state.status === "empty") {
    return (
      <section className="rounded-[28px] border border-dashed border-ink/20 bg-white/70 px-6 py-14 text-center sm:py-20">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-sand text-pine">
          <Search className="size-6" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold">
          Start with a public profile
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink/55">
          Enter a TikTok username or profile URL above. Profile details will appear in
          this workspace.
        </p>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <div>
        <ProfileTabs activeTab={activeTab} input={input} />
        <section
          aria-labelledby="profile-error-title"
          className="mt-6 rounded-[28px] border border-amber-500/25 bg-amber-50 p-6 sm:p-8"
        >
          <AlertTriangle className="size-7 text-amber-700" aria-hidden="true" />
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-amber-800">
            {state.error.code.replaceAll("_", " ")}
          </p>
          <h2
            id="profile-error-title"
            className="mt-2 font-display text-2xl font-extrabold"
          >
            We could not open this profile.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
            {state.error.message}
          </p>
        </section>
      </div>
    );
  }

  if (state.status === "private") {
    return (
      <div>
        <ProfileTabs activeTab={activeTab} input={input} />
        <section
          aria-labelledby="private-profile-title"
          className="mt-6 rounded-[28px] bg-ink p-6 text-white sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <ProfileAvatar profile={state.profile} />
            <div>
              <LockKeyhole className="size-6 text-acid" aria-hidden="true" />
              <h2
                id="private-profile-title"
                className="mt-4 font-display text-2xl font-extrabold"
              >
                @{state.profile.username} is private
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                TokProfile does not bypass private account settings. Profile metrics,
                videos and analytics remain unavailable.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return <ProfileCard activeTab={activeTab} input={input} profile={state.profile} />;
}
