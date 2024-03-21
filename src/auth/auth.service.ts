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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // // Register User
  // async signUp(signUpDto: SignUpDto): Promise<User> {
  //   const { name, email, username, password, role } = signUpDto;
  //   console.log(signUpDto);
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword);
  //   try {
  //     const user = await this.userModel.create({
  //       name,
  //       email,
  //       password,
  //       username,
  //       role,
  //     });
  //     console.log('data', user);
  //     return user;
  //   } catch (error) {
  //     //handle duplicate email
  //     if (error.code === 11000) {
  //       throw new ConflictException('Duplicate email entered');
  //     }
  //   }
  // }

  async signUp(createSignupBody: SignUpDto): Promise<any> {
    const { name, email, username, password, role } = createSignupBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = new this.userModel({
        name,
        email,
        password: hashedPassword,
        username,
        role,
      });
      await user.save();
      return user;
    } catch (error) {
      //handle duplicate email
      if (error.code === 11000) {
        throw new ConflictException('Duplicate email entered');
      }
    }
  }

  // login user
  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select('password');
    if (!user) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    //check if password match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password); //first password is for body and second is from db
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email address or password');
    }
    return user;
  }

  //Update restaurants by id  put
  async updateById(id: string, userDetails): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, userDetails, {
      new: true,
      runValidators: true,
    });
  }
}
