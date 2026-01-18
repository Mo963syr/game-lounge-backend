import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {  SessionSchema} from './entities/sessions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
