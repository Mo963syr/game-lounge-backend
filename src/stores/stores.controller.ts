import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './schemas/store.schema';
// src/stores/stores.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decoretor';

@Controller('stores') // الرابط الرئيسي: http://localhost:3000/stores
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post() // إنشاء
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @Post()
  create(@Body() dto: CreateStoreDto) {
    return this.storesService.create(dto);
  }

  @Get() // عرض الكل
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id') // عرض واحد
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id') // تعديل
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id') // حذف ناعم
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}