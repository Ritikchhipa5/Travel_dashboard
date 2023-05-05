import { useQuery } from "@tanstack/react-query";
import { fetcher } from ".";
import {
  CategoryType,
  PriceType,
  ReservationType,
  SubCategoryType,
  TicketFullDataType,
} from "./types";

export const useGetCompanies = () => {
  const { data: companiesOptions, error: companiesError } = useQuery({
    queryKey: ["companies"],
    queryFn: fetcher("/companies", (res: { value: string; text: string }[]) =>
      res.map((item: any) => ({
        value: item.id.toString(),
        text: item.name,
      }))
    ),
  });

  return { companiesOptions, companiesError };
};

export type TicketType = {
  id: number;
  product_code: string;
  title_en: string;
  status: string;
};
export const useGetTickets = (filter?: { name?: string; code?: string }) => {
  const {
    data: tickets,
    error: ticketsError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      `/tickets?title_en=${filter?.name}&product_code=${filter?.code}`,
    ],
    queryFn: fetcher(
      `/tickets?title_en=${filter?.name}&product_code=${filter?.code}`,
      (res: TicketType[]) =>
        res.map((item: TicketType) => ({
          id: item.id,
          "Ticket Code": item.product_code,
          "Ticket Name": item.title_en,
          Status: item.status,
        }))
    ),
  });

  return { tickets, loadingTickets: isLoading, refetchTickets: refetch };
};

export const useGetCities = (company: string) => {
  const { data: citiesOptions, error: citiesError } = useQuery({
    queryKey: [`/cities/${company}}`],
    queryFn: fetcher(
      `/cities/${company}`,
      (res: { value: string; text: string }[]) =>
        res.map((item: any) => ({
          value: item.id.toString(),
          text: item.name,
        }))
    ),
    enabled: Boolean(company),
  });

  return { citiesOptions, citiesError };
};

export const useGetCategories = (city: string) => {
  const { data: categoriesOptions } = useQuery({
    queryKey: [`/categories?city_id=${city}`],
    queryFn: fetcher(
      `/categories?city_id=${city}`,
      (res: { value: string; text: string }[]) =>
        res.map((item: any) => ({
          value: item.id.toString(),
          text: item.name,
        }))
    ),
    enabled: Boolean(city),
  });

  return {
    categoriesOptions,
  };
};

export const useGetFullCategories = (city: string) => {
  const { data: categoriesOptions, refetch: refetchCategories } = useQuery<
    CategoryType[]
  >({
    queryKey: [`/categories?city_id=${city}`],
    queryFn: fetcher(`/categories?city_id=${city}`, (res) => res),
    enabled: Boolean(city),
  });

  return {
    categoriesOptions,
    refetchCategories,
  };
};

export const useGetAllCategories = () => {
  const { data: allCategoriesOptions } = useQuery({
    queryKey: [`/categories`],
    queryFn: fetcher(`/categories`, (res: { value: string; text: string }[]) =>
      res.map((item: any) => ({
        value: item.id.toString(),
        text: item.name,
      }))
    ),
  });

  return {
    allCategoriesOptions,
  };
};

export const useGetSubCategories = (categories: (number | string)[]) => {
  const { data: subCategories, refetch: refetchSubCategories } = useQuery<
    SubCategoryType[]
  >({
    queryKey: [
      `/categories/subcategories?${categories.map(
        (item, idx) => `categories[${idx}]=${item}`
      )}`,
    ],
    queryFn: fetcher(
      `/categories/subcategories?${categories.map(
        (item, idx) => `categories[${idx}]=${item}`
      )}`
    ),
  });

  return {
    subCategories,
    refetchSubCategories,
  };
};

export const useGetPriceLists = (category: string | number) => {
  const { data: subcategoryWithPrices, refetch: refetchPriceLists } = useQuery<
    { subcategory_id: string; prices: PriceType[] }[]
  >({
    queryKey: [`/price-lists?category_id=${category}`],
    queryFn: fetcher(
      `/price-lists?category_id=${category}`,
      (res: {
        subcategories: { subcategory_id: string; prices: PriceType[] };
      }) => res.subcategories
    ),
  });

  return {
    subcategoryWithPrices,
    refetchPriceLists,
  };
};

export const useGetReservations = () => {
  const {
    data: reservationsList,
    isLoading: loadingReservationsList,
    refetch: refetchReservationsList,
  } = useQuery<ReservationType[]>({
    queryKey: [`/reservations`],
    queryFn: fetcher(`/reservations`, (res: ReservationType[]) => res),
  });

  return {
    reservationsList,
    loadingReservationsList,
    refetchReservationsList,
  };
};

export const useGetTicketData = (ticketId: string) => {
  const {
    data: ticketData,
    isLoading: loadingTicketData,
    refetch: refetchTicketData,
  } = useQuery<TicketFullDataType>({
    queryKey: [`/tickets/${ticketId}`],
    queryFn: fetcher(`/tickets/${ticketId}`, (res: TicketFullDataType) => res),
    enabled: Boolean(ticketId),
  });

  return {
    ticketData,
    loadingTicketData,
    refetchTicketData,
  };
};
