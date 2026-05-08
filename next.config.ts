import createNextIntlPlugin from 'next-intl/plugin'
import { LINKS } from '@/constants/links'

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
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
})
