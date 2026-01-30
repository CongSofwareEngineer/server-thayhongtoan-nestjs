import { Injectable, Query, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Teacher } from './schemas/teacher.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { decryptData } from 'src/utils/crypto'
import { getIdObject } from 'src/utils/function'
import { AuthService } from '../auth/auth.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    private authService: AuthService
  ) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.teacherModel, query)
  }

  async login(dataDecode: string) {
    const body = decryptData(dataDecode)
    if (!body || !body.sdt || !body.password) {
      throw new UnauthorizedException('Invalid login data')
    }

    const teacher = await this.teacherModel.findOne({ sdt: body.sdt })
    if (!teacher) {
      throw new UnauthorizedException('Teacher not found')
    }

    const isPasswordValid = await bcrypt.compare(body.password, teacher.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const tokens = this.authService.generateAuth(teacher._id, teacher.sdt)
    return tokens
  }

  async create(dataDecode: string): Promise<Teacher | null> {
    const body = decryptData(dataDecode)
    if (!body || !body.password) {
      return null
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt()
    body.password = await bcrypt.hash(body.password, salt)

    return FunService.create(this.teacherModel, body)
  }

  async delete(id: string): Promise<Teacher | null> {
    return FunService.deleteDataByID(this.teacherModel, getIdObject(id))
  }

  async update(id: string, dataDecode: string): Promise<Teacher | null> {
    const body = decryptData(dataDecode)
    if (!body) {
      return null
    }

    // Hash password if it's being updated
    if (body.password) {
      const salt = await bcrypt.genSalt()
      body.password = await bcrypt.hash(body.password, salt)
    }

    return FunService.updateData(this.teacherModel, getIdObject(id), body)
  }
}
