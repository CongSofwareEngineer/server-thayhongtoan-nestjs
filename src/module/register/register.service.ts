import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { Parent } from '../parent/schemas/parent.schema'
import { Student } from '../student/schemas/student.schema'
import { IRegister } from './register.type'

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Parent.name) private parentModel: Model<Parent>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) { }

  async create(body: IRegister): Promise<IRegister | null> {
    if (!body) {
      return null
    }

    // 1. Create Parent
    const parent = await FunService.create(this.parentModel, body.parent)

    if (!parent) {
      throw new Error('Failed to create parent')
    }

    // 2. Create Students
    const studentPromises = body.students.map((studentData) => {
      return FunService.create(this.studentModel, {
        ...studentData,
        idParent: parent._id,
      })
    })

    const students = (await Promise.all(studentPromises)).filter((s) => s !== null) as Student[]

    return {
      parent,
      students,
    }
  }
}
