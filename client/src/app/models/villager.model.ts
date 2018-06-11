export class Villager {
    public constructor(public _id: string = '', 
                       public email: string = '',
                       public password: string = '',
                       public firstname: string = '',
                       public middlename: string = '',
                       public lastname: string = '',
                       public address: Address = new Address(),
                       public paymentinfo: PaymentInfo = new PaymentInfo(),
                       public phonenumber: string = '') {};
}

export class Address {
    public constructor(public street: string = '',
                       public city: string = '',
                       public state: string = '',
                       public zip: string = '') {}

}

export class PaymentInfo {
    public constructor(public address: Address = new Address(),
                       public cardholdername: string = '',
                       public cardnumber: string = '',
                       public expmonth: string = '',
                       public expyear: string = '',
                       public cvv: string = '') {}
}

export interface Authenticate {
  email: string;
  password: string;
}
