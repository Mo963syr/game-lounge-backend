import { Controller, Post, Body, Param, Patch, Get, Req } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  start(@Body() dto, @Req() req) {
    const userId = (req as any).user.userId;
    return this.sessionsService.startSession(dto, userId);
  }

  @Patch(':id/end')
  end(@Param('id') id: string) {
    return this.sessionsService.endSession(id);
  }

  @Get('store/:storeId')
  active(@Param('storeId') storeId: string) {
    return this.sessionsService.findActiveByStore(storeId);
  }
}
