import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
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
  @Post('/login')
  async login(@Res() response, @Body() loginDto: LoginDto): Promise<any> {
    // return this.authService.login(loginDto);
    try {
      const user = await this.authService.login(loginDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'User Login successfully',
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User Not Found',
        error: 'Bad Request',
      });
    }
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
