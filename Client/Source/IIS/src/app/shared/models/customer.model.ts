import { Account } from "./account.model";

export class Customer {
    Id: number;
    Address: string;
    FirstName: string;
    LastName: string;
    DisplayName: string;
    UserName: string;
    City: string;
    State: string;
    YearOfBirth?: number;
    LastFourSsn?: number;
    PhoneNumber?: number;
    Email: string;
    Cif: string;
    DisplayAccountNumber: number;
    OfficeName: string;
    DisplayAddress: string;
    EntityName: string;
    DisplayNameReverse: string;
    AccountNumbers: Account[];
    Favorited: boolean;
    GridDisplayAccount: number;
}