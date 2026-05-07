'use client'

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LINKS } from '@/constants/links'
import { authClient } from '@/lib/auth-client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

const menuItems = [
  {
    title: 'Main',
    items: [
      { title: 'Workflows', icon: FolderOpenIcon, url: LINKS.WORKFLOWS },
      { title: 'Credentials', icon: KeyIcon, url: LINKS.CREDENTIALS },
      { title: 'Executions', icon: HistoryIcon, url: LINKS.EXECUTIONS },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(LINKS.LOGIN)
        },
      },
    })
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-3 h-10 px-4">
            <Link href={LINKS.WORKFLOWS} prefetch>
              {/** biome-ignore lint/performance/noImgElement: not otimize */}
              <img src="logo.svg" alt="Autopipe" className="size-6" />
              <span className="font-bold">Autopipe</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                    asChild
                    className="gap-x-3 my-2 h-10 px-4 flex"
                  >
                    <Link href={item.url} prefetch>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Upgrade to Pro" className="gap-x-3 h-10 px-4">
              <StarIcon className="size-4" />
              <span>Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Billing Portal" className="gap-x-3 h-10 px-4">
              <CreditCardIcon className="size-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              tooltip="Sing out"
              className="gap-x-3 h-10 px-4"
            >
              <LogOutIcon className="size-4" />
              <span>Sing out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
