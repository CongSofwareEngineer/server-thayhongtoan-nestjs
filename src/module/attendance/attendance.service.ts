import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Attendance } from './schemas/attendance.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { decryptData } from 'src/utils/crypto'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<Attendance>) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.attendanceModel, query)
  }

  async create(dataDecode: string): Promise<Attendance | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.create(this.attendanceModel, body)
  }

  async delete(id: string): Promise<Attendance | null> {
    return FunService.deleteDataByID(this.attendanceModel, getIdObject(id))
  }

  async update(id: string, dataDecode: string): Promise<Attendance | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }
    return FunService.updateData(this.attendanceModel, getIdObject(id), body)
  }
}
