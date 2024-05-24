import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import APIFeatures from 'src/utils/apiFeatures.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createSignupBody: SignUpDto): Promise<SignUpDto> {
    const { password } = createSignupBody;
    console.log(createSignupBody);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('password');
    try {
      const user = new this.userModel({
        ...createSignupBody,
        password: hashedPassword,
      });
      console.log('password');
      await user.save();

      const accessToken = await APIFeatures.assignJwtToken(
        user._id,
        this.jwtService,
      );
      user.accessToken = accessToken;
      await user.save();

      return user;
    } catch (error) {
      //handle duplicate email
      if (error.code === 11000) {
        throw new ConflictException('Duplicate email entered 111');
      }
    }
  }

  // login user
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    // const user = await this.userModel.findOne({ email }).select('password');
    if (!user) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    //check if password match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password); //first password is for body and second is from db
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    const accessToken = await APIFeatures.assignJwtToken(
      user._id,
      this.jwtService,
    );
    const res = {
      user,
      accessToken,
    };
    return res;
  }

  //Update user by id  put
  async updateById(id: string, userDetails): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, userDetails, {
      new: true,
      runValidators: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    req: any,
  ): Promise<string | boolean> {
    if (file) {
      const fileUrl =
        req.protocol + '://' + req.headers.host + '/' + file.filename;
      console.log('fileUrl', fileUrl);
      return fileUrl;
    } else {
      return false;
    }
  }
}
