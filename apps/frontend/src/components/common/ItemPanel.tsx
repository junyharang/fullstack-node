import type {ItemPanelProps} from '../../common/type/Props';
import Item from "./Item.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../common/redux/store.ts";
import AddItem from "./AddItem.tsx";
import PageTitle from "./PageTitle.tsx";
import {useEffect, useState} from "react";
import {fetchGetItems} from "../../common/redux/slices/apiSlice.ts";
import {useAppDispatch} from "../../common/redux/hooks.ts";
import LoadingSkeleton from "./LoadingSkeleton.tsx";
import {SkeletonTheme} from 'react-loading-skeleton';
import type {GoogleOauthResponse, TaskType} from "../../common/Type.ts";
import Modal from "./Modal.tsx";

const ItemPanel = ({pageTitle, filteredCompleted, filteredImportant = false}: ItemPanelProps) => {
    let googleOauthResponseValue: GoogleOauthResponse | null = useSelector((state: RootState) => state.auth.googleOauthResponse);
    let userIdentifier: string | undefined = googleOauthResponseValue?.sub;
    let getTaskData = useSelector((state: RootState) => state.api.getItemsData);
    let isOpen = useSelector((state: RootState) => state.modal.isOpen);
    let dispatch = useAppDispatch();
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userIdentifier) {
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                await dispatch(fetchGetItems(userIdentifier)).unwrap();
            } catch (error) {
                console.error(`ItemPanel - 투두 정보를 가져오는 데 실패했어요! 실패 이유: ${JSON.stringify(error)}`);
            } finally {
                setLoading(false);
            }
        }

        void fetchData();

    }, [dispatch, userIdentifier])

    // 1. home 메뉴를 서택할 때:
    // - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
    // - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
    // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환

    // 2. Completed 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
    // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환

    // 3. Proceeding 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
    // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환

    // 4. Important 메뉴를 선택할 때:
    // - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
    // - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
    // - filterImportant가 true이면 task.isimportant가 true인 task만 반환

    const filteredTasks = getTaskData?.filter((task: TaskType) => {
        if (filteredCompleted === 'all') {
            if (filteredCompleted) {
                return task.isCompleted;
            } else {
                return !task.isCompleted;
            }
        }
    }).filter((task: TaskType) => {
        if (!filteredImportant) {
            if (filteredCompleted) {
                return task.isImportant;
            } else {
                return !task.isImportant;
            }
        }

        if (filteredCompleted) {
            task.isImportant;
        } else {
            !task.isImportant;
        }
    });

    return (
        <div className='panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto'>
            {userIdentifier ? (
                <div className='login-message w-full h-full'>
                    {isOpen && <Modal/>}
                    <PageTitle title={pageTitle}/>

                    <div className='flex flex-wrap'>
                        {loading ? (
                            <SkeletonTheme baseColor='#202020' highlightColor='#444' height='25vh'>
                                {/*{[...Array(getTaskData?.length)].map((_: any, index: number) => (*/}
                                {/*    <LoadingSkeleton key={index}/>*/}
                                {/*))}*/}
                                <LoadingSkeleton/>
                                <LoadingSkeleton/>
                                <LoadingSkeleton/>
                            </SkeletonTheme>
                        ) : (
                            filteredTasks?.map((task: TaskType, index: number) => {
                                    return <Item key={index} task={task}/>
                                }
                            ))}

                        <AddItem/>
                    </div>
                </div>

            ) : (
                <div className='login-message w-full h-full flex items-center justify-center'>
                    <button
                        className='flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md'>
                        <span className='text-sm font-semibold'>
                            로그인 부탁해요! 🙏
                        </span>
                    </button>
                </div>
            )}
        </div>
    )
}
export default ItemPanel
