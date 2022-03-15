import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { MikroORM, EntityManager} from '@mikro-orm/core';
import { Observable } from 'rxjs';
import { DeviceRegistration } from 'src/entities/DeviceRegistration';
import { Login } from 'src/models/login';


@Injectable()
export class DeviceLoginGuard implements CanActivate {
  constructor(
    private orm: MikroORM,
    private em : EntityManager
  ){}
  
  async canActivate(
    context: ExecutionContext,
  ):
  Promise<boolean>{
    const req = context.switchToHttp().getRequest();
    let route = req.route;
    let ip_address = req.header("X-Forwarded-By");
    let application_id = req.header("X-Application-Id");
    let application_version = req.header("X-Application-Version");
    let device_id = req.header("X-Device-Id");
    try {
      let device = await this.em.findOneOrFail(DeviceRegistration,{
        device_ID : req.device_id
      });
      if(!device){
        let entity = new Login();
        entity.device_ID = device_id;
        entity.application_Version = application_version;
        entity.Application_ID = application_id;
        entity.Route = route;
        entity.IP_Address = ip_address;
        await this.em.persistAndFlush(entity);
      }
    } catch (error) {
      return error;
    }
  }
}
