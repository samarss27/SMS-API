import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Type } from 'class-transformer';

@Entity()
export class DeviceRegistration {

    @PrimaryKey()
    @Property({ length: 50, nullable: false })
    public device_ID: string;

    @Property({columnType: 'timestamp', defaultRaw: `current_timestamp()`, nullable: false })
    public requested_On: string;

    @Property()
    public approved: boolean;

    @Property({columnType: 'timestamp', nullable: false })
    public approved_On: string;

    @Property({ length: 20, nullable: false })
    public appproved_By: string;
}
