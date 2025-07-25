import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCleanupService } from './user-cleanup.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCleanupService: UserCleanupService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users from a specific store' })
  findAll(@Query('storeId') storeId: string) {
    return this.userService.findAll(storeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }



  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('cleanup-unverified')
  @ApiOperation({ summary: 'Manually trigger cleanup of unverified users' })
  async cleanupUnverifiedUsers() {
    await this.userCleanupService.manualCleanup();
    return { message: 'Cleanup process completed' };
  }
}
