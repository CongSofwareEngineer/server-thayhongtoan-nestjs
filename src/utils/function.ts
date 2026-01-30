import { HttpStatus } from '@nestjs/common'
import { LIMIT_DATA } from 'src/common/app'
import { PipelineStage, Types } from 'mongoose'
import { KEY_OPTION_FILTER_DB, MATH_DB, OPTION_FILTER_DB } from 'src/common/mongoDB'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

export function queryMatchName(name?: string) {
  try {
    if (!name) {
      return {}
    }
    return { [MATH_DB.$regex]: new RegExp(name, 'i') }
  } catch (error) {
    return {}
  }
}

export function delayTime(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function getIdObject(id: any): any {
  try {
    return new Types.ObjectId(id)
  } catch (error) {
    return process.env.KEY_CRYPTO_IV_ENCODE
  }
}

export function convertBoolean(value: any): boolean {
  try {
    if (lowercase(value) === 'true' || value === true) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

export function isObject(value: any): boolean {
  try {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
  } catch (error) {
    console.error('Error checking if value is an object:', error)
    return false
  }
}

export function getDateToQuery(value: string): { $gte: number; $lte: number } {
  const day = new Date(Number(value))
  const start = moment(day).startOf('day').valueOf()
  const end = moment(day).endOf('day').valueOf()
  return { $gte: start, $lte: end }
}

export function getRangeDateToQuery(startDate: string, endDate: string): { $gte: string; $lte: string } {
  const start = moment(Number(startDate)).startOf('day').valueOf().toString()
  const end = moment(Number(endDate)).endOf('day').valueOf().toString()

  return { $gte: start, $lte: end }
}

export function checkValidToDate(value: string): boolean {
  try {
    const start = moment(Number(value))

    return start.isSame(moment(), 'day')
  } catch (error) {
    return false
  }
}

export function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function lowercase(text: any): string {
  try {
    return text?.toString().toLowerCase() ?? ''
  } catch (error) {
    console.error('Error converting text to lowercase:', error)
    return text
  }
}

export function getPageLimitSkip(query: { [key: string]: any }) {
  const page = Number(query?.page || 1)
  const limit = Number(query?.limit || LIMIT_DATA)
  const skip = (page - 1) * limit
  return {
    page,
    limit,
    skip,
  }
}

export const numberWithCommas = (x: any) => {
  if (!x) {
    return 0
  }
  const parts = x.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export function formatRes(response: any, data: any, isError?: boolean) {
  try {
    if (isError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        status: HttpStatus.BAD_REQUEST,
      })
    }

    return response.status(HttpStatus.OK).json({
      data,
      status: HttpStatus.OK,
    })
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      data: null,
      status: HttpStatus.BAD_REQUEST,
    })
  }
}

export const getQueryDB = (query: any, keyType?: KEY_OPTION_FILTER_DB): { ['$match']: any } => {
  const queryBase: PipelineStage = {
    $match: {},
  }
  if (OPTION_FILTER_DB[keyType]) {
    Object.keys(OPTION_FILTER_DB[keyType]).forEach((key) => {
      if (!query[key]) return

      switch (key) {
        case 'name':
          queryBase.$match.name = { [MATH_DB.$regex]: new RegExp(query.name, 'i') }
          break

        case 'date':
          queryBase.$match.date = getDateToQuery(query.date)
          break

        case 'dateEnd':
        case 'dateStart':
          queryBase.$match.date = getRangeDateToQuery(
            query.dateStart || new Date().getTime().toString(),
            query.dateEnd || new Date().getTime().toString(),
          )
          break

        case 'status':
        case 'category':
        case 'type':
          if (query?.[key] && lowercase(query?.[key]) !== 'all') {
            const arrFilter = query[key].split(',')
            queryBase.$match[key] = { [MATH_DB.$in]: arrFilter }
          }
          break

        case 'id':
          queryBase.$match._id = getIdObject(query[key]?.toString())
          break

        case 'admin':
          queryBase.$match[key] = query[key] === 'true'
          break

        default:
          queryBase.$match[key] = query[key]
          break
      }
    })
  }
  return queryBase
}


export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
