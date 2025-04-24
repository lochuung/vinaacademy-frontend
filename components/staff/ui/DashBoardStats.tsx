import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
};

const StatCard = ({ title, value, icon, description, className }: StatCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

type DashboardStatsProps = {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
};

const DashboardStats = ({
  totalRequests,
  pendingRequests,
  approvedRequests,
  rejectedRequests,
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Tổng số khóa học"
        value={totalRequests}
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        className="bg-accent"
      />
      <StatCard
        title="Đang chờ duyệt"
        value={pendingRequests}
        icon={<Clock className="h-4 w-4 text-yellow-600" />}
        className="bg-yellow-50"
      />
      <StatCard
        title="Đã phê duyệt"
        value={approvedRequests}
        icon={<CheckCircle className="h-4 w-4 text-green-600" />}
        className="bg-green-50"
      />
      <StatCard
        title="Đã từ chối"
        value={rejectedRequests}
        icon={<XCircle className="h-4 w-4 text-red-600" />}
        className="bg-red-50"
      />
    </div>
  );
};

export default DashboardStats;