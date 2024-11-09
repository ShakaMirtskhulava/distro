export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpErrors = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type CreateCompanyData = {
  // companyId: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  // companyDescription: string;
  // companyDocuments?: File[];
};

export type CreateUser = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type CreateCompanyUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateProduct = {
  productName: string;
  description: string;
  price: number | string;
  stock: number | string;
};

export type EditProduct = {
  productName: string;
  description: string;
  price: number | string;
};

export type CreateOrder = {
  deliveryDateDeadline: string;
  quantity: number;
};

export type UpdateProductStock = {
  selectedDescription: "receive" | "writeOff" | "other";
  quantity: number;
  description?: string;
};

export type ProfileSchema = {
  email: string;
  role: string;
};
