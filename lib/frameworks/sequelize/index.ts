import { Framework, ProjectType } from '@lib/core/framework'
import { generateSequelizeProject } from './project'

export const SequelizeFramework: Framework = class {
  static displayName = (): string => 'Sequelize'
  static projectType = (): ProjectType => ProjectType.Npm
  static generate = generateSequelizeProject
}
