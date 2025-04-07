// components/NotFoundState.tsx
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export function NotFoundState() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="text-center p-8 max-w-2xl">
                <h1 className="text-3xl font-bold mb-4">Danh mục không tồn tại</h1>
                <p className="text-gray-600 mb-8">
                    Rất tiếc, chúng tôi không thể tìm thấy danh mục bạn đang tìm kiếm.
                    Vui lòng kiểm tra lại URL hoặc khám phá các danh mục khác.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        onClick={() => router.push('/categories')}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Xem tất cả danh mục
                    </Button>
                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                    >
                        Về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
}