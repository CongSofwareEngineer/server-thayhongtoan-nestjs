import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Class } from './schemas/class.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { decryptData } from 'src/utils/crypto'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class ClassService {
  constructor(@InjectModel(Class.name) private classModel: Model<Class>) { }

  async create(dataDecode: string): Promise<Class | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.create(this.classModel, body)
  }

  async delete(id: string): Promise<Class | null> {
    return FunService.deleteDataByID(this.classModel, getIdObject(id))
  }

  async update(id: string, dataDecode: string): Promise<Class | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.updateData(this.classModel, getIdObject(id), body)
  }
}
