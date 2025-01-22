import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Admin} from 'src/models/admin.modal';
import { Student } from 'src/models/student.modal';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_DATABASE || 'Student_Management',
      autoLoadModels: true,
      synchronize: false,
      models: [Admin,Student],
      define: {
        timestamps: true,
        freezeTableName: true
      }
    }),
  ],
})
export class DatabaseModule {}