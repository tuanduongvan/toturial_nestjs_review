import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(user: {
    email: string;
    id: number;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });
    await this.usersService.saveRefreshToken(user.id, refreshToken);
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    };
  }

  async verifyRefreshToken(refreshToken: string): Promise<{
    email: string;
    id: number;
  }> {
    const decoded: { email: string; sub: number } =
      this.jwtService.decode(refreshToken);
    if (decoded) {
      const isverify = await this.usersService.verifyRefreshToken(
        decoded.sub,
        refreshToken,
      );
      if (isverify) {
        return { email: decoded.email, id: decoded.sub };
      }
    }
    return { email: '', id: 0 };
  }
}
