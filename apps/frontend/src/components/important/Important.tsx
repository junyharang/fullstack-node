import NavigatorBar from "../common/NavigatorBar.tsx";
import ItemPanel from "../common/ItemPanel.tsx";

const Important = () => {
    return (
        <div className='page_section'>
            <NavigatorBar/>

            <ItemPanel pageTitle="중요도" filteredCompleted='all' filteredImportant={true}/>
        </div>
    )
}
export default Important
