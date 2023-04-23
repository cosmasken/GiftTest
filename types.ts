export type Merchant = {
    create_business_date: null | string;
    create_date: string;
    create_txn_id: string;
    created_by: number;
    df_flag: null;
    inst_no: string;
    lookup_code: string;
    lookup_id: number;
    lookup_values_1: string;
    lookup_values_2: string;
    lookup_values_3: string;
    lookup_values_4: string;
    lookup_values_5: null;
    rec_no: number;
    status: number;
    update_business_date: null | string;
    update_by: number;
    update_date: string;
    update_txn_id: string;
  };
  export interface AppState {
    merchants: Merchant[];
    giftCards: GiftCard[];
    loading: boolean;
    error: Error | null;
  }
  export interface GiftCard {
    id: number;
    merchantId: number;
    balance: number;
    merchantName: number;
    // Other properties
  }
  export interface GiftCardData {
    id: number;
    category: string;
    merchantname: string;
    receiver: string;
    amount: number;
    note: string;
    color: string;
  }

  export interface RootState {
    merchants: Merchant[];
  }
  