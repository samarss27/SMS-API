import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class SMS{
  
  @PrimaryKey()
  @Property({ length: 100, nullable: false })
  public hash: string;

  @Property({ length: 20, nullable: false })
  public server_number: string = "001";

  @Property({ length: 25, nullable: false })
  public phone: string;

  @Property({ length: 20, nullable: false })
  public direction: number;

  @Property({ length: 20, nullable: false})
  public status: number;

  @Property({ length: 150, nullable: false })
  public message: string;

  @Property({ columnType: 'timestamp', defaultRaw: `NULL` })
  public added_on:Date;

  @Property({ length: 50, nullable: false })
  public recieved_on:number;

}
