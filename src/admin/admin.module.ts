import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from 'src/models/admin.modal';
import { AdminController } from './admin.controller';
import { PasswordHelper } from 'src/helper/bcryptpassword';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin,]),
  ],
  providers: [AdminService,PasswordHelper,JwtService],
  controllers: [AdminController]
})
export class AdminModule {}
