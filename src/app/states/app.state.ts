import { User } from './../interfaces/user';
import { GetUsers, AddUsers, UpdateUsers, DeleteUsers } from './../actions/app.actions';
import { DesignUtilityService } from './../services/design-utility.service';
import { Injectable } from "@angular/core";
import { Action, State, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'appstate',
  defaults: {
    users: []
  }
})

@Injectable()
export class AppState {
  constructor(private _du: DesignUtilityService) { }

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  getDataFromState(ctx: StateContext<UserStateModel>) {
    return this._du.fetchUsers().pipe(
      tap(
        returnData => {
          const state = ctx.getState();
          
          ctx.setState({
            ...state,
            users: returnData
          })
        }
      )
    )
  }

  @Action(AddUsers)
  addDataToState(ctx: StateContext<UserStateModel>, payload: AddUsers) {
    return this._du.addUsers(payload).pipe(
      tap(
        returnData => {
          const state = ctx.getState();

          ctx.patchState({
            users: [...state.users, returnData]
          })
        }
      )
    )
  }

  @Action(UpdateUsers)
  updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
    return this._du.updateUser(payload, i).pipe(
      tap(
        returnData => {
          const state = ctx.getState();

          const userList = [...state.users];
          userList[i] = payload;

          ctx.setState({
            ...state,
            users: userList
          });
        }
      )
    )
  }

  @Action(DeleteUsers)
  deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
    return this._du.deleteUser(id).pipe(
      tap(
        returnData => {
          const state = ctx.getState();
          console.log(`The id is ${id}`);
          const filteredArray = state.users.filter((contents: User) => contents.id != id);

          ctx.setState({
            ...state,
            users:filteredArray
          });
        }
      )
    )
  }
}
