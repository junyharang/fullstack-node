import NavigatorBar from "../common/NavigatorBar.tsx";
import ItemPanel from "../common/ItemPanel.tsx";

const Proceed = () => {
    return (
        <div className='page_section'>
            <NavigatorBar/>

            <ItemPanel pageTitle="진행 상황" filteredCompleted={false}/>
        </div>
    )
}
export default Proceed
