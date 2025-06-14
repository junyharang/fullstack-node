import {IoAddCircleOutline} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {openModal} from "../../common/redux/slices/modalSlice";

const AddItem = () => {
    const dispatch = useDispatch();

    const handelOpenModal = () => {
        dispatch(openModal({modalStatus: 'create', task: null}));
    }

    return (
        <div className='add-card item w-1/3 h-[25vh] p-[0.25rem]'>
            <div className='w-full h-full border border-gray-500 rounded-md flex py-3 items-center justify-center'>
                <button className='flex items-center gap-2' onClick={handelOpenModal}>
                    <IoAddCircleOutline className='w-8 h-8 text-gray-400 font-light'/>

                    <span className='text-gray-400 cursor-pointer group-hover:text-gray-200'>할일 추가하기</span>
                </button>
            </div>
        </div>
    )
}
export default AddItem
