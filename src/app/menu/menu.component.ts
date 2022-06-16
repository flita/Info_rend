import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Menu } from '../model/menu';
import { User } from '../model/user';
import { MenuService } from '../service/menu.service';
import { UserService } from '../service/user.service';
import { AddMenu } from '../model/addmenu';
import { AddMenuService } from '../service/addmenu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  menu$!: Observable<AddMenu[]>;
  userId!: Pick<User, 'id'>;
  menuId!: Pick<AddMenu, 'id'>;
  form!: FormGroup;
  response: string | undefined = undefined;

  constructor(private addmenuService: AddMenuService, private menuService: MenuService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.menu$ = this.fetchAll();
    this.userId = this.userService.id;
    this.menuId = this.menuService.id;

    this.form = this.formBuilder.group(
      {
        menuId: new FormControl("", [
          Validators.required
        ]),
        foodName: new FormControl("", [
          Validators.required
        ]),
        imgUrl: new FormControl("", [
          Validators.required
        ]),
        category: new FormControl("", [
          Validators.required
        ]),
        description: new FormControl("", [
          Validators.required
        ]),
        price: new FormControl("", [
          Validators.required
        ]),
        preparation: new FormControl("", [
          Validators.required
        ]),
        uploaderId: new FormControl("", [
          Validators.required
        ])
      });

    }

    fetchAll(): Observable<AddMenu[]> {
      return this.addmenuService.getMenu();
    }


    onSubmit(formData: Partial<Menu>): void {
      this.menuService.createOrder(formData, this.userId, this.menuId).pipe().subscribe(() => {
        this.response = 'Added succesfully: ' + formData.foodName;
      });
    }
}
