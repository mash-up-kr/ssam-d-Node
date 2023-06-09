import { ImageColor, ProfileImage } from 'src/types/common';

export const IS_LOCAL = process.env.NODE_ENV === 'local';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

export const PROFILE_IMAGE_LIST: ProfileImage[] = [
  { url: 'https://kr.object.ncloudstorage.com/app-images/assets/img_profile_01.png', color: ImageColor.Purple },
  { url: 'https://kr.object.ncloudstorage.com/app-images/assets/img_profile_02.png', color: ImageColor.Orange },
  { url: 'https://kr.object.ncloudstorage.com/app-images/assets/img_profile_03.png', color: ImageColor.Mint },
  { url: 'https://kr.object.ncloudstorage.com/app-images/assets/img_profile_04.png', color: ImageColor.Green },
  { url: 'https://kr.object.ncloudstorage.com/app-images/assets/img_profile_05.png', color: ImageColor.Pink },
];
