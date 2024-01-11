// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel, Zoom } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { profile } from '../../axios/axios';

function ProfileCarousel() {
    const [data, setData] = useState()

    useEffect(() => {
        async function fetchData() {
            let profilesData = await profile.get('/getallprofile')
            profilesData = profilesData.data.data
            setData(profilesData)
        }
        fetchData()
    }, [])

    return (
        <div className='max-w-[38rem] mx-auto pt-3 mb-8 '>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, Zoom]}
                spaceBetween={0}
                slidesPerView={5}
                navigation
            >
                {
                    data ?
                        data.map((e) =>
                            <SwiperSlide key={e.id}>
                                <ProfileIcon username={e.username} profilePhoto={e.profilePhoto} />
                            </SwiperSlide>
                        ) :

                        Array.from({ length: 5 }).map((_) =>
                            <SwiperSlide>
                                <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">
                                    <div className='flex flex-col items-center justify-center'>
                                        <Skeleton width={80} height={80} circle borderRadius={50} />
                                        <Skeleton width={70} height={10} />
                                    </div>
                                </SkeletonTheme>
                            </SwiperSlide>
                        )


                }
            </Swiper>
        </div>
    )
}

export default ProfileCarousel

export const ProfileIcon = ({ username, profilePhoto }) => {
    const navigate = useNavigate()
    return (
        <>
            <div onClick={() => { navigate(`/profile/${username}`) }} className='cursor-pointer select-none flex flex-col items-center justify-center'>
                <img className="select-none md:h-20 md:w-20 h-16 w-16 rounded-full border-2 border-y-purple-600 border-x-violet-500 p-[3px] object-cover "
                    src={profilePhoto}
                    alt='' />
                <span className='pl-1 truncate md:w-20 w-16'>{username}</span>
            </div>
        </>
    )
}