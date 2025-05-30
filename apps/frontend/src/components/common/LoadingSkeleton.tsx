import Skeleton from 'react-loading-skeleton'

const LoadingSkeleton = () => {
    return (
        <div>
            <div className='w-1/3 flex flex-col p-4 justify-between'>
                <div>
                    <Skeleton width='40%' height='30px'/>
                </div>

                <div>
                    <Skeleton width='100%' height='30px'/>
                    <Skeleton width='100%' height='30px'/>
                    <Skeleton width='100%' height='30px'/>
                    <Skeleton width='100%' height='30px'/>
                </div>
            </div>
        </div>
    )
}
export default LoadingSkeleton
