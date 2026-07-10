export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  role: string;
  theme: string;
}

export interface AuthorizationResponse {
  expiration: string;
  token: string;
  usuario: User;
}

export interface PluggyConnectTokenResponse {
  accessToken: string;
}

export interface ItemSyncResponse {
  itemId: string;
  pluggyItemId: string;
  status: string;
  executionStatus: string;
  accountsSynced: number;
  transactionsSynced: number;
}

export interface DashboardMetric {
  amount: number;
  percentageChange: number;
}

export interface MonthlyFinancial {
  year: number;
  month: number;
  label: string;
  income: number;
  expenses: number;
}

export type FinancialHistoryPeriod = 6 | 9 | 12;

export interface MonthYearFilter {
  year: number;
  month: number;
}

export interface CategoryExpense {
  categoryId: string | null;
  categoryName: string;
  amount: number;
  color: string | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  systemCategory?: boolean;
}

export interface MerchantCategoryRule {
  id: string;
  merchant: string;
  active: boolean;
  category: Category;
}

export interface Account {
  id: string;
  itemId: string;
  institutionId: string;
  institutionName: string;
  institutionLogoUrl: string | null;
  institutionPrimaryColor: string | null;
  name: string;
  type: string;
  subtype: string | null;
  currency: string;
  balance: number;
  creditLimit: number | null;
  number: string | null;
  lastTransactionSync?: string | null;
  lastAccountSync?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface InstitutionProfile {
  id: string;
  name: string;
  logoUrl: string | null;
  primaryColor: string | null;
  accounts: Account[];
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  merchant: string | null;
  date: string;
  paymentDate: string | null;
  currency: string;
  status: string;
  type: "CREDIT" | "DEBIT";
  nature:
    | "INCOME"
    | "EXPENSE"
    | "INTERNAL_TRANSFER"
    | "CREDIT_CARD_PAYMENT"
    | "REFUND";
  accountId: string;
  accountName: string;
  category: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface DashboardResponse {
  referenceMonth: string;
  summary: {
    totalBalance: DashboardMetric;
    income: DashboardMetric;
    expenses: DashboardMetric;
    monthlySavings: DashboardMetric;
  };
  financialHistory: MonthlyFinancial[];
  expensesByCategory: CategoryExpense[];
  linkedAccounts: Account[];
  recentTransactions: Transaction[];
}
