import { PriceType, SubCategoryType } from "../../shared/types";

export const getSubcategoriesPrices = (
  subCategoryId: number,
  subCategoriesWithPrices: {
    subcategory_id: string;
    prices: PriceType[];
  }[]
): PriceType[] => {
  const result: PriceType[] = subCategoriesWithPrices
    .filter((scwp) => scwp.subcategory_id === subCategoryId.toString())
    .map((scwp) => scwp.prices)
    .flat();
  return result;
};
