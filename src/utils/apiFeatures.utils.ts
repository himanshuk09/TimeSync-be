import { JwtService } from '@nestjs/jwt';

export default class APIFeatures {
  static async assignJwtToken(
    userId: string,
    jwtService: JwtService,
  ): Promise<string> {
    const payload = { id: userId };
    const accessToken = await jwtService.sign(payload);
    return accessToken;
  }
}
