import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Parent } from './schemas/parent.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class ParentService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<Parent>) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.parentModel, query)
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

  async getFullInfo(id: string): Promise<Parent | null> {
    return this.parentModel.findById(getIdObject(id)).populate('students').exec()
  }
}
