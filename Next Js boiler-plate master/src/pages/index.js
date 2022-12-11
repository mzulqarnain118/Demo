import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import router from "next/router"
import routes from 'appConfig/routes'
import { AUTH } from 'config'

export default function Index() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log(AUTH.AUTH_TOKEN)
    if (Cookies.get(AUTH.AUTH_TOKEN)) {
      router.push(routes.DASHBOARD)
    }
    else{
      router.push(routes.LOGIN)
    }
  }, [])

  return (<>
  {!loading && <></> }
  </>)
}
