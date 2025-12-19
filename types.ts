
export enum OrnamentType {
  STAR = 'STAR',
  BALL = 'BALL',
  GIFT = 'GIFT',
  CANDY_CANE = 'CANDY_CANE',
  SNOWMAN = 'SNOWMAN',
  SANTA = 'SANTA',
  REINDEER = 'REINDEER',
  SOCK = 'SOCK',
  BEAR = 'BEAR',
  CRYSTAL_BALL = 'CRYSTAL_BALL'
}

export interface OrnamentData {
  id: string;
  type: OrnamentType;
  position: [number, number, number];
  color: string;
  scale: number;
}

export interface WishResponse {
  message: string;
  author: string;
}
