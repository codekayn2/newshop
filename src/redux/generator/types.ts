export type Generator = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
  };
  
  export enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
  }
  
  export type SearchGeneratorParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
  };

 export  interface GeneratorSliceState {
    items: Generator[];
    status: Status;
  }
  
