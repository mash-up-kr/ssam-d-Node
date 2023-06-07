import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from 'src/modules/auth/auth.service';
//import { JwtConfig } from 'src/config/config.constant';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    //const jwtConfig = configService.get<JwtConfig>('jwtConfig');
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      IgnoreExpiration: false,
      //secretOrKey: jwtConfig.jwtRefreshTokenSecret,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return await this.authService.getUserIdIfExist(payload.id);
  }
}
