export interface Track {
  id: number;
  title: string;
  duration: string;
  src: string;
  album: string;
  year: string;
}

export interface StreamingLink {
  name: string;
  url: string;
}

export interface MusicContent {
  tracks: Track[];
  pageContent: {
    title: string;
    streamingText: string;
    streamingLinks: StreamingLink[];
  };
}

export interface Show {
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  ticketLink: string;
  soldOut: boolean;
}

export interface ShowsContent {
  pageContent: {
    title: string;
  };
  upcomingShows: Show[];
}

export interface BandMember {
  name: string;
  role: string;
  description: string;
  color: string;
}

export interface AboutContent {
  pageContent: {
    title: string;
  };
  bandMembers: BandMember[];
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface SiteContent {
  general: {
    siteTitle: string;
    tagline: string;
    description: string;
  };
  navigation: {
    items: NavigationItem[];
  };
  footer: {
    copyright: string;
    socialLinks: SocialLink[];
  };
}