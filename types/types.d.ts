interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
  role: {
    name: "Admin" | "User" | "Employee" | "RootUser";
  };
}

interface UserCreationPayload {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface OrderItem {
  productId: string;
  quantity: number | string;
}

interface OrderCreationPayload {
  deliveryDateDeadline: DatePickerValueChangeDetails;
  items: OrderItem[];
}

interface ServerActionResponsePayload {
  status: number;
  message: string;
  data?: any;
}

interface ImageResponsePayload {
  url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: ImageResponsePayload[];
}

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Order {
  id: string;
  createdAtUtc: Date;
  deliveryDateDeadline: Date;
  status: number;
  productImage: ImageResponsePayload;
  productName: string;
  companyName: string;
  price: number;
}

interface OrderPayload {
  orders: Order[];
  totalCount: number;
}

interface ActionResult {
  status: number;
  message: string;
  data: any;
}

interface StockAudits {
  id: string;
  createdAtUtc: Date;
  oldValue: number;
  newValue: number;
  description: string;
  userEmail: string;
}
