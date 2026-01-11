import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Screen, ScreenDocument } from './screen.schema';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Injectable()
export class ScreensService {
  constructor(
    @InjectModel(Screen.name)
    private screenModel: Model<ScreenDocument>,
  ) {}

  create(dto: CreateScreenDto) {
    return this.screenModel.create(dto);
  }

  findAllByStore(storeId: string) {
    return this.screenModel.find({ storeId });
  }

  update(id: string, dto: UpdateScreenDto) {
    return this.screenModel.findByIdAndUpdate(id, dto, { new: true });
  }

  delete(id: string) {
    return this.screenModel.findByIdAndDelete(id);
  }

  changeStatus(id: string, status: 'available' | 'busy') {
    return this.screenModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}
