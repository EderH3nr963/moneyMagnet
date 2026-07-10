import { redirect } from "next/navigation";

interface InstitutionRedirectPageProps {
  params: Promise<{
    institutionId: string;
  }>;
}

export default async function InstitutionRedirectPage({
  params,
}: InstitutionRedirectPageProps) {
  const { institutionId } = await params;
  redirect(`/institutions/${institutionId}`);
}
