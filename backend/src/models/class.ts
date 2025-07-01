import
  {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";
import sequelize from "../db";
import { classLevel, classLevels, Teacher } from "~/shared/types/types";

class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare level: classLevel;
  declare formTeacher: Teacher;
}

Class.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM(...classLevels),
      allowNull: false,
    },
    formTeacher: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "class"
  }
);

export default Class;
