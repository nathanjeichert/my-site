export const metadata = {
  title: 'Shows',
  description: 'Upcoming concerts and events for Two Against Nature.',
}

// Sample upcoming shows data
const upcomingShows = [
  {
    id: 1,
    date: '2024-06-15',
    venue: 'The Mystic Theatre',
    location: 'Petaluma, CA',
    time: '8:00 PM',
    ticketUrl: '#',
    description: 'An intimate evening of americana music in historic downtown Petaluma.'
  },
  {
    id: 2,
    date: '2024-06-28',
    venue: 'Sonoma County Fair',
    location: 'Santa Rosa, CA',
    time: '7:30 PM',
    ticketUrl: '#',
    description: 'Main stage performance at the annual Sonoma County Fair.'
  },
  {
    id: 3,
    date: '2024-07-12',
    venue: 'Russian River Brewing Company',
    location: 'Santa Rosa, CA',
    time: '6:00 PM',
    ticketUrl: '#',
    description: 'Acoustic set on the outdoor patio. Food and craft beer available.'
  },
  {
    id: 4,
    date: '2024-07-25',
    venue: 'Healdsburg Jazz Festival',
    location: 'Healdsburg, CA',
    time: '4:00 PM',
    ticketUrl: '#',
    description: 'Special guest performance at the annual jazz festival.'
  }
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function ShowsPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">
        Upcoming Shows
      </h1>
      
      <div className="mb-8">
        <p className="text-lg leading-relaxed mb-4">
          Join us for live performances throughout Sonoma County and beyond. 
          Each show is a unique experience where we connect with our audience 
          through music and storytelling.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          For booking inquiries, please contact us through our social media channels.
        </p>
      </div>

      <div className="space-y-6">
        {upcomingShows.map((show) => (
          <div 
            key={show.id}
            className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{show.venue}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                  {show.location}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatDate(show.date)}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{show.time}</p>
              </div>
            </div>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {show.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Get Tickets
              </button>
              <button className="border border-neutral-300 dark:border-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
        <p className="mb-4">
          Don't miss out on new show announcements! Follow us on social media 
          or sign up for our newsletter to be the first to know about upcoming performances.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-black"
          />
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
} 