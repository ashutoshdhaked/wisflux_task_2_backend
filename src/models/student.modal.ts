import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Students',
  timestamps: true
})
export class Student extends Model<Student> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dob: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  branch: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  semester: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
  
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}