import Image from 'next/image'

export default function LayoutAuth({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex p-4 flex-col gap-4 items-center justify-center h-dvh w-full">
      <div className="flex items-center gap-2 justify-center">
        <Image src="logo.svg" alt="Autopipe" width={20} height={20} />
        <h2 className="font-semibold">Autopipe</h2>
      </div>
      <div className="w-full md:w-96">{children}</div>
    </div>
  )
}
