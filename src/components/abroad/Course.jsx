import { Link } from "react-router-dom"
import styled from "styled-components"
import management from '../../images/abroad/management.png'
import cyber from '../../images/abroad/cyber.png'
import business from '../../images/abroad/business.png'
import design from '../../images/abroad/design.png'
import analysis from '../../images/abroad/data.png'
import security from '../../images/abroad/security.png'
import market from '../../images/abroad/market.png'
import web from '../../images/abroad/web.png'
import { useState } from "react"
import { BsChevronDoubleDown } from "react-icons/bs"

const Container = styled.div`
  .contbtn{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button{
        border: none;
        outline:none;
        border-radius: 50%;
        margin: 2rem auto;
        padding: 2rem;
        background: #ACFFE2;
    }
  }
.container{
    display: flex;
    flex-direction: column;
    gap:2rem;
    height: ${({ more }) => more ? "100%" : "415vh"};
    overflow: ${({ more }) => more ? "auto" : "hidden"};

}
    
`

const Card = styled.div`
    width: 100%;
    background: ${({ background }) => background ? background : "#D8EAFF"};
    border-radius: 10px;
    display: flex;
    height: 100vh;
    padding: 2rem;
    gap: 2rem;
/* border: 2px solid red; */



    .cardleft{
        flex: .3;
        height: 100%;
        /* border: 2px solid red; */

        .cardcontent{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;

            .cardimg{
                height: 85%;
                /* border: 2px solid yellow; */

                img{
                    width: 100%;
                    height: 100%;
                }

            }

            .cardbutton{
                height: 15%;
                /* border: 2px solid blue; */
                text-align: center;
                padding: 1rem 0;

              

                    button {
                        border: none;
                        border-radius: 7px;
                        background: var(--theme-blue);
                        color: #fff;
                        padding: 0.5rem 1rem;
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 27px;
                        width: 100%;
                    }


            }

        }


    }

    .cardright{
        flex: .7;
        /* border: 2px solid green; */

        

    }

    @media (max-width: 768px) {
        height: unset;
        flex-direction: column;
    }

`

const ContentItem = styled.div`
    .restrictcard {

    line-height: 1.4rem;
    --max-lines: 10;
    position: relative;
    max-height: calc(1.4rem * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem; /* space for ellipsis */
    }

    .restrictcard::after {
    content: "";
    position: absolute;
    inset-inline-end: 0; /* "right" */
    width: 1rem;
    height: 1rem;
    background: white;
    }

        h2{
        color: var(--theme-blue);
        padding: 1rem 0;
        font-weight: 700;
        font-size: 33px;
        line-height: 24px;
        }

        p{
        font-weight: 400;
        font-size: 14.9178px;
        line-height: 30px;
        }

        .seemore{
        color: var(--theme-blue);
        cursor: pointer;
        }


`

const Content = ({title, ptop, pbottom, list, listheader}) => {
    const [show, setShow] = useState(true)
    const toggle = () => setShow(!show)
    return (
        <ContentItem>
            <div className={show ? "restrictcard" : ""}>

                <h2>{title}</h2>
                <p>{ptop}</p>
                <p>{listheader}</p>

                <ul>
                    {list.map((l, i) => (
                        <li key={i}>

                            {l}
                        </li>

                    ))}
                </ul>

                <p>{pbottom}</p>
            </div>
            <span className="seemore" onClick ={toggle}>
                read more
            </span>
        </ContentItem>
    )
}


const CourseCard = ({ img, title, ptop, pbottom, list, listheader, background, more }) => {
    return (
        <Card background={background} >
            <div className="cardleft">
                <div className="cardcontent">
                    <div className="cardimg">
                        <img src={img} alt="" />
                    </div>
                    <div className="cardbutton">
                        <Link to={`/signup?trainee`}><button>Enroll</button> </Link>

                    </div>
                </div>

            </div>
            <div className="cardright">
                <Content
                    title={title}
                    ptop={ptop}
                    pbottom={pbottom}
                    list={list}
                    listheader={listheader}
                />

            </div>

        </Card>
    )
}

const Course = () => {
    const [more, seeMore] = useState(false);
    const toggle = () => seeMore(!more)
    return (
        <Container more={more}>
            <div className="container">
                {data.map((d, i) => (
                    <CourseCard key={i} {...d} />
                ))}

            </div>
            <div className="contbtn">
                <button onClick={toggle}>
                    <BsChevronDoubleDown style={{ fontSize: "2rem" }} />
                </button>

            </div>

        </Container>

    )
}

