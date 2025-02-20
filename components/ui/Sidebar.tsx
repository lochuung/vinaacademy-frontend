import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard">
                        <span className="block px-4 py-2 rounded hover:bg-gray-700">Admin</span>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/instructor">
                        <span className="block px-4 py-2 rounded hover:bg-gray-700">Instructor</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
