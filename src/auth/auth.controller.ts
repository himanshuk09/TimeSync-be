import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { updateDto } from './dto/updatedto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileUploadDto } from './dto/UploadImage.dto';
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

  // @UseGuards(JwtAuthGuard)
  // @Get('check-token')
  // async checkToken(@Request() req) {
  //   // If the token is valid, this route will be accessible
  //   return { valid: true };
  // }

  @UseGuards(JwtAuthGuard)
  @Get('check-token')
  async checkToken(@Request() req) {
    // The token is valid if it reaches here, return the user info
    return { message: 'Token is valid', user: req.user };
  }

  @ApiOperation({ summary: 'Upload file with image' })
  @ApiConsumes('multipart/form-data')
  @Post('upload-file')
  @ApiBody({
    type: FileUploadDto,
    required: true,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          const originalName = file.originalname;
          callback(null, originalName);
        },
      }),
    }),
  )
  async uploadFiles(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileUrl = await this.authService.uploadFile(file, req);
    if (fileUrl) {
      return {
        status: true,
        statusText: 'file uploaded',
        message: 'file uploaded',
        fileUrl,
      };
    } else {
      return {
        status: false,
        statusText: 'failed to upload file',
        message: 'failed to upload file',
      };
    }
  }
}
