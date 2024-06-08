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

export interface Order {
   id: number;
   clientID: number;
   status: string;
   description: string;
   orderDate: string;
   deliveryDate: string;
   materials: string;
   finalPrice: number;
}

export interface Client {
   id: string;
   name: string;
   cpf: string;
   email: string;
   phone: string;
   address: string;
   orders: Array<Order>;
}