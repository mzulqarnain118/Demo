import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import routes from '../appConfig/routes';
import { AUTH } from '../appConfig';
import { useSelector, useDispatch } from 'react-redux'
import { addLogin } from 'store/action/loggedin_action';

const withAuth = WrappedComponent => props => {

    const router = useRouter()
    const [isVerified, setIsVerified] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (router) {
            if (!Cookies.get(AUTH.AUTH_TOKEN)) {
                router.push(routes.LOGIN)
                dispatch(addLogin(false))
            } else {
                setIsVerified(true);
                dispatch(addLogin(true))
            }
        }
    }, [router])

    return <>{isVerified && <WrappedComponent {...props} />}</>
};
export default withAuth