import { MikroORM, EntityManager} from '@mikro-orm/core';
import { Body, Controller, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { createHash } from 'crypto';
import { DeviceLoginGuard } from 'src/guards/device-login.guard';
import { FetchSMS, PostSMS, Registration, SentSMS } from 'src/models/login';
import { SMS } from 'src/entities/SMS';
import { DeviceRegistration } from 'src/entities/DeviceRegistration';

@Controller('sms')
export class SmsController {
    constructor(
      private readonly orm: MikroORM,
      private readonly em: EntityManager,
      )    {}

  @Post('/save')
  @UseGuards(DeviceLoginGuard)
  public async save_sms( 
    @Body() body: PostSMS, 
  ) {
    try { 
      let entity = new PostSMS();
      let hash = createHash('sha1')
        .update(body.message.trim())
        .digest()
        .toString('hex')
        .toLowerCase(); 
     // await this.dbcontext.query(`INSERT INTO sms(server_number, phone, recieved_on) VALUES(?,?,?,?,?)`,[hash, body.server_number, body.phone, body.message]);
      entity.hash = hash;
      entity.server_number = body.server_number;
      entity.phone = body.phone
      entity.message = body.message;
      entity.direction = 1;
      entity.status = 0;
      entity.received_on = body.received_on;
      await this.em.persistAndFlush(entity);
    } catch (e) {
      return {
        success: false,
        error: e.message,
        data: [],
      }
    }
  }

  @Post('/fetch')
  @UseGuards(DeviceLoginGuard)
  public async fetch_sms( 
    @Body() body: FetchSMS, 
  ) {
    try {
      let sms = await this.em.find(SMS, {
        direction : 0,
        status : 0,
        server_number : body.server_number
      });
      //let sms = await this.dbcontext.query(`Select uuid, phone, message FROM sms_log where server_number = ?`,[body.server_number]);
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
  @UseGuards(DeviceLoginGuard)
  public async sent_sms(
    @Body() body: SentSMS, 
  ) {
    try {
      let entity = await this.em.findOneOrFail(SMS, { hash: body.uuid})
      entity.status = 1;
      this.em.persistAndFlush(entity);
      //await this.dbcontext.query(`UPDATE sms SET status = 1 where hash = ?`,[body.uuid]);
      return{
        success: true,
        error: "",
        data: "Sms Updated",
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
  @UseGuards(DeviceRegistration)
  public async register(
    @Body() body: Registration, 
    @Headers('X-Device-ID') id: string,
  ) {
    try { 
      let entity = await this.em.findOneOrFail(DeviceRegistration,{
        device_ID : id
      })
      entity.approved = true;
      entity.approved_On = Date();
      entity.appproved_By = body.appproved_By;
      this.em.persistAndFlush(entity);
      //await this.dbcontext.query(`UPDATE register SET approved = true, approved_on = CURRENT_TIMESTAMP, approved_by = ? where device_id = ?`,[,body.uuid]);
      return{
        success: true,
        error: "Device Registered",
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
