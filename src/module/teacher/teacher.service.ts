import { Injectable, Query, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Teacher } from './schemas/teacher.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'
import { AuthService } from '../auth/auth.service'
import { compareData, hashData } from 'src/utils/hash'


@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    private authService: AuthService
  ) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.teacherModel, query)
  }

  async findById(id: string): Promise<Teacher | null> {
    return this.teacherModel.findById(getIdObject(id))
  }

  async login(body: any) {
    if (!body || !body.sdt || !body.password) {
      throw new UnauthorizedException('Invalid login data')
    }

    const teacher = await this.teacherModel.findOne({ sdt: body.sdt })
    if (!teacher) {
      throw new UnauthorizedException('Teacher not found')
    }

    const isPasswordValid = await compareData(body.password, teacher.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password')
    }

    const tokens = this.authService.generateAuth(teacher._id, teacher.sdt)
    return tokens
  }

  async create(body: any): Promise<Teacher | null> {
    if (!body || !body.password) {
      return null
    }

    // Hash password before saving
    body.password = await hashData(body.password)

    return FunService.create(this.teacherModel, body)
  }

  async delete(id: string): Promise<Teacher | null> {
    return FunService.deleteDataByID(this.teacherModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Teacher | null> {
    if (!body) {
      return null
    }

    // Hash password if it's being updated
    if (body.password) {
      body.password = await hashData(body.password)
    }

    return FunService.updateData(this.teacherModel, getIdObject(id), body)
  }
}
