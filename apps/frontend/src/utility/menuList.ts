import {MdFactCheck, MdHome, MdWatchLater} from 'react-icons/md';
import {AiFillExclamationCircle} from 'react-icons/ai';
import type {IconType} from 'react-icons';

// 📌 개별 메뉴 타입 정의
export interface NavigationMenu {
    label: string;
    to: string;
    icon: IconType;
    index: number;
}

// 📌 메뉴 배열
export const navigationMenus: NavigationMenu[] = [
    {
        label: 'Home',
        to: '/',
        icon: MdHome,
        index: 0,
    },
    {
        label: 'Completed',
        to: '/completed',
        icon: MdFactCheck,
        index: 1,
    },
    {
        label: 'Proceeding',
        to: '/proceeding',
        icon: MdWatchLater,
        index: 2,
    },
    {
        label: 'Important',
        to: '/important',
        icon: AiFillExclamationCircle,
        index: 3,
    },
];

// import { MdHome } from 'react-icons/md';
// import { MdFactCheck } from 'react-icons/md';
// import { MdWatchLater } from 'react-icons/md';
// // import { BsFillExclamationSquareFill } from 'react-icons/bs';
// import { AiFillExclamationCircle } from 'react-icons/ai';
//
//
// export const navigationMenus = [
//     { label: 'Home', to: '/', icon: <MdHome className="w-5 h-5" />, index: 0 },
//     {
//         label: 'Completed',
//         to: '/completed',
//         icon: <MdFactCheck className="w-5 h-5" />,
//         index: 1,
//     },
//     {
//         label: 'Proceeding',
//         to: '/proceeding',
//         icon: <MdWatchLater className="w-5 h-5" />,
//         index: 2,
//     },
//     {
//         label: 'Important',
//         to: '/important',
//         // icon: <BsFillExclamationSquareFill className="w-4 h-4" />,
//         icon: <AiFillExclamationCircle className="w-5 h-5" />,
//         index: 3,
//     },
// ];
//
//
//
//
