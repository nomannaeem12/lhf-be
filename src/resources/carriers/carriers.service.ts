import { Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { Model } from 'mongoose';
import { Carrier } from './entities/carrier.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarriersService {
  constructor(
    @InjectModel(Carrier.name) private carrierModel: Model<Carrier>,
  ) {}
  create(createCarrierDto: CreateCarrierDto) {
    return 'This action adds a new carrier';
  }

  findAll() {
    return `This action returns all carriers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrier`;
  }

  update(id: number, updateCarrierDto: UpdateCarrierDto) {
    return `This action updates a #${id} carrier`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrier`;
  }

  async getFilteredCarriers(
    page = 1,
    pageSize = 10,
    searchText?: string,
    sortField?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{ carriers: Carrier[]; totalCount: number }> {
    const skip = page * pageSize;

    let searchQuery: any = {};
    if (searchText) {
      searchQuery = { $text: { $search: `"${searchText}"` } };
    }

    const sortOptions: any = {};
    if (sortField) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    const totalCount = await this.carrierModel.countDocuments(searchQuery);

    const carriers = await this.carrierModel
      .find(searchQuery)
      .populate({
        path: 'notes',
        model: 'Note',
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .exec();

    return { carriers, totalCount };
  }
}
