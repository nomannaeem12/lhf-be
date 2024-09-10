import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { CarrierSchema } from './entities/carrier.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './entities/notes.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Carrier', schema: CarrierSchema },
      { name: 'Note', schema: NoteSchema },
    ]),
  ],
  controllers: [CarriersController],
  providers: [CarriersService],
})
export class CarriersModule {}
