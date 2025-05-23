import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { MainProductsObject } from './main-products-object';
import { BehaviorSubject, Subject} from 'rxjs';
import { Products } from './products';
import { Categorys } from './categorys';
import { RegisterForm } from './register-form';
import { LoginForm } from './login-form';
import { UserInfo } from './user-info';


@Injectable({
  providedIn: 'root'
})
export class APIconnectionService {

  constructor(private Http: HttpClient) {
   
  }

  public searchedProductsTransfer : Subject<MainProductsObject> = new Subject;
  public pageIndicatorsTransfer: Subject<ElementRef> = new Subject
  public transferProductsFromFilter: Subject<MainProductsObject> = new Subject;
  public transferProductsAll: Subject<MainProductsObject> = new Subject;
  public transferSignUpToggle: Subject<boolean> = new Subject;
  public transferLogInToggle: Subject<boolean> = new Subject;
  public transferNoAccountToggle: Subject<boolean> = new Subject;
  public transferPageIndex: BehaviorSubject<number> = new BehaviorSubject(1);
  public loaderLogic: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public transferInCartNumber: Subject<number> = new Subject;

  startLoading() {
    this.loaderLogic.next(true)
  }

  stopLoading() {
    this.loaderLogic.next(false)
  }

  
  getBestSellers(){
    return this.Http.get("https://api.everrest.educata.dev/shop/products/search?page_size=6&rating=4")
  }

  getAllProducts(pageIndex : number, pageProductsSize: string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/all?page_index=${pageIndex}&page_size=${pageProductsSize}`)
  }

  searchProduct(searchWord: string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/search?page_size=38&keywords=${searchWord}`)
  }

  goToDetailsPage(productID: string){
    return this.Http.get<Products>(`https://api.everrest.educata.dev/shop/products/id/${productID}`)
  }

  getCategorys(){
    return this.Http.get<Categorys[]>(`https://api.everrest.educata.dev/shop/products/categories`)
  }

  getProductByCategorys(categoryID : string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/category/${categoryID}?page_size=28`)
  }

  getBrands(){
    return this.Http.get<string[]>("https://api.everrest.educata.dev/shop/products/brands")
  }

  getByBrands(brandName : string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/brand/${brandName}?page_size=30`)
  }

  getByStars(StarNum : string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/search?page_size=38&rating=${StarNum}`)
  }

  getByPrice(minPrice : string, maxPrice : string){
    return this.Http.get<MainProductsObject>(`https://api.everrest.educata.dev/shop/products/search?page_size=38&price_min=${minPrice}&price_max=${maxPrice}`)
  }

  register(body : RegisterForm){
    return this.Http.post("https://api.everrest.educata.dev/auth/sign_up", body)
  }

  logIn(body : LoginForm){
    return this.Http.post("https://api.everrest.educata.dev/auth/sign_in", body)
  }

  getUserPage(){
    return this.Http.get<UserInfo>("https://api.everrest.educata.dev/auth")
  }

  getCart(){
    return this.Http.get("https://api.everrest.educata.dev/shop/cart")
  }

  getProductQuantitiy(body : any){
    return this.Http.patch("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  addToCartItem(body: any) {
    return this.Http.post("https://api.everrest.educata.dev/shop/cart/product", body)
  }

  checkOut(){
    return this.Http.post("https://api.everrest.educata.dev/shop/cart/checkout", {})
  }

  deleteFromCart(body : any){
    return this.Http.delete("https://api.everrest.educata.dev/shop/cart/product", {body: body})
  }

  deleteCart(){
    return this.Http.delete("https://api.everrest.educata.dev/shop/cart")
  }
}
