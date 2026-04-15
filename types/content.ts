export interface Show {
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  hasTickets: boolean;
  ticketsUrl?: string;
  soldOut: boolean;
}

export interface ShowsContent {
  pageContent: {
    title: string;
  };
  upcomingShows: Show[];
}
