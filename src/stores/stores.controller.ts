import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores') // الرابط الرئيسي: http://localhost:3000/stores
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post() // إنشاء
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
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