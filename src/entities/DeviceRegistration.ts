import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Type } from 'class-transformer';

@Entity()
export class DeviceRegistration {

    @PrimaryKey()
    @Property({ length: 128, nullable: false })
    public device_ID: string;

    @Property({columnType: 'timestamp', defaultRaw: `current_timestamp()`, nullable: false })
    public requested_On: string;

    @Property({default: false})
    public approved: boolean;

    @Property({columnType: 'timestamp', nullable: true })
    public approved_On: string;

    @Property({ length: 100, nullable: true })
    public appproved_By: string;
}
