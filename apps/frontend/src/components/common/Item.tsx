import {MdEditDocument} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import type {TaskType} from "../../common/Type";
import {useState} from "react";
import {fetchDeleteCompleted, fetchGetItems, fetchUpdateCompleted} from "../../common/redux/slices/apiSlice";
import {toast} from 'react-toastify';
import {useAppDispatch} from "../../common/redux/hooks";
import {openModal} from "../../common/redux/slices/modalSlice";

const Item = ({task}: { task: TaskType }) => {
    const {id, userId, title, description, createdDateTime, updatedDateTime, isCompleted, isImportant} = task;
    const [todoCompleteStatus, setTodoCompleteStatus] = useState<boolean>(isCompleted);
    const dispatch = useAppDispatch();
    const changeCompleted = async () => {
        // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
        // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

        // 상태를 미리 업데이트 하여 반영된 값을 사용
        setTodoCompleteStatus(!todoCompleteStatus);

        const updateCompletedKeys = {
            updatedDateTime: updatedDateTime,
            isCompleted: !todoCompleteStatus,
        };

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateCompletedKeys),
        };

        try {
            await dispatch(fetchUpdateCompleted(options)).unwrap();

            if (todoCompleteStatus) {
                toast.success('할일 완료!');
            } else {
                toast.success('할일 진행 중!');
            }

            await dispatch(fetchGetItems(userId)).unwrap();
        } catch (error) {
            console.error(`할 일 상태 변경에 실패했어요! ${error}`);
        }
    }

    const textLengthOverCut = (description: string, length: number, lastText: any) => {
        if (!description) {
            throw new Error('Todo Description 값이 없어요!');
        }

        if (!length) {
            length = 20;
        }

        if (!lastText) {
            lastText = '...';
        }

        if (description.length > length) {
            description = description.substr(0, length) + lastText;
        }

        return description;
    }

    const handleDetailOpenModal = () => {
        dispatch(openModal({
            modalStatus: 'detail'
        }));
    };

    const handleEditOpenModal = () => {
        dispatch(openModal({
            modalStatus: 'update'
        }));
    };

    const handleDeleteItem = async () => {
        let confirm: boolean = window.confirm('정말 삭제하실거에요? 🤔');
        let errorMessage: string = '할 일 삭제 실패하였어요!';

        if (!confirm) {
            toast.error(errorMessage);

            throw new Error(errorMessage);
        }

        if (!id) {
            toast.error(errorMessage);

            throw new Error(`${errorMessage} 할일 고유 번호가 이상해요! index : ${id}`);
        }

        if (!userId) {
            toast.error(errorMessage);

            throw new Error(`${errorMessage} 사용자 고유값이 이상해요! userId : ${userId}`);
        }

        try {
            await dispatch(fetchDeleteCompleted({userId, index: id})).unwrap();

            toast.success('할 일 삭제 성공했어요!');

            await dispatch(fetchGetItems(userId)).unwrap();
        } catch (error: any) {
            toast.error(`${errorMessage}`);

            throw new Error(`${errorMessage} 문제 내용 : ${error.message}`);
        }
    }

    return (
        <div className='item w-1/3 h-[25vh] p-[0.25rem]'>
            <div
                className='w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between bg-gray-950'>
                <div className="upper">
                    <h2 className='text-xl font-normal mb-3 relative pb-2 flex justify-between border-b'>
                        <span className='bottom-0'>
                            {title}
                        </span>

                        <span
                            className='text-sm py-1 px-3 border border-gray-500 rounded-sm hover:bg-gray-700 cursor-pointer'
                            onClick={handleDetailOpenModal}>
                            자세히
                        </span>
                    </h2>

                    <p style={{whiteSpace: 'pre-wrap'}}>
                        {textLengthOverCut(description, 10, "...")}
                    </p>
                </div>

                <div className="lower">
                    <p className='text-sm mb-1'>
                        {new Date(createdDateTime).toLocaleString()}
                    </p>

                    <div className='itemt-footer flex justify-between'>
                        <div className='item-footer-left'>
                            {isCompleted ? (
                                <button className='block py-1 px-4 bg-green-400 text-sm text-white rounded-md'
                                        onClick={changeCompleted}>
                                    Completed
                                </button>
                            ) : (
                                <button className='block py-1 px-4 bg-cyan-500 text-sm text-white rounded-md'
                                        onClick={changeCompleted}>
                                    InCompleted
                                </button>
                            )}

                            {isImportant && (
                                <button className='block py-1 px-4 bg-red-500 text-sm text-white rounded-md'>
                                    Important
                                </button>
                            )}

                        </div>
                    </div>

                    <div className='item-footer-right flex gap-2'>
                        <button>
                            <MdEditDocument className='w-5 h-5' onClick={handleEditOpenModal}/>
                        </button>

                        <button onClick={handleDeleteItem}>
                            <FaTrash/>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Item
