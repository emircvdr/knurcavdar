import { ProductBase, ProductCreate } from "../interfaces/ProductInterface";
import { ConfigApi } from "./configService";

export class EmirAPI {
  public static async createProduct(
    product: ProductCreate
  ): Promise<ProductCreate> {
    return new Promise<ProductCreate>((resolve, reject) => {
      ConfigApi.LibraryApi()
        .post("product", product)
        .then((response) => {
          resolve(response.data as ProductCreate);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async getProducts(): Promise<never> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get("product")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async getProductByID(id: string): Promise<never> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .get(`product/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async updateProduct(
    id: string,
    product: ProductBase
  ): Promise<never> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .put(`product/${id}`, product)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static async deleteProduct(id: string): Promise<never> {
    return new Promise((resolve, reject) => {
      ConfigApi.LibraryApi()
        .delete(`product/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
