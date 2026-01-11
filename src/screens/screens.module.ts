import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import { Screen, ScreenSchema } from './screen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Screen.name, schema: ScreenSchema },
    ]),
  ],
  controllers: [ScreensController],
  providers: [ScreensService],
})
export class ScreensModule {}
