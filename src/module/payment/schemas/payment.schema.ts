import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  idStudent: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  idClass: Types.ObjectId

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  month: number

  @Prop({ required: true })
  year: number

  @Prop({ default: 'paid' })
  status: string // paid, partial, unpaid

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  idTeacher: Types.ObjectId

  @Prop()
  note: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
