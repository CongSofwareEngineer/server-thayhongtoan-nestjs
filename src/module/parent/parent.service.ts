import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Parent } from './schemas/parent.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject, getPageLimitSkip, queryMatchName } from 'src/utils/function'
import { DB_COLLECTION } from 'src/common/mongoDB'

@Injectable()
export class ParentService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<Parent>) { }

  async getAll(@Query() query) {
    const { skip, limit } = getPageLimitSkip(query)
    const match: any = {}

    if (query.name) {
      match.name = queryMatchName(query.name)
    }
    if (query.phone) {
      match.phone = queryMatchName(query.phone)
    }

    return this.parentModel
      .aggregate([
        { $match: match },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: DB_COLLECTION.Student,
            localField: '_id',
            foreignField: 'idParent',
            as: 'students',
          },
        },
      ])
      .exec()
  }

  async create(body: any): Promise<Parent | null> {
    if (!body) {
      return null
    }

    return FunService.create(this.parentModel, body)
  }

  async delete(id: string): Promise<Parent | null> {
    return FunService.deleteDataByID(this.parentModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Parent | null> {
    if (!body) {
      return null
    }

    return FunService.updateData(this.parentModel, getIdObject(id), body)
  }

}
