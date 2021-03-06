import React, {useContext} from 'react';
import arrow from '../svg/arrow-up-solid.svg';
import '../css/FixedBtn.css';
import '../css/DetailPage.css';
import {Link, useParams} from 'react-router-dom';
import {dataContext} from '../context/context';

const DetailPage = () => {
    const scroll = () => {
        window.scrollTo(0, 0);
    }

    const param = useParams();
    const {arrMovie} = useContext(dataContext);
    const arr = arrMovie.filter(item => item.category === param.category.replace(/-/g, ' '));
    const data = [];
    /* Random item number */
    let randomNum;
    
    if(typeof arr[0] !== 'undefined' && arr[0].list.length !== 0) {
        const data2 = arr[0].list.filter(item => item.urlTitle === param.title);
        data.push(...data2);
        randomNum = Math.floor(Math.random() * arr[0].list.length) - 4;
    }

    return (
        <div className="main-detail-page">
            <div className="main-detail">
                {
                    data.length !== 0 && data.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <img src={item.imageUrl} alt="" />
                                <ul className="main-detail-info">
                                    <span title={item.title}>{item.title}</span>
                                    <div className="main-detail-category">
                                        <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                        <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}>{item.category}</Link>
                                    </div>
                                    {item.episode.length === 1 && <Link to={`/watchmovie/title=${item.urlTitle}&episode=ban-full`}>Xem phim</Link>}
                                    {item.episode.length === 0 && <Link to={`/detail/category=${item.category}/title=${item.urlTitle}`} style={{cursor: "default", backgroundColor: "gray"}}>Phim ch??a ???????c c???p nh???t !</Link>}
                                    <ul className="main-detail-episode">
                                        {item.episode.length !== 1 && item.episode.map((num) => 
                                            <li key={num.episode}>
                                                <Link to={`/watchmovie/title=${item.urlTitle}&episode=tap-${num.episode}`}>T???p {num.episode}</Link>
                                            </li> 
                                        )}
                                     </ul>
                                    <ul className="main-detail-description">
                                        <li>Th???i l?????ng: <span>?? ph??t/t???p</span></li>
                                        <li>N??m s???n xu???t: <span>??</span></li>
                                        <li>Ng??y c??ng chi???u: <span>??/??/2021</span></li>
                                        <li>Qu???c gia: <span>??</span></li>
                                        <li>Th??? lo???i: <span>{item.category}</span></li>
                                        <li>Di???n vi??n: <span>?</span></li>
                                        <li>{item.content}</li>
                                    </ul>
                                </ul>
                            </React.Fragment>
                        );
                    })
                }
            </div>
            <div className="main-detail-others">
                <span>C?? th??? b???n c??ng mu???n xem</span>
                <ul>
                    {
                        typeof arr[0] !== 'undefined' && arr[0].list.length > 0 && arr[0].list.length === 4 && arr[0].list.slice(0,4).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="main-detail-others-name" title={item.title}>{item.title}</Link>
                                    <div className="main-detail-category others">
                                        <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                        <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}>{item.category}</Link>
                                    </div>
                                </li>
                            );
                        })
                    }
                    {
                        typeof arr[0] !== 'undefined' && arr[0].list.length > 0 && arr[0].list.length >= 4 && arr[0].list.slice(randomNum, randomNum + 4).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} style={{backgroundImage: `url(${item.imageUrl})`}} />
                                    <Link to={`/detail/category=${item.category.replace(/\s/g, '-')}&title=${item.urlTitle}`} className="main-detail-others-name" title={item.title}>{item.title}</Link>
                                    <div className="main-detail-category others">
                                        <img src="https://www.ssphim.net/static/5fe2d564b3fa64a886a11cee/5fe2d564b3fa647446a11d19_tag.svg" width="17" alt="" />
                                        <Link to={`/category/category=${item.category.replace(/\s/g, '-')}&page=1`}>{item.category}</Link>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className="fixed-btn" onClick={scroll}><img src={arrow} alt="" width="20" /></div>
        </div>
    );
}

export default DetailPage;