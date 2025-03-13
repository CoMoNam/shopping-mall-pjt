export interface ProductSaveDto {
  name: string;
  description: string;
  price: number | "";
  quantity: number | "";
  categoryName: string;
}

export interface ProductListDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalScore: number;
  reviewCnt: number;
  rating: number;
  sellerId: number;
  categoryName: string;
}
