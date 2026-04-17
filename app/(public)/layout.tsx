export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex-1 p-2 mt-auto 
    min-h-screen bg-gray-800 text-white">
      {children}
    </main>
  )
}