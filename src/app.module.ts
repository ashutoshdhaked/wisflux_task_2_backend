import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './dbConfig.module';

@Module({
  imports: [DatabaseModule,AdminModule,StudentModule],
})
export class AppModule {}
