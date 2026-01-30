import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Student } from './schemas/student.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { decryptData } from 'src/utils/crypto'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.studentModel, query)
  }

  async create(dataDecode: string): Promise<Student | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.create(this.studentModel, body)
  }

  async delete(id: string): Promise<Student | null> {
    return FunService.deleteDataByID(this.studentModel, getIdObject(id))
  }

  async update(id: string, dataDecode: string): Promise<Student | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.updateData(this.studentModel, getIdObject(id), body)
  }
}
