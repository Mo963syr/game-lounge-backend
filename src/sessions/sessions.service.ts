import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './entities/sessions.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<Session>,
  ) {}

  startSession(
    dto: CreateSessionDto,
    userId: string,
  ) {
    const startedAt = new Date();
    const expiresAt = new Date(
      startedAt.getTime() + dto.sessionTime * 60 * 1000,
    );

    return this.sessionModel.create({
      ...dto,
      userId,
      createdBy: userId,
      startedAt,
      expiresAt,
      pricingSnapshot: {
        hourlyPrice: 10000,
        currency: 'SYP',
      },
    });
  }

  endSession(id: string) {
    return this.sessionModel.findByIdAndUpdate(
      id,
      {
        endedAt: new Date(),
        status: 'ENDED',
      },
      { new: true },
    );
  }

  findActiveByStore(storeId: string) {
    return this.sessionModel.find({
      storeId,
      status: 'ACTIVE',
    });
  }
}
