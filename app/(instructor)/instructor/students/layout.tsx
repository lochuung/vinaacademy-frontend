export default function InstructorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-[90%] ml-20">{children}</div>;
}
