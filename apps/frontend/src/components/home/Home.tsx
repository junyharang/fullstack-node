import NavigatorBar from "../common/NavigatorBar.tsx";
import ItemPanel from "../common/ItemPanel.tsx";

const Home = () => {
    return (
        <div className='page_section'>
            <NavigatorBar/>

            <ItemPanel pageTitle="메인 페이지" filteredCompleted='all'/>
        </div>
    )
}
export default Home
