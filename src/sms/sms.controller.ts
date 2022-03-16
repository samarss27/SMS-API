import { MikroORM, EntityManager} from '@mikro-orm/core';
import { Body, Controller, Headers, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { createHash } from 'crypto';
import { DeviceLoginGuard } from 'src/guards/device-login.guard';
import { FetchSMS, PostSMS, Registration, SentSMS } from 'src/models/login';
import { SMS } from 'src/entities/SMS';
import { DeviceRegistration } from 'src/entities/DeviceRegistration';
import { HttpExceptionFilter } from 'src/exception.filter';

@Controller('sms')
@UseGuards(DeviceLoginGuard)
@UseFilters(HttpExceptionFilter)
export class SmsController {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ){}

  @Post('/save')
  public async save_sms( 
    @Body() body: PostSMS, 
  ){
    try { 
      console.log(body);
      let entity = new SMS();
      let message = body.message;
      let hash = createHash('sha1')
        .update(message)
        .digest('hex')
        .toString()
        .toLowerCase(); 
      entity.hash = hash;
      entity.server_number = body.server_number;
      entity.phone = body.phone
      entity.message = body.message;
      entity.direction = 1;
      entity.status = 0;
      entity.recieved_on = body.recieved_on;
      await this.em.persistAndFlush(entity);
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data : []
      }
    }
  }

  @Post('/fetch')
  public async fetch_sms( 
    @Body() body: FetchSMS, 
  ) {
    try {
      let sms = await this.em.find(SMS, {
        direction : 0,
        status : 0,
        server_number : body.server_number
      });
      return{
        success: true,
        error: "",
        data: sms,
      }
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: [],
      }
    }
  }

  @Post('/sent')
  public async sent_sms(
    @Body() body: SentSMS, 
  ) {
    try {
      let entity = await this.em.findOneOrFail(SMS, { hash: body.uuid})
      entity.status = 1;
      this.em.persistAndFlush(entity);
      return{
        success: true,
        error: "",
        data: [],
      }
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: [],
      }
    }
  }

  @Post('/register')
  public async register(
    @Body() body: Registration, 
    @Headers('X-Device-ID') id: string,
  ) {
    try { 
      let entity = new DeviceRegistration();
      entity.approved = false;
      entity.approved_On = null;
      entity.appproved_By = null;
      this.em.persistAndFlush(entity);
      return{
        success: true,
        error: "Device Registeration Request Sent",
        data: [],
      }
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: [],
      }
    }
  }
}
