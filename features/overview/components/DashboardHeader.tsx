interface DashboardHeaderProps {
    title: string;
    actions?: React.ReactNode;
}

export function DashboardHeader({ title, actions }: DashboardHeaderProps) {
    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            {actions}
        </div>
    );
}