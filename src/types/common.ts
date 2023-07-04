export type ApiResponse<T = {}> = {
  /**
   * @example success
   */
  message: string;
  data: T;
};

export enum ImageColor {
  Orange = 'ORANGE',
  Green = 'GREEN',
  Pink = 'PINK',
  Mint = 'MINT',
  Purple = 'PURPLE',
}

export type ProfileImage = {
  url: string;
  color: ImageColor;
};
