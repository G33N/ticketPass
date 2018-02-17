export interface Events {
    id: Number;
    title: String;
    type: [{
        id: Number;
        name: String;
        logoImageUri: String
    }];
    imageUri: String;
    startDateTime: String;
    organizerName: String;
    locationName: String;
    hasPendingDraws: Boolean;
}
