// src/stores/stores.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decoretor';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Post()
  create(@Body() dto: CreateStoreDto) {
    return this.storesService.create(dto);
  }
}
