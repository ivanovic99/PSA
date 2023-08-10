import { Version } from './versions';

export interface Product {
   id: number;
   name: string;
   versions: Version[];
   description: string;
 }