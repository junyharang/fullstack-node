import {IoMdClose} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../common/redux/slices/modalSlice.ts";
import type {RootState} from "../../common/redux/store.ts";
import React, {useEffect, useState} from "react";
import type {GoogleOauthResponse, ModalStatus} from "../../common/Type.ts";
import {toast} from "react-toastify";
import {fetchPostItems} from "../../common/redux/slices/apiSlice.ts";
import {useAppDispatch} from "../../common/redux/hooks.ts";

const Modal = () => {
    let dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    let {modalStatus, task} = useSelector((state: RootState) => state.modal);

    let userGoogleOauthSubValue = useSelector((state: RootState): GoogleOauthResponse | null => state.auth.googleOauthResponse)?.sub

    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        description: '',
        createdDateTime: '',
        isComplete: false,
        isImportant: false,
    });

    useEffect(() => {
        setFormData({
            userId: userGoogleOauthSubValue ?? '',
            title: task?.title ?? '',
            description: task?.description ?? '',
            createdDateTime: new Date(task?.createdDateTime ?? new Date()).toISOString().split('T')[0],
            isComplete: task?.isCompleted ?? false,
            isImportant: task?.isImportant ?? false,
        });
    }, [modalStatus, task, userGoogleOauthSubValue]);

    const showModal = (modalType: boolean, modalStatus: ModalStatus) => {
        if (!modalStatus || !modalType) {
            return '할일 추가 하기';
        }

        if (modalType === true) {
            switch (modalStatus) {
                case 'update':
                    return '할일 수정 하기';
                case 'detail':
                    return '할일 상세 보기';
                default:
                    return '할일 추가 하기';
            }
        } else {
            switch (modalStatus) {
                case 'update':
                    return '할일 수정 하기';
                default:
                    return '할일 추가 하기';
            }
        }
    };

    const modalTitle = showModal(true, modalStatus);
    const modalButton = showModal(false, modalStatus);

    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let target: HTMLInputElement | HTMLTextAreaElement = changeEvent.target as HTMLInputElement | HTMLTextAreaElement;
        const {name, value, type  } = target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const dispatch = useAppDispatch();
        // 디폴트 기능 방지
        event.preventDefault();

        if (!userGoogleOauthSubValue) {
            toast.error('누구세요?');

            return;
        }

        if (!formData.title) {
            toast.error('제목을 반드시 입력해 주세요! 😤');

            return;
        }

        if (!formData.description) {
            toast.error('내용을 반드시 입력해 주세요! 😤');

            return;
        }

        if (!formData.createdDateTime) {
            toast.error('날짜을 반드시 입력해 주세요! 😤');

            return;
        }

        try {
            await dispatch(fetchPostItems(formData)).unwrap();

            toast.success('할일이 정상적으로 추가 되었어요! 🥳');

        } catch (error) {
            console.error(`할일 추가 중 문제 발생! \n 문제 내용: ${(error as Error).message}`);

            toast.error('할일 추가하는데, 문제가 발생했어요! 😦');
        }
    };

    return (
        <div
            className='modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50'>
            <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4">
                <h2 className='text-2xl border-b border-b-gray-300 w-fit font-semibold'>
                    {modalTitle}
                </h2>

                <form className='w-full' onSubmit={handleSubmit}>
                    <div className="input-control">
                        <label htmlFor="title">제목</label>

                        <input name='title' id='title' type="text" placeholder='제목 입력해 주세요! 😤'
                               value={formData.title}
                               onChange={handleChange}
                               disabled={typeof modalStatus === 'string' && modalStatus === 'detail'}
                        />
                    </div>

                    <div className="input-control">
                        <label htmlFor="description">내용</label>

                        <textarea name="description" id="description" placeholder='내용 입력해 주세요! 😤'
                                  value={formData.description}
                                  onChange={handleChange}
                                  disabled={typeof modalStatus === 'string' && modalStatus === 'detail'}
                        />

                    </div>

                    <div className="input-control">
                        <label htmlFor="date">입력 날짜</label>

                        <input name='date' id='date' type="date"
                               value={formData.createdDateTime}
                               onChange={handleChange}
                               disabled={typeof modalStatus === 'string' && modalStatus === 'detail'}
                        />
                    </div>

                    <div className="input-control toggler">
                        <label htmlFor="isCompleted">완료 여부</label>

                        <input name='isCompleted' id='isCompleted' type="checkbox"
                               checked={formData.isComplete}
                               onChange={handleChange}
                               disabled={typeof modalStatus === 'string' && modalStatus === 'detail'}
                        />
                    </div>

                    <div className="input-control toggler">
                        <label htmlFor="isImportant">중요 여부</label>

                        <input name='isImportant' id='isImportant' type="checkbox"
                               checked={formData.isImportant}
                               onChange={handleChange}
                               disabled={typeof modalStatus === 'string' && modalStatus === 'detail'}
                        />
                    </div>

                    <div className="submit-button flex justify-end">
                        <button className={`flex justify-end bg-black py-3 px-6 rounded-md hover:bg-slate-900
                        ${modalStatus === 'detail' ? 'hidden' : ''}`} type='submit'>
                            {modalButton}
                        </button>
                    </div>
                </form>

                <IoMdClose className='absolute right-10 top-10 cursor-pointer' onClick={handleCloseModal}/>
            </div>
        </div>
    );
};

export default Modal
