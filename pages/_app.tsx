import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'
import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config({ ctx }){
    return {
      url: process.env.TRPC_URL || "/api/trpc"
    }
  },
  ssr: true
})(MyApp)
