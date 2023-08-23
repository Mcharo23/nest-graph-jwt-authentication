import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class FindUserInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;
}
