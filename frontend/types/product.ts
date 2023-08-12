import { Version } from './versions';

export interface Product {
   _id: number;
   name: string;
   versions: Version[];
   description: string;
 }