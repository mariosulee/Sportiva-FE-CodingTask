export type Team = {
  name: string;
  officialName: string;
  slug: string;
  abbreviation: string;
  teamCountryCode: string;
  stagePosition: number | null;
};

export type Event = {
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: string;
  stadium: string | null;
  homeTeam: Team | null;
  awayTeam: Team | null;
  result: {
    homeGoals: number;
    awayGoals: number;
    winner: string | null;
    message: string | null;
  } | null;
  stage: {
    id: string;
    name: string;
    ordering: number;
  };
  group: string | null;
  originCompetitionId: string;
  originCompetitionName: string;
  sport: string;
};
