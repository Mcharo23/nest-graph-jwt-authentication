import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.schema';
import { FindUserInput } from './dto/find-user.input';
import { UserType } from './entities/user.type';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  findUser(
    @Args('findUserInput') findUserInput: FindUserInput,
  ): Promise<UserType> {
    return this.userService.findUser(findUserInput);
  }

  @Query(() => [UserType])
  async getUsers(): Promise<UserType[]> {
    return await this.userService.getUsers();
  }

  @Mutation(() => UserType)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserType> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserType)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserType> {
    return this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('findUserInput') findUserInput: FindUserInput,
  ): Promise<boolean> {
    const userDeleted = await this.userService.deleteUser(findUserInput);
    if (!userDeleted) {
      throw new NotFoundException(`User not found`);
    }
    return userDeleted;
  }
}
