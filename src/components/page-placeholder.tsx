// Temporary stand-in for pages that haven't been designed yet.
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <main id="main" className="container-site flex flex-1 flex-col gap-4 py-16 sm:py-24">
      <h1>{title}</h1>
      <p className="text-lead text-muted">This page is coming soon.</p>
    </main>
  );
}
