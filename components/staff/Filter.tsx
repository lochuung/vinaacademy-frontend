import { ArrowUpDown, Check, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { CourseSortOption } from "@/types/new-course"

type FilterProps = {
    handleStatusChange: (status: string) => void
    setSortOption: (option: CourseSortOption) => void
    status: string
    sortOption: CourseSortOption
}

const Filter = ({handleStatusChange, setSortOption, status, sortOption} : FilterProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Bộ lọc
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => handleStatusChange('all')}>
                        <span className="flex justify-between items-center w-full">
                            Tất cả
                            <div className="">
                                {status == "all" ? <Check size={16} /> : null}
                            </div>
                        </span>

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                        <span className="flex justify-between items-center w-full">
                            Hàng chờ
                            <div className="">
                                {status == "pending" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('approved')}>
                        <span className="flex justify-between items-center w-full">
                            Đã duyệt
                            <div className="">
                                {status == "approved" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('rejected')}>
                        <span className="flex justify-between items-center w-full">
                            Đã từ chối
                            <div className="">
                                {status == "rejected" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Xếp theo ngày</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSortOption('normal')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="flex justify-between items-center w-full">
                            Bình thường
                            <div className="">
                                {sortOption == "normal" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('newest')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="flex justify-between items-center w-full">
                            Mới nhất
                            <div className="">
                                {sortOption == "newest" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('oldest')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="flex justify-between items-center w-full">
                            Cũ nhất
                            <div className="">
                                {sortOption == "oldest" ? <Check size={16} /> : null}
                            </div>
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Filter