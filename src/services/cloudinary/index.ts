import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { isEmpty } from 'lodash'
import { join } from 'path'
import { PATH_IMG } from 'src/common/mongoDB'
import { isObject } from 'src/utils/function'
import { formatDate } from 'src/utils/momentUtils'

export class CloudinaryService {
  private static cloudinary = cloudinary
  static config() {
    cloudinary.config({
      api_key: process.env.CLOUD_DINARY_API_KEY,
      api_secret: process.env.CLOUD_DINARY_API_SECRET,
      cloud_name: process.env.CLOUD_DINARY_CLOUD_NAME,
    })
  }

  static async uploadImg(file: any, path = '') {
    this.config()
    let nameFile = file.name
    nameFile = nameFile.replace(/\.[^.]+$/, '')
    const result = await this.cloudinary.uploader.upload(file.base64, {
      folder: `tc-store/${path || PATH_IMG.Users}`,
      public_id: `${nameFile}-${formatDate()}-${new Date().getTime()}`,
      async: true,
      use_filename: true,
      type: 'upload',
      overwrite: true,
    })
    return result
  }

  static async deleteImg(publicId?: string) {
    try {
      this.config()
      if (!publicId) {
        return true
      }
      await cloudinary.uploader.destroy(publicId)
      return true
    } catch (error) {
      return false
    }
  }

  static async deleteImgByData(data: any) {
    try {
      if (!data) {
        return true
      }

      if (Array.isArray(data)) {
        const func = data.map((e) => {
          if (isObject(e)) {
            return CloudinaryService.deleteImg(e?.publicId || e?.public_id)
          }
          return CloudinaryService.deleteImg(e)
        })
        await Promise.all(func)
        return true
      }
      if (isObject(data)) {
        await CloudinaryService.deleteImg(data?.publicId || data?.public_id)
        return true
      }
      await CloudinaryService.deleteImg(data)
      return true
    } catch (error) {
      return false
    }
  }

  static async getUrlByData(data?: any, pathImg?: PATH_IMG) {
    try {
      if (Array.isArray(data)) {
        const listFun = data.map((e) => {
          if (isObject(e)) {
            return this.uploadImg(e, pathImg)
          }
          return e
        })
        const listImg = await Promise.all(listFun)
        const listImgValid = listImg.map((e) => {
          if (isObject(e)) {
            return e.public_id
          }
          return e
        })
        return listImgValid
      }
      if (isObject(data)) {
        const dataImgMain = await CloudinaryService.uploadImg(isEmpty(data?.file) ? data : data?.file, pathImg)

        return dataImgMain?.public_id || ''
      }

      return data
    } catch (error) {
      console.log('error getUrlByData', error)
      return ''
    }
  }

  static async uploadImgSystem() {
    const filePath = join(__dirname, '..', 'images', 'avatarDefault.png')

    const byteArrayBuffer = fs.readFileSync(filePath, 'utf8')
    const result = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          console.log({ uploadResult })

          return resolve(uploadResult)
        })
        .end(byteArrayBuffer)
    }).then((uploadResult) => {
      console.log(`Buffer upload_stream wth promise success - ${uploadResult}`)
    })

    return result
  }
}
