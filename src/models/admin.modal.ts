import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Admins',
  timestamps: true,
})
export class Admin extends Model<Admin> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname: string;

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
  password: string;

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
