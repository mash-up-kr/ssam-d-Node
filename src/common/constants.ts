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

export const ROOM_CONNECTION_CLOSED_MESSAGE = '상대방이 연결을 끊었습니다.';
export const DELETED_USER_NICKNAME = '키링 은하계를 떠난 자';

export const MY_NICKNAME = '나'
