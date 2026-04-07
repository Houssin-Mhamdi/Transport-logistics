import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect root requests to the default locale
  redirect("/en");
}
