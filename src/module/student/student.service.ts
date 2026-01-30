import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Student } from './schemas/student.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { Model } from 'mongoose'

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.studentModel, query)
  }

  async create(body: any): Promise<Student | null> {
    if (!body) {
      return null
    }
    return FunService.create(this.studentModel, body)
  }

  async delete(id: string): Promise<Student | null> {
    return FunService.deleteDataByID(this.studentModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Student | null> {
    if (!body) {
      return null
    }
    return FunService.updateData(this.studentModel, getIdObject(id), body)
  }

  async getFullInfo(id: string): Promise<Student | null> {
    return this.studentModel.findById(getIdObject(id)).populate(['idClass', 'idParent']).exec()
  }
}
