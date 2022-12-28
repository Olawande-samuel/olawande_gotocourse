
import { useEffect } from 'react'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from 'styled-components'

// Import Swiper styles
import "swiper/css";
import { changeConstants, getFullDate, gotoclassPayment, KEY } from '../../constants';
import { AdvancedError } from '../../classes';
import { upskillAltData } from './UpskillCourse';
import { useLocalStorage } from '../../hooks';
import { Box, Popover } from '@mui/material';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
    grid-auto-rows: 392px;
    /* overflow: hidden; */
    gap: 1.5rem;
    justify-content:space-around;
    padding: .5rem;
    
    @media screen and (min-width: 1400px) {
        grid-template-columns: repeat(4, 230px);
        justify-content: space-evenly;
        gap: 1rem;
    }
    
    @media screen and (max-width:768px){
        grid-template-columns: repeat(2, 230px);
    }

    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
    `

const UpCoursesCard = styled.div`
    /* border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    border-radius: 8px; */
    height: 390px;
    display: flex;
    flex-direction:column;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 90px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    
    img {
        height: 40%;
        min-height: 40%;
        max-width: 100%;
        object-fit:cover;
        object-position: center;
        border: 1.5px solid #FFCE31;
    }
    small {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 4.5rem
        
        
    }

    h5 {
        font-weight: 800;
        text-transform: capitalize;
        font-size: 16px;
        margin-block: .7rem;
        cursor: pointer;

    }
     
    button {
        color:#0072EF;
        font-size:14px;
        border:none;
        outline:none;
        background:#fff;
    }
    .up_content {
        padding-inline: 1.5rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        height: 60%;
        /* height: -webkit-fill-available; */


        .cta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            font-size: 13px;
            // margin-top: 1rem;
    
            span:first-child {
                cursor: pointer;
                transition: color .3s ease; 
    
                :hover {
                    color: var(--theme-blue)
                }
            }
            span:last-child {
                color: var(--theme-orange)
            }
            .ct_bar{
                width:1px;
                height:100%;
                background: #333;
            }
        }
    }
    .ct_bar{
            width:1px;
            height:100%;
            background: #333;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .cta {
        font-size: 14px;
        border: none;
        outline: none;
        background:#fff;

            :hover {
                color: var(--theme-blue);
            }
        }
        span {
            font-size:14px;
            color: var(--theme-orange)
        }
    } 
    
