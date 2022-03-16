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
      await this.em.findOneOrFail(DeviceRegistration,{
        device_ID : req.device_id
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}
