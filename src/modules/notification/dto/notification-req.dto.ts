import { IsArray, IsString, IsOptional, IsUrl } from 'class-validator';

export class notificationReqDto {
  @IsArray()
  @IsString({ each: true })
  deviceTokenIds: string[];

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
