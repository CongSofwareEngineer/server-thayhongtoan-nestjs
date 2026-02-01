import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { Parent } from '../parent/schemas/parent.schema'
import { Student } from '../student/schemas/student.schema'

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Parent.name) private parentModel: Model<Parent>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async create(body: any): Promise<any | null> {
    if (!body) {
      return null
    }
    const parentEx:Parent={
      name:'Phan Thị Lan',
      phone: '0123456789',
      address: 'Hà Nội',
      note:'Phụ huynh của học sinh Nguyễn Văn A'
    }

    // 1. Create Parent
    const parent = await FunService.create(this.parentModel, parentEx)

    if (!parent) {
      throw new Error('Failed to create parent')
    }

    // 2. Create Student
    const student = await FunService.create(this.studentModel, {
      name: body.name,
      age: body.age || 10,
      idClass: getIdObject('697ece7d7e900925609a2acb'),
      idParent: parent._id,

    })

    if (!student) {
      throw new Error('Failed to create student')
    }

    return {
      student,
      parent
    }
  }
}
