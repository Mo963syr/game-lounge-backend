import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store, StoreSchema } from './schemas/store.schema';

@Module({
  imports: [
    // تسجيل الـ Schema في هذا الموديول
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './entities/store.entity';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
  imports: [ MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]) , UsersModule  ],
})
export class StoresModule {}