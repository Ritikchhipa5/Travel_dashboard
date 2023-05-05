export type DrawerListElement = {
  text: string;
  icon: JSX.Element;
  path?: string;
  subItems?: { text: string; icon: JSX.Element; path: string }[];
};

export type CategoryType = {
  id: number;
  name: string;
  city_id: string;
  subcategories: SubCategoryType[];
};

export type SubCategoryType = {
  category_id: string;
  id: number | string;
  name: string;
};

export type PriceType = {
  id: number;
  product_type: string;
  quantity: number;
  child_price: number;
  adult_price: number;
  subcategory_id: number;
};

export type ReservationType = {
  id: number;
  created_by: string;
  departure_date: string;
  order_date: string;
  order_number: string;
  customer: string;
  payment_type: string;
  ticket_sent_status: string;
  status: string;
};

export enum WeekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export type ImageType = {
  id: number;
  priority: number;
  priority_type: string;
};

export type TicketScheduleType = {
  id: string;
  time: string;
  date_start: string;
  date_end: string;
  max_people: string;
  week_days: WeekDays[];
};

export type TicketFullDataType = {
  id: string;
  company_id: number;
  city_id: number;
  title_en: string;
  title_kr: string;
  ticket_template: string;
  ticket_type: string;
  status: string;
  out_of_stock_alert: string;
  currency: string;
  additional_price_type: string;
  additional_price_amount: number;
  show_in_schedule_page: boolean;
  announcement: string;
  card_image: ImageType;
  wide_images: ImageType[];
  gallery_images: ImageType[];
  tickets_categories: {
    category_id: number;
  }[];
  tickets_subcategories: {
    subcategory_id: number;
  }[];
  tickets_prices: {
    type: string;
    age_limit: null;
    window_price: string;
    sale_price: number;
  }[];
  tickets_content: {
    name: string;
    content: string;
  }[];
  ticket_schedules: TicketScheduleType[];
};
