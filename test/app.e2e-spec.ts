import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from './../src/app.module'
import { ConfigModule } from '@nestjs/config'
import { HealthController } from '../src/health/health.controller'
import { PdfController } from '../src/pdf/pdf.controller'
import { PdfService } from '../src/pdf/pdf.service'
import { TerminusModule } from '@nestjs/terminus'

describe('AppController (e2e)', () => {
  let app

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TerminusModule, ConfigModule.forRoot()],
      controllers: [HealthController, PdfController],
      providers: [PdfService]
    }).compile()

    const app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ready (GET)', () => {
    return request(app.getHttpServer()).get('/ready').expect(200)
  })

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200)
  })
})