export default Course


const data = [
    {
        id: "1",
        img: management,
        title: "Product Management",
        ptop: `
        Are you looking to kickstart your career in product management? Look no further than Gotocourse's comprehensive Product Management course! 
        This comprehensive online course is designed to help you master the key concepts and skills needed to succeed in the fast-paced world of product management. You'll learn everything from the basics of product management to the latest industry best practices, all while getting hands-on experience with real-world product management challenges.
        `,
        listheader: "Throughout the course, you'll explore a variety of topics including:",
        list: [
            "Product development",
            "Marketing strategies",
            "Customer research",
            "Product roadmaps, and more."

        ],
        pbottom: "You'll also learn how to effectively manage your product lifecycle, from ideation to launch and beyond. Our expert instructors will guide you every step of the way, helping you to build the skills and confidence you need to excel in your career.",
        background: "#D1FFF4"
    },
    {
        id: "2",
        img: cyber,
        title: "Cybersecurity/ Technology Audit",
        ptop: `
        Take your technology career to the next level with Gotocourse's Cybersecurity/Technology Audit course! This comprehensive program is designed to provide you with in-depth knowledge and hands-on experience in performing technology and cybersecurity audits. 
        `,
        listheader: "With this course, you will learn how to: ",
        list: [
            "Identify security threats",
            "Evaluate network infrastructure, and ",
            "Implement best practices to secure an organization's information and technology systems."

        ],
        pbottom: `This course is taught by industry experts with years of experience in the field, ensuring that you receive the most up-to-date and relevant information. With interactive lessons, real-world examples, and practical assignments, you will develop the skills necessary to perform technology and cybersecurity audits with confidence.
        At the end of the course, you will have a complete understanding of the latest industry trends and best practices, as well as a portfolio of projects to showcase your new skills. Whether you are just starting your technology career or looking to take your skills to the next level, this course is the perfect opportunity to enhance your expertise and secure your future in the technology industry.
        Enroll now in Gotocourse's Cybersecurity/ Technology Audit course and gain the knowledge and skills to become a sought-after technology professional in the competitive job market of 2023 and beyond`

    },
    {
        id: "3",
        img: design,
        title: "Product Design",
        ptop: `
        Product Design is one of the most in-demand skills in today's fast-paced and constantly evolving technology industry. Whether you're a beginner or an experienced designer looking to take your skills to the next level, the Product Design course on Gotocourse has got you covered.
With this comprehensive course, you'll learn all the essentials of product design, from conducting user research and developing wireframes to creating user-centered prototypes and testing your designs. You'll also get to work on real-world projects, giving you hands-on experience and a deeper understanding of the design process.
Throughout the course, you'll be guided by experienced product designers and industry experts who will share their knowledge and expertise. You'll also have the opportunity to network with other designers and gain valuable insights into the industry.
By the end of the course, you'll have the skills, confidence, and portfolio to take on any product design challenge. You'll be equipped with the knowledge and tools to create user-centered and impactful products that solve real-world problems and meet business goals.
Invest in your future and become a sought-after product designer with the Product Design course on Gotocourse. Start your journey today and take the first step towards a rewarding career in tech!
        `,
        listheader: "",
        list: [


        ],
        pbottom: ``,
        background: "#FFDDDA"

    },
    {
        id: "4",
        img: business,
        title: "Business Development",
        ptop: `
        Are you looking to take your career in business development to the next level? Our Business Development course on Gotocourse is the perfect way to achieve your goals! With this comprehensive online program, you'll learn everything you need to know to become an expert in business development.
        From understanding the basics of sales and marketing to mastering the art of negotiation and relationship-building, our Business Development course covers it all.         `,
        listheader: "You'll learn how to:",
        list: [
            "Identify potential customers and target markets",
            "Craft effective sales and marketing strategies, and",
            "Close deals that drive your company's success."

        ],
        pbottom: `
        What's more, you'll have access to expert instructors who have years of experience in the field. They'll provide you with hands-on learning opportunities and real-world examples, giving you the practical skills you need to succeed. And with interactive lessons and flexible scheduling options, you can take our Business Development course at your own pace, anytime, anywhere.
        So don't wait - sign up for our Business Development course on Gotocourse today and take the first step towards a rewarding career in business development!
        `
    },
    {
        id: "5",
        img: analysis,
        title: "Data Analytics",
        ptop: `
        Unlock the Power of Data Analytics with Gotocourse's Comprehensive Course!
Our expert instructors will guide you through the fundamentals of data analytics, from collecting and processing data to analyzing and visualizing insights. You'll learn how to apply data analytics tools and techniques to real-world scenarios and make data-driven decisions.
        `,
        listheader: "This comprehensive course covers the latest trends and best practices in the field, including: ",
        list: [
            "Machine learning",
            "Big data, and",
            "Data visualization."

        ],
        pbottom: `
        By the end of the course, you'll have a deep understanding of how to analyze and interpret data, and the skills to turn insights into action.
        In addition to gaining a solid foundation in data analytics, you'll also have the opportunity to network with other professionals in the field and build a portfolio of work to showcase your skills to potential employers. 
        With a certificate of completion from Gotocourse, you'll be ready to take on new and exciting opportunities in the world of data analytics.
        Don't miss out on this opportunity to enhance your skills and propel your career in the exciting field of data analytics. Sign up for Gotocourse's Data Analytics course today!"      
        `
        , background: "#FFDDDA"

    },
    {
        id: "6",
        img: security,
        title: "Cloud Security",
        ptop: `
        Are you looking for a career in cloud security but don't know where to start? Look no further! Our Cloud Security course on Gotocourse is the perfect solution for you. With this course, you will learn the latest industry-standard practices to ensure the security of your organization's cloud environment.
You will start by learning the fundamentals of cloud security and how to implement security measures within the cloud. You will also learn how to assess and manage risk, as well as the various tools and techniques used to secure cloud infrastructure.
By taking this course, you will have a deeper understanding of how to protect your organization's data and systems from cyber-attacks and other security threats. You will also gain valuable hands-on experience with real-world cloud security projects, making you a highly sought-after professional in the industry.
In addition to learning the skills needed to excel in cloud security, you will also receive a certificate of completion from Gotocourse that demonstrates your expertise to potential employers. This certificate will set you apart from the competition and give you a competitive edge in the job market.
So what are you waiting for? Take the first step toward your dream career in cloud security by enrolling in our Cloud Security course on Gotocourse today!
        `,
        listheader: "",
        list: [


        ],
        pbottom: ``,
        background: "#D1FFF4"


    },
    {
        id: "7",
        img: market,
        title: "Digital Marketing",
        ptop: `
        Looking to expand your digital marketing skills and grow your career in the tech industry? Look no further than Gotocourse's comprehensive Digital Marketing course!
        In this hands-on course, you'll learn the ins and outs of creating effective digital marketing campaigns from start to finish. From building a strong marketing strategy and developing targeted campaigns to analyzing data and measuring your results, you'll be equipped with the knowledge and skills you need to succeed in the fast-paced world of digital marketing.
        
        With expert instructors and a focus on real-world, practical applications, our Digital Marketing course is designed to help you get the most out of your time and investment. You'll learn the latest techniques and strategies used by successful digital marketers and have the opportunity to practice these skills through engaging and interactive lessons.
        
        At the end of the course, you'll be able to create effective campaigns that drive results, use data to optimize your strategies, and demonstrate your skills to potential employers.
        Whether you're looking to build your career in digital marketing, launch your own business, or simply become more effective in your marketing efforts, Gotocourse's Digital Marketing course is the perfect place to start. So why wait? Sign up today and start your digital marketing journey!  
        `,
        listheader: "",
        list: [


        ],
        pbottom: ``

    },

    {
        id: "8",
        img: web,
        title: "Coding (Web & Mobile Development)",
        ptop: `
        Take your tech skills to the next level with our Coding (Web & Mobile Development) course on Gotocourse! Learn the essentials of coding and become a pro at developing engaging, user-friendly websites and mobile apps. With our expert instructors and interactive online platform, you'll learn the latest coding languages and programming techniques to design, build and launch successful tech projects.

In this comprehensive course, you'll get hands-on experience with popular web development tools and mobile app frameworks, including HTML, CSS, JavaScript, React, and Swift. You'll also learn how to implement database management and user authentication features for your web and mobile apps.

By the end of the course, you'll be equipped with the skills and knowledge to design and build effective tech solutions for businesses and clients. You'll stand to get an in-demand skill set that will help you start your tech career or advance your existing one.
So, sign up today and start coding your way to success with Gotocourse!
                `,
        listheader: "",
        list: [


        ],
        pbottom: ``,
        background: "#FFDDDA"


    },


]