import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @IsNotEmpty()
  @Prop()
  firstName: string;

  @IsNotEmpty()
  @Prop()
  lastName: string;

  @IsNotEmpty()
  @Prop()
  email: string;

  @IsNotEmpty()
  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
