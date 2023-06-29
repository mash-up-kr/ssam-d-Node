import { Prisma, PrismaClient } from '@prisma/client';

export type ApiResponse<T = {}> = {
  /**
   * @example success
   */
  message: string;
  data: T;
};

export enum ImageColor {
  Orange = 'orange',
  Green = 'green',
  Pink = 'pink',
  Mint = 'mint',
  Purple = 'purple',
}

export type ProfileImage = {
  url: string;
  color: ImageColor;
};
