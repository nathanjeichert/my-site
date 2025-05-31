export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tighter">
          Two Against Nature
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
          A young americana duo from Sonoma County, CA
        </p>
      </div>
      
      <div className="mb-8">
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to the official website of Two Against Nature. We're a young americana duo 
          bringing fresh sounds and heartfelt stories from the heart of Sonoma County, California.
        </p>
        <p className="mb-4 leading-relaxed">
          Our music blends traditional americana with contemporary influences, creating a sound 
          that's both timeless and modern. From intimate acoustic sets to full band performances, 
          we bring passion and authenticity to every show.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Latest News</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Check back soon for updates on new releases, upcoming shows, and behind-the-scenes content.
          </p>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Follow us on social media for the latest updates and exclusive content.
          </p>
        </div>
      </div>
    </section>
  )
}
