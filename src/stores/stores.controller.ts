import { Controller, Post, Body } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './schemas/store.schema';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }
}
