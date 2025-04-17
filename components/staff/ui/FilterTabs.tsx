import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterTabsProps = {
  filter: string;
  onFilterChange: (value: string) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
};

const FilterTabs = ({ filter, onFilterChange, counts }: FilterTabsProps) => {
  return (
    <Tabs value={filter} onValueChange={onFilterChange}>
      <TabsList className="grid grid-cols-4 w-full max-w-lg">
        <TabsTrigger value="all" className="rounded-l-md">
          Tất cả ({counts.all})
        </TabsTrigger>
        <TabsTrigger value="pending">
          Hàng chờ ({counts.pending})
        </TabsTrigger>
        <TabsTrigger value="approved">
          Đã duyệt ({counts.approved})
        </TabsTrigger>
        <TabsTrigger value="rejected" className="rounded-r-md">
          Đã từ chối ({counts.rejected})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FilterTabs;