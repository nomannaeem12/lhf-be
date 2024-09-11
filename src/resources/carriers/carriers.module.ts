import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { CarrierSchema } from './entities/carrier.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './entities/notes.entity';
import { NewRegisteredCarriersSchema } from './entities/new-registered-carriers.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Carrier', schema: CarrierSchema },
      { name: 'Note', schema: NoteSchema },
      { name: 'NewRegisteredCarriers', schema: NewRegisteredCarriersSchema },
    ]),
  ],
  controllers: [CarriersController],
  providers: [CarriersService],
})
export class CarriersModule {}
