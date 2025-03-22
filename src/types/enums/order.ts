export enum OrderStatus {
    IN_PROGRESS= "In Progress",
    PENDING= "Pending",
    PAID = "Paid"
  }

  export enum PaymentMethod {
    PAYSTACK = "Paystack",
  }

  export type QueryParams = {
    page: number,
    limit: number,
    status?: string,
    paymentStatus?: string,
    date?: string
  }