import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Recipe extends Model {
  public id!: string;
  public userId!: number;
  public mealId!: string;
  public category!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Recipe.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    mealId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'meal_id',
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'recipes',
    underscored: true,
  },
);

export default Recipe;
