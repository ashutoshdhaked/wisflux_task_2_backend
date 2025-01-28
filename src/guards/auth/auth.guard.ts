import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies; 
    const token = cookies['student_Management_token'];  
  // console.log("token is like : "+ JSON.stringify(token));  
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    return true; 
  }
}
