export type Step = 1 | 2 | 3 | 4;

export const SERVICES = [
  "DJ Services",
  "Catering",
  "Decorators",
  "Photography",
  "Entertainment",
  "Rentals",
] as const;

export const INVESTOR_HELP = [
  "Graduation",
  "Corporate Event",
  "Holiday Party",
  "Baby Shower",
  "Wedding",
  "Other",
] as const;

export type PreferencesState = {
  selectedServices: string[];
  selectedInvestorHelp: string[];
};
