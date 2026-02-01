import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Student } from './schemas/student.schema'
import { FunService } from 'src/utils/funcService'
import { getIdObject, getPageLimitSkip, queryMatchName } from 'src/utils/function'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Model } from 'mongoose'

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<Student>) { }

  async getAll(@Query() query) {
    const { skip, limit } = getPageLimitSkip(query)
    const match: any = {}
    if (query.name) {
      match.name = queryMatchName(query.name)
    }
    if (query.age) {
      match.age = Number(query.age)
    }
    if (query.idClass) {
      match.idClass = getIdObject(query.idClass)
    }

    return this.studentModel
      .aggregate([
        { $match: match },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: DB_COLLECTION.Parent,
            localField: 'idParent',
            foreignField: '_id',
            as: 'idParent',
          },
        },
        {
          $unwind: {
            path: '$idParent',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .exec()
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
