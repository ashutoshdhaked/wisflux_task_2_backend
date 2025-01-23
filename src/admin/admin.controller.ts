import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/models/admin.modal';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('register')
  async create(@Body() adminData: Partial<Admin>): Promise<Admin> {
    return this.adminService.create(adminData);
  }

  @Post('signin')
  async signIn(
    @Body() body: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string; message: string; name: string }> {
    return this.adminService.singIn(body, response);
  }
}
