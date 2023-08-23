import { IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @Field(() => String)
  lastName: string;
}
