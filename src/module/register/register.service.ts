import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Register } from './schemas/register'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class RegisterService {
  constructor(@InjectModel(Register.name) private registerModel: Model<Register>) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.registerModel, query)
  }

  async create(body: any): Promise<Register | null> {
    if (!body) {
      return null
    }

    return FunService.create(this.registerModel, body)
  }

  async delete(id: string): Promise<Register | null> {
    return FunService.deleteDataByID(this.registerModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Register | null> {
    if (!body) {
      return null
    }

    return FunService.updateData(this.registerModel, getIdObject(id), body)
  }
}
