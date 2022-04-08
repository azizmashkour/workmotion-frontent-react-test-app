export class Employee {
    readonly id?: number;
    firstname!: string;
    lastname!: string;
    role!: string;
    state!: string;
    picUrl?: string;

    constructor (data?: any) {
        if (data) {
            this.id = data.id;
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.role = data.role;
            this.state = data.state
            this.picUrl = data.picUrl
        }
    }

    get fullName() {
      return `${this.firstname} ${this.lastname}`
    }

    toJson () {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            role: this.role,
            state: this.state,
            picUrl: this.picUrl
        }
    }
}
