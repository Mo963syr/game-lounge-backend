import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './table.schema';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Table.name)
    private tableModel: Model<TableDocument>,
  ) {}

  create(dto: CreateTableDto) {
    return this.tableModel.create(dto);
  }

  findAllByStore(storeId: string) {
    return this.tableModel.find({ storeId });
  }

  update(id: string, dto: UpdateTableDto) {
    return this.tableModel.findByIdAndUpdate(id, dto, { new: true });
  }

  changeStatus(id: string, status: 'available' | 'busy') {
    return this.tableModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }

  remove(id: string) {
    return this.tableModel.findByIdAndDelete(id);
  }
}
