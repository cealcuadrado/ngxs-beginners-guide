export class GetUsers {
  static readonly type = '[Users] Fetch';
}

export class AddUsers {
  static readonly type = '[Users] Add';

  constructor(public payload: any) {}
}

export class UpdateUsers {
  static readonly type = '[Users] Update';

  constructor(public payload: any, public id: number, public i: number) {}
}

export class DeleteUsers {
  static readonly type = '[Users] Delete';

  constructor(public id: number) {}
}
