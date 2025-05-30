export const metadata = {
  title: 'About',
  description: 'Learn more about Two Against Nature - our story, our music, and our journey.',
}

export default function AboutPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">
        About Two Against Nature
      </h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4 leading-relaxed">
            Two Against Nature emerged from the rolling hills and vineyards of Sonoma County, 
            California, where two young musicians found their voices harmonizing against the 
            backdrop of America's heartland. Our sound is rooted in the rich tradition of 
            americana music, but we're not afraid to push boundaries and explore new territories.
          </p>
          <p className="mb-4 leading-relaxed">
            Drawing inspiration from the landscapes that surround us and the stories of the 
            people we meet, our music captures the essence of modern American life while 
            honoring the traditions that came before us. Every song is a journey, every 
            performance a conversation with our audience.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Sound</h2>
          <p className="mb-4 leading-relaxed">
            Our music blends traditional americana instrumentation with contemporary songwriting 
            and production techniques. Acoustic guitars, harmonicas, and heartfelt vocals form 
            the foundation of our sound, while subtle electronic elements and modern arrangements 
            keep things fresh and relevant.
          </p>
          <p className="mb-4 leading-relaxed">
            We believe that great music transcends genres and generations. Whether we're playing 
            an intimate acoustic set in a local coffee shop or performing on a festival stage, 
            our goal is always the same: to connect with our audience through honest, authentic music.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">From Sonoma County</h2>
          <p className="mb-4 leading-relaxed">
            Sonoma County has shaped who we are as artists and as people. The natural beauty 
            of Northern California, the rich agricultural heritage, and the vibrant arts 
            community have all influenced our music in profound ways. We're proud to call 
            this place home and to represent the spirit of our community through our art.
          </p>
          <p className="mb-4 leading-relaxed">
            When we're not touring or recording, you can find us exploring the local music 
            scene, collaborating with other artists, and drawing inspiration from the world 
            around us. We believe that music is meant to be shared, and we're grateful for 
            every opportunity to connect with fellow music lovers.
          </p>
        </div>
      </div>
    </section>
  )
} 