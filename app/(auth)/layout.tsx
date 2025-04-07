export default function ProfileLayout({
                                          children,
                                      }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="relative mt-[-37px]">
            {children}
        </div>


    );
}