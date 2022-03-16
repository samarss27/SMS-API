import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class DeviceLog {

    @PrimaryKey()
    @Property({length:128, nullable: false })
    public device_ID: string;

    @Property({length:30, nullable: false })
    public application_Version: string;

    @Property({length:100, nullable: false })
    public Application_ID: string;

    @Property({length:128, nullable: false })
    public IP_Address: string;

    @Property({length:100, nullable: false })
    public Route: string;

    @Property({columnType: 'timestamp', defaultRaw: `current_timestamp()`, nullable: false })
    public createdAt: Date;

}
