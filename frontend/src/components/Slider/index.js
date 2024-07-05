import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SETTINGS from '../../setting.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import banner1 from '../../assets/images/BANNER 1.png';
import banner2 from '../../assets/images/BANNER 2.png';
import banner3 from '../../assets/images/BANNER 3.png';
// import banner4 from '../../assets/images/banner.jpg';

const axios = require('axios').default;

function Slider() {
    let [banners, setBanners] = useState([banner1, banner2, banner3]);
    // useEffect(() => {
    //     axios
    //         .get(`${SETTINGS.BASE_URL}/api/webapi/list/banners`, {
    //             headers: {
    //                 'x-access-token': localStorage.getItem('auth'),
    //                 'Access-Control-Allow-Origin': '*',
    //             },
    //         })
    //         .then(function (response) {
    //             let data = response.data;
    //             if (data.status === 'ok') {
    //                 setBanners(data.data);
    //             }
    //         })
    //         .catch(function (error) {
    //             toast.error('Có lỗi xảy ra', { theme: 'light' });
    //         });
    // }, []);

    // if (!Array.isArray(banners)) return false;

    return (
        <Carousel
            autoPlay={true}
            showArrows={false}
            showStatus={false}
            dynamicHeight={true}
            emulateTouch={true}
            infiniteLoop={true}
            interval={2500}
            showIndicators={true}
            showThumbs={false}
            swipeable={true}
        >
            {banners.map((img, i) => {
                return (
                    <div key={i}>
                        <img src={img} alt="banner" />
                    </div>
                );
            })}
        </Carousel>
    );
}

export default Slider;
