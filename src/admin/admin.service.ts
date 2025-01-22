import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from 'src/models/admin.modal';
import { PasswordHelper } from '../helper/bcryptpassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
    private readonly passwordHelper: PasswordHelper,
    private jwtService: JwtService,
  ) {}

  async create(adminData: Partial<Admin>): Promise<Admin> {
    if (!adminData.fullname) {
      throw new Error('Name is required');
    }
    if (!adminData.password) {
      throw new Error('Password is required');
    }

    const completeData = {
      ...adminData,
      fullname: adminData.fullname,
      password: adminData.password,
    } as Admin;

    completeData.password = await this.passwordHelper.hashPassword(
      completeData.password,
    );
    return await this.adminModel.create(completeData);
  }

  async singIn(adminData , response): Promise<string> {
    if (!adminData.password) {
      throw new Error('Password is required');
    }
    if (!adminData.email) {
      throw new Error('Email is required');
    }

    const completeData = {
      password: adminData.password,
      email: adminData.email,
    } as Admin;

    const admin = await this.adminModel.findOne({
        where: { email: completeData.email },
      });
 
      if (!admin) {
        throw new Error('Admin not found');
      }
    const comparePass = await this.passwordHelper.comparePasswords(completeData.password , admin.password);
    console.log({comparePass});
    
    if(!comparePass){
        return "Password Incorrect !!";
    }  
       
    const payload = { email: admin.email};
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: 7*24*60*60,
      secret: process.env.JWT_SECRET,
    });
    response.cookie('access_token', access_token, {
        httpOnly: true,
      });

    return 'Successfully login !!';
  }
}
