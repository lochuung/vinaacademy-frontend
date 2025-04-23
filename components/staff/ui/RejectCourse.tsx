import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { useState } from "react";
  
  interface RejectCourseDialogProps {
    slug: string;
    nameg: string;
    id: string;
    recipid: string;
    handleSubmitReject: (slug: string, comment: string, nameg: string, id: string, recipid: string) => void;
    isDialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
  }
  
  const RejectCourseDialog = ({
    slug,
    handleSubmitReject,
    setDialogOpen,
    isDialogOpen,
    nameg,
    id,
    recipid,
  }: RejectCourseDialogProps) => {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = async () => {
      if (!comment.trim()) return;
      
      setIsSubmitting(true);
      await handleSubmitReject(slug || "", comment, nameg, id, recipid);
      setIsSubmitting(false);
      setComment(""); // Reset comment after submission
      setDialogOpen(false); // Close dialog after submission
    };
  
    return (
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Lý do từ chối khóa học</DialogTitle>
            <DialogDescription>
              Vui lòng cung cấp lý do từ chối khóa học #{slug}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="comment" className="text-left">
                Lý do từ chối
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                className="min-h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleSubmit}
              disabled={!comment.trim() || isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận từ chối"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default RejectCourseDialog;