export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main
      className="flex-1 p-2 mt-auto min-h-screen text-white bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg/bg-layouts.jpg')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative mt-10 z-10">
        {children}
      </div>
    </main>
  )
}