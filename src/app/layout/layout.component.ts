import { GetUsers, AddUsers } from './../actions/app.actions';
import { Observable } from 'rxjs';
import { AppState } from './../states/app.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userForm: FormGroup;
  userInfo: User[];

  @Select(AppState.selectStateData) userInfo$: Observable<any>;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl('')
    });

    this.store.dispatch(new GetUsers());

    this.userInfo$.subscribe((returnData) => {
      this.userInfo = returnData
    });
  }

  addUser() {
    console.log(this.userForm.value);
    this.store.dispatch(new AddUsers(this.userForm.value));
    this.userForm.reset();
  }

}
