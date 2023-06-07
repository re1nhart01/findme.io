export interface Coords {
  x: number;
  y: number;
}

export interface MatchesFiltering {
  'by_interests': boolean;
  'by_tags': boolean;
  'by_coords': boolean;
  'by_birthday': boolean;
  'by_gender': boolean
  'by_relation': boolean;
  'distance': number;
  'years': number;
}
