/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class isUpperCase implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    if (typeof text !== 'string' || text.trim() === '') {
      return true;
    }
    return text === text.toUpperCase();
  }
}

export class CreateUserDto {
  @Validate(isUpperCase, { message: 'Name must be uppercase' })
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsEmail()
  @Length(5, 100)
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
