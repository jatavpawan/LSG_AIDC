export class LocalStorageCustomer {
    public Id: number;
    public Cif: string;
    public DisplayName: string;
    public DisplayNameReverse: string;
    public DisplayAddress: string;
    public IsSelected: boolean;
    public SortOrder: number;
    public Address: string; 
    public OfficeName: string;
    public PhoneNumber: number;

    constructor(customerId: number, cif: string, displayName: string, displayNameReverse: string, displayAddress: string, sortOrder: number, address: string, officeName: string, phoneNumber: number) {
        this.Id = customerId;
        this.Cif = cif;
        this.DisplayName = displayName;
        this.DisplayNameReverse = displayNameReverse;
        this.DisplayAddress = displayAddress;
        this.SortOrder = sortOrder;
        this.IsSelected = false;
        this.Address = address;
        this.OfficeName = officeName;
        this.PhoneNumber = phoneNumber;
    }
}