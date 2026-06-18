"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface BookingFormData {
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
}

interface BookingContextProps {
  step: number;
  setStep: (n: number) => void;
  bookingData: BookingFormData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  serviceId: number;
  setServiceId: (id: number) => void;
  pricingId: number;
  setPricingId: (id: number) => void;
}

const defaultBookingData: BookingFormData = {
  step1: {
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
  step2: {
    eventType: "",
    eventName: "",
    guestsCount: 0,
    eventDuration: 0,
    eventDescription: "",
  },
  step3: {
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
  },
  step4: {
    partyTheme: "",
    musicPreference: "",
    mustPlaySongs: "",
    partyGames: "",
    entranceStyle: "",
    additionalNotes: "",
  },
  step5: {
    addons: [],
    totalPrice: 0,
  },
};

const BookingContext = createContext<BookingContextProps | null>(null);

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");

  return ctx;
};

interface ProviderProps {
  children: ReactNode;
}

export default function BookingProvider({ children }: ProviderProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] =
    useState<BookingFormData>(defaultBookingData);
  const [serviceId, setServiceId] = useState<number>(0);
  const [pricingId, setPricingId] = useState<number>(0);

  return (
    <BookingContext.Provider
      value={{
        step,
        setStep,
        bookingData,
        setBookingData,
        serviceId,
        setServiceId,
        pricingId,
        setPricingId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}