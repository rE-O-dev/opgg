type JsonArrayType = Array<{
  [key: string]: any;
}>

type PlayerType = {
  ladderRank: {
    [key: string]: number;
  };
  leagues: JsonArrayType;
  level: number;
  name: string;
  previousTiers: JsonArrayType;
  profileBackgroundImageUrl: string;
  profileBorderImageUrl: string;
  profileImageUrl: string;
  url: string;
} | null;

type MostType = {
  champions: JsonArrayType;
  recentWinRate: JsonArrayType;
} | null;

type MatchListType = {
  champions: JsonArrayType;
  games: JsonArrayType;
  positions: JsonArrayType;
  summary: {
    assists: number;
    deaths: number;
    kills: number;
    losses: number;
    wins: number;
  }
} | null;

type ItemListType = {
  data: {
    [key: string]: {
      description: string;
      gold: {
        base: number;
        sell: number;
        total: number;
      };
      name: string;
      plaintext: string;
    }
  }
} | null;
