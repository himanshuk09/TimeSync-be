import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { updateDto } from './dto/updatedto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Register a new user
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpDto> {
    return this.authService.signUp(signUpDto);
  }

  //login
  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }

  //update
  @Put(':id')
  async UpdateUserDetails(
    @Param('id') id: string,
    @Body() restaurant: updateDto,
  ): Promise<User> {
    return this.authService.updateById(id, restaurant);
  }
}
