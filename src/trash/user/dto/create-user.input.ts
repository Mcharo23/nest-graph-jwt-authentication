import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsPhoneNumber()
  @Field()
  phoneNumber: string;
}
