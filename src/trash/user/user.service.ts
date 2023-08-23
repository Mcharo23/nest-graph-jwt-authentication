import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.schema';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findUser(findUserInput: FindUserInput): Promise<User> {
    const user = await this.userModel.findOne({
      firstName: findUserInput.firstName,
    });
    if (!user) {
      throw new NotFoundException(
        `User with first name ${findUserInput.firstName} not found`,
      );
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      const user = await this.userModel.create({
        ...createUserInput,
      });

      return user;
    } catch (error) {
      throw new BadRequestException('Invalid input data');
    }
  }

  async updateUser(updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findOne({
      firstName: updateUserInput.firstName,
    });

    if (!user) {
      throw new NotFoundException(
        `User with first name ${updateUserInput.firstName} not found`,
      );
    }

    user.lastName = updateUserInput.lastName;
    return await user.save();
  }

  async deleteUser(findUserInput: FindUserInput): Promise<boolean> {
    const { firstName } = findUserInput;
    const result = await this.userModel.deleteOne({ firstName }).exec();

    return result.deletedCount > 0;
  }
}
