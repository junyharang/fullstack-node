import NavigatorBar from "../common/NavigatorBar.tsx";
import ItemPanel from "../common/ItemPanel.tsx";

const Completed = () => {
    return (
        <div className='page_section'>
            <NavigatorBar/>

            <ItemPanel pageTitle="완료!" filteredCompleted={true}/>
        </div>
    )
}
export default Completed
