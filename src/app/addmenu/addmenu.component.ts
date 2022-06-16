import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AddMenu } from '../model/addmenu';
import { AddMenuService } from '../service/addmenu.service';
import { MenuService } from '../service/menu.service';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.css']
})
export class AddMenuComponent implements OnInit{
  menu$!: Observable<AddMenu[]>;
  menuId!: Pick<AddMenu, 'id'>;

  userRole!: string;
  isAdmin: boolean = false;

  successMessage!: string;
  errorMessage!: string;

  menuForm: FormGroup = this.formBuilder.group({
    foodName: ['', Validators.required],
    imgUrl: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    preparation: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              private addmenuService: AddMenuService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.menu$ = this.fetchAll();

    this.userRole = this.userService.role;
    if(this.userRole == 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  get foodName() {
    return this.menuForm.get('foodName');
  }

  get imgUrl() {
    return this.menuForm.get('imgUrl');
  }

  get category() {
    return this.menuForm.get('category');
  }

  get description() {
    return this.menuForm.get('description');
  }

  get price() {
    return this.menuForm.get('price');
  }

  get preparation() {
    return this.menuForm.get('preparation');
  }

  async addMenu() {

    const menu: AddMenu = { foodName: this.menuForm.controls['foodName'].value,
                            imgUrl: this.menuForm.controls['imgUrl'].value,
                            category: this.menuForm.controls['category'].value,
                            description: this.menuForm.controls['description'].value,
                            price: this.menuForm.controls['price'].value,
                            preparation: this.menuForm.controls['preparation'].value};

    try {
    const menuAdded = await this.addmenuService.addMenu(menu);
    } catch (err) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }

  }

  fetchAll(): Observable<AddMenu[]> {
    return this.addmenuService.getMenu();
  }

  delete(id: Pick<AddMenu, 'id'>): void {
    this.addmenuService.deleteMenu(id).subscribe(() => (this.menu$ = this.fetchAll()));
  }
  
}