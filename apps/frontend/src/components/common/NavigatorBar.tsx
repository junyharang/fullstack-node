import {type NavigationMenu, navigationMenus} from "../../utility/menuList.ts";
import {Link, useLocation} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {type CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../common/redux/slices/authSlice";
import {useCallback, useState} from "react";
import type {RootState} from "../../common/redux/store";
import {jwtDecode} from "jwt-decode";

const NavigatorBar = () => {
    const googleClientId: string = import.meta.env.VITE_AUTH_CLIENT_ID as string;
    const user: any = useSelector((state: RootState): any => state.auth.googleOauthResponse);
    const {name} = user && user.user ? user.user : '알 수 없음';
    const [isAuth, setIsAuth] = useState<boolean>(!!name);

    const dispatch = useDispatch();
    const isActive = (path: string) => useLocation().pathname === path;

    const handleLoginSuccess = useCallback((credentialResponse: CredentialResponse) => {
            try {
                if (!credentialResponse.credential) {
                    throw new Error(`구글 인증에 문제가 있어요! \n 문제 내용 : ${credentialResponse.credential}`);
                }

                dispatch(login({googleOauthResponseValue: jwtDecode(credentialResponse.credential)}));

                setIsAuth(true);

            } catch (error) {
                console.error(error);
            }
        }, [dispatch]
    );

    const handleLoginFailure = (error: void) => {
        console.log(`Google Login에 실패 했어요! \n 실패 내용 : ${error}`)
    };

    const handleLogoutClick = () => {
        dispatch(logout());

        setIsAuth(false);
    }

    return (
        <nav
            className='bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center'>
            <div className='logo-wrapper flex w-full items-center justify-center gap-8'>
                <div className="logo"></div>

                <h2 className='font-semibold text-xl>'>
                    <Link to="/">JUNYss-H</Link>
                </h2>
            </div>

            <ul className='menus'>
                {navigationMenus.map((menu: NavigationMenu, index: number) => {
                        const Icon = menu.icon;

                        return (
                            <li className={`rounded-sm mb-1 border border-gray-700 hover:bg-gray-950 transition-all duration-300 
                            ${isActive(menu.to) ? 'bg-gray-950' : ''}`}
                                key={index}>
                                <Link className='flex gap-x-4 items-center py-2 px-10' to={menu.to}>
                                    <Icon/> {menu.label}
                                </Link>
                            </li>
                        )
                    }
                )}
            </ul>

            {isAuth ? (
                <div className='w-4/5 flex items-center'>
                    <button
                        className='flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full'
                        onClick={handleLogoutClick}>
                        <FcGoogle className='w-5 h-5'/>

                        <span className='text-sm'>
                            {name} 님 로그아웃!
                        </span>
                    </button>
                </div>
            ) : (
                <div className='authenticate-wrapper login-button flex flex-center w-4/5'>
                    <GoogleOAuthProvider clientId={googleClientId}>
                        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure}/>
                        <button
                            className='flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full'>
                            <FcGoogle className='w-5 h-5'/>

                            <span className='text-sm'>
                        Google Login
                    </span>
                        </button>
                    </GoogleOAuthProvider>
                </div>
            )}

        </nav>
    )
}
export default NavigatorBar
