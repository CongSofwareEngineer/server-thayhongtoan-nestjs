import { MongooseModule } from '@nestjs/mongoose'
import { DB_COLLECTION } from 'src/common/mongoDB'
import { Register, RegisterSchema } from './schemas/register'
import { Module } from '@nestjs/common'
import { RegisterService } from './register.service'
import { RegisterController } from './register.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Register.name,
        schema: RegisterSchema,
        collection: DB_COLLECTION.Register,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [],
})
export class RegisterModule { }
