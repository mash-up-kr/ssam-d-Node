import { ImageColor } from 'src/types/common';
import { PROFILE_IMAGE_LIST } from './constants';

export const getRandomProfileImageURL = (): string => {
  const randomValue = Math.random();
  return PROFILE_IMAGE_LIST[Math.floor(randomValue * PROFILE_IMAGE_LIST.length)].url;
};

export const getImageColor = (imageUrl: string): ImageColor => {
  const matchingImage = PROFILE_IMAGE_LIST.find(image => image.url === imageUrl);
  return matchingImage.color;
};
