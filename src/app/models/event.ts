export interface Event {
    Id: number;
    Title: string;
    Description: string;
    Type: {
        Id: number;
        Name: string;
        LogoImageUri: string;
    };
    StartDateTime: Date;
    EndDateTime: Date;
    Organizer: {
        Id: number;
        Name: string;
        LogoImageUri: string;
        MercadoPagoUserId: number;
        MercadoPagoPublicKey: string;
        MercadoPagoAuthorized: boolean;
        MercadoPagoAuthorizeToken: string;
        MercadoPagoExpirationDate: Date;
    };
    Location: {
        Id: number;
        Name: string;
        FullAddress: string;
        Longitude: string;
        Latitude: string;
        ImageUri: string;
    };
    Images: [
        {
            Id: string;
            Uri: string;
            IsDefault: boolean;
        }
    ];
    Draws: {};
    PayDirectToOrganizer: boolean;
}
