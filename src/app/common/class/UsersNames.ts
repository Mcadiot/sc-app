export interface UserName {
  name: string;
  id: string;
}

export class UsersNames {
  public users: Map<string, string>;

  constructor() {
    this.users = new Map<string, string>();
  }

  addUser(user: UserName) {
    if (this.users.get(user.name) == null) {
      this.users.set(user.id, user.name);
    }
  }

  clone(): UsersNames {
    const clone = new UsersNames();
    clone.users = new Map(this.users);
    return clone;
  }
}
