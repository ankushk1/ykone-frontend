export interface IClient {
  _id: string;
  name: string;
  cin: string;
  email: string;
  address: {
    state: string;
    pinCode: string;
    address: string;
    country: string;
  };
}