`


export function Up() {
  return (
    <section className="newCategories mt-4" id="upcoming">
      <div className="container-xxl">
        <header className="newCategories_header_wrapper">
          <h1 className="newCategories_header">Upcoming courses</h1>
          {/* <p className="sub_title text-start" style={{width:"min(100% - 1rem, 1300px)"}}></p> */}
        </header>
        <TabsComp />

      </div>
    </section>
  );

}


export function TabsComp() {
  const { otherFunctions: { fetchBootcamps }, } = useAuth();
  const [shorts, setShorts] = useState([])

  const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
    notifyOnChangeProps: ["category", "isFetching"],

    onSuccess: (res) => {
      if (res.data.length > 0) {
  
        const uppers = res.data.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive);
        // console.log({ uppers });
        setShorts(uppers)
      }
    }
  })

  return (
    <>
      <div className="popular_views dark_border">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={true}
          speed={2500}
          autoplay={{ delay: 2400 }}
          spaceBetween={0}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // when window width is >= 640px
            575: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 28,
            },
            1704: {
              slidesPerView: 4.5,
              spaceBetween: 28,
            },
          }}
        >
          <Grid>
            {
              shorts?.filter(item => item.isActive).sort(() => 0.5 - Math.random()).map(item => (
                <SwiperSlide key={item.categoryId}>
                  <Card {...item} all={item} key={item.bootcampId} />
                </SwiperSlide>
              ))
            }
          </Grid>
        </Swiper>

      </div>

    </>
  )
}


export function Card({ title, bootcampImg, bootcampId, category, description, startDate, duration, price, packages, popupTitle, popupArr, all }) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getWishList()

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  //   console.log({all});


  // Call to Action
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { getItem } = useLocalStorage();

  const userdata = getItem(KEY)
  //wishlist

  let [wishlistState, setWishlistState] = useState(false)
  const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { addwishlistCourse, fetchWishlist, deleteFromWishlist } } = useAuth()

  async function addToWishlist() {
    setGeneralState({ ...generalState, loading: true })

    if (userdata !== null) {
      try {
        const response = await addwishlistCourse(bootcampId, userdata?.token)
        const { success, message, statusCode } = response
        if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
        const { data } = response
        setWishlistState(true)
      } catch (error) {
        console.error(error)
      } finally {
        setGeneralState({ ...generalState, loading: false })

      }


    } else {
      navigate("/login")
    }
  }



  async function getWishList() {
    try {
      const res = await fetchWishlist(userdata?.token);
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else if (statusCode === 1) {
        const { data } = res;
        if (data.length > 0) {
          setWishlistState(data.map(d => d.courseId).includes(bootcampId));
        } else {

        }

      } else {
        throw new AdvancedError(message, statusCode);
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  // useEffect(() => {
  //   getWishList()
  // }, [setWishlistState])

  useEffect(() => {
    const ownListItem = upskillAltData.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())
    if (ownListItem.length > 0) {
      setData(ownListItem[0])
    }

  }, [title])

  async function removeCourse(e) {
    e.preventDefault();
    try {
      setGeneralState({ ...generalState, loading: true })
      const res = await deleteFromWishlist(userdata?.token, bootcampId)
      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        setWishlistState(false)
        handleClose()
      }
    } catch (err) {

    } finally {
      setGeneralState({ ...generalState, loading: false });
    }
  }

  async function handleBootstrapEnrollment(e, title, category, bootcampId, navigate) {

    e.preventDefault();
    if (userdata?.token) {
      // localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
      gotoclassPayment(title, category, bootcampId, navigate)
    } else {
      navigate("/login")
    }
  }

  return (
    <UpCoursesCard>
      <img src={bootcampImg} alt="" />
      <div className="up_content">
        <div>
          <h5 aria-describedby={id} variant="contained" onClick={handleClick}>{title}</h5>
          <div className="d-flex justify-content-between">
            <small>{duration}</small>
            <small>$ {packages.length > 0 ? packages[0].price : price}</small>
          </div>
          <div className="d-flex justify-content-between" style={{color: "var(--theme-blue"}}>
            <p>Start Date:</p>
            {/* <p>{new Date(startDate).toLocaleDateString()}</p> */}
            <p>{getFullDate(startDate)}</p>

          </div>
        </div>

        {/* <small dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
        <div className="foot d-flex justify-content-center">
          <button className="cta" aria-describedby={id} variant="contained" onClick={handleClick}>View More</button>
          {/* <div className="ct_bar"></div>

          <span>{changeConstants(packages[0]?.title)}</span> */}
        </div>
        {/* <div>
                  <button aria-describedby={id} variant="contained" onClick={handleClick}>{"Explore >"}</button>
              </div> */}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }} className="pop_container">
          <header>
            <h5 className="fw-bold text-capitalize">{popupTitle}</h5>
          </header>
          <div>
            {/* <div className="d-flex justify-content-between mb-3">
                          <span className="fw-bold">{duration}</span>
                          <span className="fw-bold">$ {packages.length > 0 ? packages[0].price : price}</span>
                      </div> */}
            {/* <p>{data.title}</p> */}
            <ul>
              {
                popupArr?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))
              }
            </ul>
            {/* <p className="pop_description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
            <div className="pop_action">
              <button onClick={(e) => handleBootstrapEnrollment(e, title, category, bootcampId, navigate)} >Enroll Now</button>
              {
                (!userdata.token) ? <button onClick={addToWishlist}>
                  {
                    loading ?
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      :
                      "Wishlist"

                  }

                </button> :

                  (userdata.token && wishlistState) ?

                    <button onClick={removeCourse}>
                      {
                        loading ?
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          :
                          "Remove wishlist"

                      }

                    </button>
                    :
                    <button onClick={addToWishlist}>
                      {
                        loading ?
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          :
                          "Wishlist"

                      }

                    </button>

              }

            </div>
          </div>
        </Box>
      </Popover>
    </UpCoursesCard>
  )
}

