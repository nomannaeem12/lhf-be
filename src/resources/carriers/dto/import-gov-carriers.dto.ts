import {
  IsArray,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Transform, Type } from 'class-transformer';

@ValidatorConstraint({ name: 'containsMC', async: false })
export class ContainsMCConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.includes('MC');
  }

  defaultMessage(args: ValidationArguments) {
    return 'MCNumber must contain the string "MC"';
  }
}

export class importGovCarrierDTO {
  @IsNotEmpty()
  @Transform(({ value }) => value.replace('MC-', '').replace('-C', '').trim())
  MCNumber: string;

  @IsNotEmpty()
  Title: string;

  @IsNotEmpty()
  Published: string;
}

export class ImportGovCarriersDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => importGovCarrierDTO)
  importGovCarriersDTO: importGovCarrierDTO[];
}
