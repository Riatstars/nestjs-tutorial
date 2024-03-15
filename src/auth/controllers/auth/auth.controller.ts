import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';

import { Request as ExRequest } from 'express';
import { LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session.id);
    console.log(session);
    session.authenticated = true;
    return session;
  }

  @Get('status')
  async getAuthStatus(@Request() req: ExRequest) {
    // console.log(req.sessionStore)
    // return req.session.cookie
    // Cant get req.user to work like in the video.
    // stop here at NestJS Tutorial #14
  }
}
