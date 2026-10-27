import { supportSteps, type SupportStepId } from "@/content/get-support";

export type SupportApplication = {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  businessName: string;
  businessType: string;
  businessStatus: string;
  setbacks: string[];
  setbackStory: string;
  supportNeeds: string[];
  amount: string;
  shareStory: string;
  heardFrom: string;
  consent: boolean;
};

export type SupportErrors = Partial<Record<keyof SupportApplication, string>>;

export const emptyApplication: SupportApplication = {
  fullName: "",
  phone: "",
  email: "",
  state: "",
  city: "",
  businessName: "",
  businessType: "",
  businessStatus: "",
  setbacks: [],
  setbackStory: "",
  supportNeeds: [],
  amount: "",
  shareStory: "",
  heardFrom: "",
  consent: false,
};

export const STORY_MIN_LENGTH = 20;

const isPhone = (value: string) => value.replace(/\D/g, "").length >= 10;
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Per-step checks, shared by the form (instant feedback) and the server action.
export function validateStep(step: SupportStepId, a: SupportApplication): SupportErrors {
  const errors: SupportErrors = {};
  switch (step) {
    case "name":
      if (a.fullName.trim().length < 2) errors.fullName = "Please tell us your name.";
      break;
    case "contact":
      if (!isPhone(a.phone)) errors.phone = "Please enter a phone number we can call or text.";
      if (a.email.trim() && !isEmail(a.email.trim())) errors.email = "That email doesn't look quite right.";
      break;
    case "location":
      if (!a.state) errors.state = "Please choose a state.";
      if (!a.city.trim()) errors.city = "Please tell us the city or town.";
      break;
    case "business":
      if (!a.businessType) errors.businessType = "Please choose what kind of business it is.";
      if (!a.businessStatus) errors.businessStatus = "Please tell us where things stand.";
      break;
    case "setback":
      if (a.setbacks.length === 0) errors.setbacks = "Please choose at least one.";
      if (a.setbackStory.trim().length < STORY_MIN_LENGTH)
        errors.setbackStory = `Please share a little more — at least ${STORY_MIN_LENGTH} characters.`;
      break;
    case "support":
      if (a.supportNeeds.length === 0) errors.supportNeeds = "Please choose at least one.";
      break;
    case "final":
      if (!a.shareStory) errors.shareStory = "Please choose one.";
      if (!a.consent) errors.consent = "Please confirm to submit your application.";
      break;
  }
  return errors;
}

export function validateAll(a: SupportApplication): SupportErrors {
  return Object.assign({}, ...supportSteps.map((step) => validateStep(step.id, a)));
}
