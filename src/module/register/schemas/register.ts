import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

@Schema({ versionKey: false })
export class Register {
  _id?: Types.ObjectId

  @Prop({ required: true })
  phoneNumber: string

  @Prop({ required: true })
  name: string

  @Prop({ type: [String], required: true })
  idChildren: string[]

  @Prop()
  address?: string

  @Prop({ required: true })
  price: number

  @Prop()
  note?: string
}
export type RegisterDocument = HydratedDocument<Register>;
export const RegisterSchema = SchemaFactory.createForClass(Register)
