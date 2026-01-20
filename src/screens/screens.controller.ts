import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Post()
  create(@Body() dto: CreateScreenDto) {
    // dto.storeId = '201739361870024';
    return this.screensService.create(dto);
  }

  @Get('store/:storeId')
  findAll(@Param('storeId') storeId: string) {
    return this.screensService.findAllByStore(storeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateScreenDto) {
    return this.screensService.update(id, dto);
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body('status') status: 'available' | 'busy',
  ) {
    return this.screensService.changeStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screensService.delete(id);
  }
}
