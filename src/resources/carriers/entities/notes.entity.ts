import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop()
  note: string;

  @Prop()
  timestamp: Date;

  @Prop({ isRequired: true })
  authorId: string;

  @Prop({ type: Types.ObjectId, ref: 'Carrier', required: true })
  carrierId: {
    type: Types.ObjectId;
    ref: 'Carrier';
    required: true;
  };
}

// Create the schema
export const NoteSchema = SchemaFactory.createForClass(Note);
