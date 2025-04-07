export default function ProfileLayout({
                                          children,
                                      }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="mt-[-37px]">
            {children}

        </main>

    );
}