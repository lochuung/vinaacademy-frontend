import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryDto } from "@/types/category";
import { Check, Eye, X } from "lucide-react";

type CourseRequestStatus = "pending" | "approved" | "rejected";
type CourseRequestProps = {
  id: string;
  title: string;
  instructor: string;
  category: CategoryDto;
  createdAt: string;
  level: string;
  status: CourseRequestStatus;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDetails?: (id: string) => void;
};

const CourseRequestCard = ({
  id,
  title,
  instructor,
  category,
  createdAt,
  status,
  level,
  onApprove,
  onReject,
  onViewDetails,
}: CourseRequestProps) => {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };
  const statusText = {
    pending: "Đang chờ",
    approved: "Đã duyệt",
    rejected: "Từ chối",
  };
  return (
    <Card className="overflow-hidden transition-all border-none shadow-none">
      <CardContent className="p-0">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
            <Badge variant="outline" className={cn("rounded-full px-3 ml-2 shrink-0", statusColor[status])}>
              {statusText[status]}
            </Badge>
          </div>
         
          <div className="space-y-1">
            <p className="text-sm"><span className="text-muted-foreground">Giảng viên:</span> {instructor}</p>
            <p className="text-sm"><span className="text-muted-foreground">Danh mục:</span> {category.name}</p>
            <div className="flex justify-between items-center">
              <p className="text-sm"><span className="text-muted-foreground">Ngày tạo:</span> {createdAt}</p>
              <Badge variant="outline" className="rounded-md px-3 bg-slate-300">
                {level}
              </Badge>
            </div>
          </div>
         
         
          <div className="flex justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onViewDetails?.(id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Button>
           
            {status === "pending" && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => onReject?.(id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Từ chối
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onApprove?.(id)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Phê duyệt
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseRequestCard;