export interface BookingData {
  step1: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  step2: {
    eventType: string;
    eventName: string;
    guestsCount: number;
    eventDuration: number;
    eventDescription: string;
  };
  step3: {
    eventStartDate: string;
    eventEndDate: string;
    eventStartTime: string;
    eventEndTime: string;
  };
  step4: {
    partyTheme: string;
    musicPreference: string;
    mustPlaySongs: string;
    partyGames: string;
    entranceStyle: string;
    additionalNotes: string;
  };
  step5: {
    addons: number[];
    totalPrice: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  step6: {};
}
