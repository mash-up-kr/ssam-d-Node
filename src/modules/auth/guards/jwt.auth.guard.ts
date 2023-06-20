import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from '../auth.type';
import { NeedLoginException } from 'src/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new NeedLoginException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request['user'] = payload;
    } catch {
      throw new NeedLoginException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
