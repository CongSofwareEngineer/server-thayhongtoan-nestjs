import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

@Schema({ versionKey: false })
export class Parent {
  _id?: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  phone: string

  @Prop()
  address?: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }], default: [] })
  idStudents: Types.ObjectId[]

  @Prop()
  note?: string
}

export type ParentDocument = HydratedDocument<Parent>;
export const ParentSchema = SchemaFactory.createForClass(Parent)

ParentSchema.virtual('students', {
  ref: 'Student',
  localField: 'idStudents',
  foreignField: '_id',
})
