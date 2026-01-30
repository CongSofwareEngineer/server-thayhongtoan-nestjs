import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req?.body?.dev) {
        return next()
      }

      console.log(`[${req.method}] ${req.originalUrl}`)

      const url = req.originalUrl
      const isPostOrPut = req.method === 'POST' || req.method === 'PUT'

      // 1. Decrypt body for write operations
      // We still skip decryption for specific system/auth routes if necessary, 
      // but generally we try to decrypt if there's data.
      // if (isPostOrPut && req.body?.data) {
      //   req.body = decryptData(req.body.data)
      //   if (!req.body) {
      //     return this.sendUnauthorizedResponse(res, 'Invalid encrypted data')
      //   }
      // }

      next()
    } catch (error) {
      console.error('Middleware Error:', error)
      this.sendUnauthorizedResponse(res, 'System Error')
    }
  }

  private sendUnauthorizedResponse(res: Response, message: string): void {
    res.status(HttpStatus.UNAUTHORIZED).send({
      error: message,
      status: HttpStatus.UNAUTHORIZED,
    })
  }
}
