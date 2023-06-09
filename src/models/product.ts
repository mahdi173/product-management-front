import { Size } from './size'
import type { Type } from './type'

interface BaseProduct{  
    name: string
    description: string
    price: number
}

export interface CreateProduct extends BaseProduct {
    type_id: number,
    sizes: Array<number>
}

export interface Product extends BaseProduct {
    id: number
    type: Type
    sizes: Size[]
  
   /**
   * Used to show list of current product with their type and sizes
   * @example
   * response from backend :
   * Product Object :
   * {
   *  id:1
   *  name: ""
   *  description: ""
   *  price: 
   *  type: {
   *    id:1
   *    name: ""
   *  }
   *  sizes : [
   *   {
   *     id:1
   *     name: ""
   *   }
   *  ]
   * } 
   */
}