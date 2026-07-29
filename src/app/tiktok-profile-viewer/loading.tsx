export default function ProfileViewerLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-sand">
      <div className="h-[72px] border-b border-ink/10 bg-cream" />
      <section className="border-b border-ink/10 bg-cream py-14">
        <div className="container">
          <div className="h-4 w-48 rounded-full bg-ink/10" />
          <div className="mt-8 h-12 w-full max-w-xl rounded-2xl bg-ink/10" />
          <div className="mt-4 h-6 w-full max-w-2xl rounded-xl bg-ink/10" />
          <div className="mt-8 h-20 w-full max-w-3xl rounded-[22px] bg-white" />
        </div>
      </section>
      <section className="container py-10">
        <div className="h-80 rounded-[28px] border border-ink/10 bg-white" />
      </section>
      <span className="sr-only">Loading TikTok profile viewer</span>
    </main>
  );
}
