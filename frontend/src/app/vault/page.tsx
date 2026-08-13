import { redirect } from "next/navigation";

export default function VaultRedirectPage() {
  redirect("/credentials");
}
