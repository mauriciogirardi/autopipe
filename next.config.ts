import type { NextConfig } from 'next'
import { LINKS } from '@/constants/links'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: LINKS.HOME,
        destination: LINKS.WORKFLOWS,
        permanent: false,
      },
    ]
  },
}

export default nextConfig
