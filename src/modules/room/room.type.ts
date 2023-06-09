import { ImageColor } from 'src/types/common';

export type RoomData = {
  id: number;
  keywords: string[];
  recentSignalContent: string;
  matchingKeywordCount: number;
  profileImage: string;
  recentSignalMillis: number;
};

export type RoomWithChat = {
  id: number;
  keywords: string[];
  matchingUserName: string;
  matchingUserProfileImage: string;
  chatColor: ImageColor;
  chat: ChatData[];
};

export type ChatData = {
  id: number;
  content: string;
  senderName: string;
  createdAt: number;
};
