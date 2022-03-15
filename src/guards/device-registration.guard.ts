import { EntityManager, MikroORM } from '@mikro-orm/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeviceRegistration } from 'src/entities/DeviceRegistration';
import { Registration } from 'src/models/login';

@Injectable()
export class DeviceRegistrationGuard implements CanActivate {
  constructor(
    private orm: MikroORM,
    private em : EntityManager
  ){}
  
  async canActivate(
    context: ExecutionContext,
  ):
  Promise<boolean>{
    const req = context.switchToHttp().getRequest();
    let device_id = req.header("X-Device-Id");
    try {
      let device = await this.em.findOneOrFail(DeviceRegistration,{
        device_ID : req.device_id
      });
      if(!device){
        let entity = new Registration();
        entity.device_ID = device_id;
        entity.requested_On = Date();
        entity.approved = false;
        await this.em.persistAndFlush(entity);
      }
    }
    catch(e){
      return e;
    } 
  }
}
