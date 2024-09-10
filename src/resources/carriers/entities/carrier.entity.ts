import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Carrier extends Document implements Carrier {
  @Prop()
  'BIPD On File': number;

  @Prop()
  'Bond Surety On File': string;

  @Prop()
  'Business City': string;

  @Prop()
  'Business Phone': string;

  @Prop()
  'Business State': string;

  @Prop()
  'Cargo On File': string;

  @Prop()
  'Cell Phone': string;

  @Prop()
  'Company Representative 1': string;

  @Prop()
  'Company Representative 2': string;

  @Prop()
  'DBA Name': string;

  @Prop()
  'DOT Number': number;

  @Prop()
  'Docket Number': string;

  @Prop()
  'Email Address': string;

  @Prop({ index: true })
  'Total Number Of Trucks': number;

  @Prop({ index: true })
  'Total Number Of Power Units': number;

  @Prop()
  'Legal Name': string;

  @Prop()
  'Safety Rating Code': string;

  @Prop()
  'Safety Rating Effective Date': string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Note' }] })
  notes: Types.ObjectId[];
}
export const CarrierSchema = SchemaFactory.createForClass(Carrier);

CarrierSchema.index({
  'Bond Surety On File': 'text',
  'Business City': 'text',
  'Business Phone': 'text',
  'Business State': 'text',
  'Cargo On File': 'text',
  'Cell Phone': 'text',
  'Company Representative 1': 'text',
  'Company Representative 2': 'text',
  'DBA Name': 'text',
  'Docket Number': 'text',
  'Email Address': 'text',
  'Legal Name': 'text',
  'Safety Rating Code': 'text',
  'Safety Rating Effective Date': 'text',
  'Total Number Of Power Units': 1,
  'Total Number Of Trucks': 1,
});
