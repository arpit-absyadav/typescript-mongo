export interface IRequestQuery {
  page_no: number;
  page_size: number;
  sort_by: string;
  sort_order: string;
  status: number;
  search: string;
  ids: [];
}
