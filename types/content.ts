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

export interface PastShow {
  title: string;
  description: string;
}

export interface ShowsContent {
  pageContent: {
    title: string;
    pastShowsTitle: string;
  };
  upcomingShows: Show[];
  pastShows: PastShow[];
}

export interface BandMember {
  name: string;
  role: string;
  description: string;
  color: string;
}

export interface Philosophy {
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  pageContent: {
    title: string;
    philosophyTitle: string;
    journeyTitle: string;
  };
  bandMembers: BandMember[];
  philosophy: Philosophy[];
  timeline: TimelineItem[];
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