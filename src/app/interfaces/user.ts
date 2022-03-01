import { Company } from './user/company';
import { Address } from './user/address';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address,
  phone: string;
  website: string;
  company: Company
}
