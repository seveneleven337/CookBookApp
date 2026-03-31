export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-orange-50 flex">
      {/* Permanent sidebar */}
      {/*       <LeftSidebar />
       */}
      {/* This changes based on which child route you visit */}
      {/*       <section className="flex-1 p-10">{children}</section>
       */}{' '}
      <section className="flex-1 p-10">{children}</section>
    </main>
  );
}
