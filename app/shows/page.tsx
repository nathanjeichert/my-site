export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Two Against Nature.',
}

export default function ShowsPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">
        Upcoming Shows
      </h1>
      
      <div className="mb-8">
        <p className="text-lg leading-relaxed">
          No upcoming shows scheduled at this time. Check back soon for updates!
        </p>
      </div>
    </section>
  )
} 