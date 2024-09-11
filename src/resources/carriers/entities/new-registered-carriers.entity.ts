import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NewRegisteredCarriers extends Document {
  @Prop()
  MCNumber: string;

  @Prop()
  Title: string;

  @Prop()
  Published: Date;
}

export const NewRegisteredCarriersSchema = SchemaFactory.createForClass(
  NewRegisteredCarriers,
).set('collection', 'NewRegisteredCarriers');

NewRegisteredCarriersSchema.index({
  MCNumber: 'text',
  Title: 'text',
});
