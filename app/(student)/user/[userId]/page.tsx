"use server";
import UserProfileContent from "@/components/student/profile/UserView";

export default async function UserViewProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <div className="py-20">
      <UserProfileContent userId={userId} />
    </div>
  );
}
