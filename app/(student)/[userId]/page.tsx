'use server'
import UserProfileContentWrapper from "@/components/student/profile/UserView";

export default async function UserViewProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <UserProfileContentWrapper userId={userId} />;
}
