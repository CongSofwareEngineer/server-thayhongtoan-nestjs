import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Class, ClassSchema } from './schemas/class.schema'
import { Module } from '@nestjs/common'
import { ClassService } from './class.service'
import { ClassController } from './class.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
        collection: DB_COLLECTION.Class,
      },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [],
})
export class ClassModule { }
