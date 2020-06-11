import { DataTypes, Model } from 'sequelize';

export class Customer extends Model {
  /**
   * initialize the model
   * @param sequelize the database
   */
  static initialize (sequelize) {
    Customer.init({
      createdAt: {
        type: DataTypes.DATE,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      id: {
        primaryKey: true,
        type: DataTypes.STRING(36),
        unique: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, {
      modelName: 'customers',
      sequelize,
    });
  }

}
