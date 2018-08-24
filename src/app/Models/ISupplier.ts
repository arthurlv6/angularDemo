export interface ISupplier {
    id: number;
    name: string;
    gstNumber?: string;
    note?: string;
    taxRate?: any;
    bankName?: any;
    bankBranch?: string;
    paymentTerm?: any;
    physicalStreetAddress?: any;
    physicalSuburb?: any;
    physicalCity?: any;
    physicalState?: any;
    physicalCountry?: any;
    physicalPostalCode?: any;
    contactFirstName?: any;
    contactLastName?: string;
    contactEmail?: any;
    contactOfficePhone?: string;
    contactWebsite?: any;
    contactPhoneNumber?: any;
    contactFaxNumber?: string;
    contactMobileNumber?: any;
    createdDate?: Date;
    deleted?: boolean;
    products?: any[];
    hidden?:boolean;
}
