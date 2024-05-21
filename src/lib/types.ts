export interface Item {
   id: string;
   length: number;
   name: string;
   price: number;
   width: number;
   quantity: number;
   thickness: number;
}

export interface DashboardData {
   material_costs: Array<{ material: string, cost: number }>;
   monthly_costs: Array<{ month: string, cost: number }>;
}

export interface Client {
   name: string;
   address: {
      street: string;
      number: number | string;
      neiborghood: string;
      city: string;
      state: string;
      type: 'house' | 'apartment' | 'building';
      postal_code: string;
   },
   contact: {
      phone: string;
      email: string;
   },
   id: {
      type: 'cpf' | 'cnpj';
      value: string;
   }
}