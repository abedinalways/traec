import HelpSupport from "../../_components/profile/HelpSupport";
const data = [
  {
    id: "1",
    question: "How do I create an account?",
    answer:
      "Click 'Sign Up' and follow the registration steps. Verify your email to complete the setup.",
  },
  {
    id: "2",
    question: "What types of services are available?",
    answer: "We offer venue bookings, event rentals, entertainment, and more.",
  },
  {
    id: "3",
    question: "How do I book a service?",
    answer:
      "Browse available services, choose your option, and follow the booking process.",
  },
  {
    id: "4",
    question: "When am I charged for bookings?",
    answer: "You are charged immediately after confirming the booking.",
  },
  {
    id: "5",
    question: "What payment methods are accepted?",
    answer: "We accept major debit/credit cards and supported digital wallets.",
  },
  {
    id: "6",
    question: "How do I delete my account?",
    answer:
      "You can delete your account through profile settings or by contacting support.",
  },
];

export default function Page() {
  return <HelpSupport backUrl="/client-profile" faqs={data} />;
}
