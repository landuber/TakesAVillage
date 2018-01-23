export class Villager {
    public constructor(public _id: string = '', 
                       public email: string = '',
                       public password: string = '',
                       public firstname: string = '',
                       public middlename: string = '',
                       public lastname: string = '',
                       public address: Address = new Address(),
                       public ssn: string = '',
                       public shortbio: string = '') {};
}

export class Address {
    public constructor(public street: string = '',
                       public city: string = '',
                       public state: string = '',
                       public zip: string = '') {}

}

export interface Authenticate {
  email: string;
  password: string;
}
