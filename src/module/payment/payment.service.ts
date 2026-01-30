import { Injectable, Query } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Payment } from './schemas/payment.schema'
import { Student } from '../student/schemas/student.schema'
import { Class } from '../class/schemas/class.schema'
import { Model } from 'mongoose'
import { FunService } from 'src/utils/funcService'
import { getIdObject } from 'src/utils/function'

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) { }

  async getAll(@Query() query) {
    return FunService.getDataByLimit(this.paymentModel, query)
  }

  async create(body: any): Promise<Payment | null> {
    if (!body) {
      return null
    }
    return FunService.create(this.paymentModel, body)
  }

  async delete(id: string): Promise<Payment | null> {
    return FunService.deleteDataByID(this.paymentModel, getIdObject(id))
  }

  async update(id: string, body: any): Promise<Payment | null> {
    if (!body) {
      return null
    }
    return FunService.updateData(this.paymentModel, getIdObject(id), body)
  }

  async upsertMonthlyPayments(idTeacher: string, payments: any[]) {
    const results = []
    for (const item of payments) {
      const { idStudent, idClass, amount, month, year, status, note } = item
      if (!idStudent || !idClass || month === undefined || year === undefined) continue

      const filter = {
        idStudent: getIdObject(idStudent),
        idClass: getIdObject(idClass),
        month,
        year,
      }

      const update = {
        amount,
        status: status || 'paid',
        idTeacher: getIdObject(idTeacher),
        note: note || '',
      }

      const res = await this.paymentModel.findOneAndUpdate(
        filter,
        { $set: update },
        { upsert: true, new: true },
      )
      results.push(res)
    }
    return results
  }

  async getMonthlyReport(idClass: string, month: number, year: number) {
    const students = await this.studentModel.find({ idClass: getIdObject(idClass) })
    const payments = await this.paymentModel.find({
      idClass: getIdObject(idClass),
      month,
      year,
    })

    const report = students.map((student) => {
      const payment = payments.find((p) => p.idStudent.toString() === student._id.toString())
      return {
        student: {
          id: student._id,
          name: student.name,
          numberPhoneParent: student.numberPhoneParent,
        },
        payment: payment ? {
          amount: payment.amount,
          status: payment.status,
          date: payment['updatedAt'],
        } : {
          amount: 0,
          status: 'unpaid',
          date: null,
        },
      }
    })

    return report
  }
}
