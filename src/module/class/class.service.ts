import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Class } from './schemas/class.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject, getPageLimitSkip, queryMatchName } from 'src/utils/function'
import { DB_COLLECTION } from 'src/common/mongoDB'

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) { }

  async getAll(@Query() query) {
    const { skip, limit } = getPageLimitSkip(query)
    const match: any = {}

    if (query.name) {
      match.name = queryMatchName(query.name)
    }
    if (query.id) {
      match._id = getIdObject(query.id)
    }

    return this.classModel
      .aggregate([{ $match: match }, { $skip: skip }, { $limit: limit }])
      .exec()
  }

  async create(body: any): Promise<Class | null> {
    if (!body) {
      return null
    }

    return FunService.create(this.classModel, body)
  }

  async delete(id: string): Promise<Class | null> {
    return FunService.deleteDataByID(this.classModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Class | null> {
    if (!body) {
      return null
    }

    return FunService.updateData(this.classModel, getIdObject(id), body)
  }

  async getFullInfo(id: string, query: any): Promise<Class | null> {
    const { skip, limit } = getPageLimitSkip(query)
    const data = await this.classModel
      .aggregate([
        {
          $match: {
            _id: getIdObject(id),
          },
        },
        {
          $lookup: {
            from: DB_COLLECTION.Student,
            let: { classId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$idClass', '$$classId'] } } },
              { $skip: skip },
              { $limit: limit },
            ],
            as: 'students',
          },
        },
      ])
      .exec()

    return data && data.length > 0 ? data[0] : null
  }
}
