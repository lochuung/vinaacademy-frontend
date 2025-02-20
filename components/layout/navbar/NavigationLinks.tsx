import Link from "next/link";

export const NavigationLinks = () => {
    const links = [
        { href: "/blog", label: "Blog" },
        { href: "/teaching", label: "Trở thành Giảng viên" },
    ];

    return (
        <ul className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className="text-gray-700 hover:text-black transition-colors duration-200"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default NavigationLinks;