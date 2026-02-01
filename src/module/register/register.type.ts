import { Parent } from '../parent/schemas/parent.schema'
import { Student } from '../student/schemas/student.schema'

export interface IRegister {
  parent: Parent,
  students: Student[]
}