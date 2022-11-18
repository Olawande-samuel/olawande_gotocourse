import styled from "styled-components"

export const Hero = styled.section`
    /* display: grid; */
    /* place-items: center; */
    position: relative;
    background: #E4E9FF;
    color: var(--theme-blue);
    margin-bottom:100px;
    height: min(100vh - 80px, 550px);
    
    @media screen and (min-width: 550px){
        margin-bottom:200px;

    }

    header {
        margin-bottom: 1rem;
        padding-top: 1rem;
    }
    h1 {
        font-weight: 700;
        text-align:center;
        width:min(100%, 560px);
        margin-inline: auto;
    }

    p {
        margin-bottom: 1.4rem;
        font-weight: 300;
        width:min(100%, 550px);
        margin-inline: auto;
        text-align: center;

    }

    button {
        background: var(--theme-orange);
        padding:10px 24px;
        color:#fff;
        border-radius:4px;
        border: none;
        outline:none;
        text-transform:capitalize;
        margin-inline: auto;

    }


    .img_wrapper {
        width: min(100% - .5rem, 600px);
        margin: auto;
        margin-bottom: -100px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -30px;

        img {
            width: 100%
        }
    }
`
export const ItWorks = styled.section`
    padding-block: 2rem;
    header {
        margin-bottom: 3rem;
        text-align: center;

        h4 {
            color: var(--theme-blue);

        }
        p {
            margin-bottom: 0;
            width:min(100%, 450px);
            text-align: center;
            margin-inline: auto;
        }
    }


    .content {
        display: grid;
        grid-template-columns: 1fr;
        gap:1rem;
        justify-content: center;

        @media screen and (min-width:600px){
            grid-template-columns: 30% 65%;
        }

        .list_content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .img_wrapper{
            display: flex;
            justify-content: center;
            align-items:center;
        }
        img {
            /* width: 100%; */
            object-fit: cover;
            max-width: 100%;
            max-height: 400px;
        }

    }



`

export const ItWorksList = styled.div`
    .number {
        padding: 1px 4px;
        background: var(--theme-orange);
        color:#fff;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:10px;
        font-size: 18px;
        margin-bottom: .7rem;
    }

    h5 {
        font-weight: 700;
        margin-bottom: .7rem;
        color: #464646;
    }
    small {
        color:#464646;
    }
`
export const MainHeader = styled.header`
    margin-bottom: 2rem;
        color: var(--theme-blue);
        text-align:center;
        position: relative;
        padding-bottom: .5rem;
        h2 {
            font-weight: 700;
        }
        
        p {
            text-align: center;
            width: min(100% - .2rem, 550px);
            margin-inline: auto;
        }

        ::after {
            content: "";
            height: 8px;
            width: 150px;
            background: var(--theme-orange);
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);

        }
`
export const BestTools = styled.section`
    padding-block: 2rem;

   
    section{
        
        padding-block: 2rem;
        
        :nth-child(even){
            background:#E8EFFF;
            /* color: red; */
            p {
                width: min(100% - .2rem, 550px);
                margin-right: auto;
            }

            h4::after {
                content: "";
                height: 8px;
                width: 150px;
                background: var(--theme-orange);
                position: absolute;
                bottom: 0;
                left: 0;
            }
            
        }
         
        
        :nth-child(odd){
            h4 {
                margin-left: auto;       
                
                    ::after {
                    content: "";
                    height: 8px;
                    width: 150px;
                    background: var(--theme-orange);
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }

            p {
                width: min(100% - .2rem, 550px);
                margin-left: auto;
            }
            /* color: green; */
             .grid  .img_container{
                
                order: 2;
            }
             .grid  .text_container{
                order: 1;
                text-align: end;
            }


        }
    }

    @media (min-width: 512px){
        
        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
    }
   
`

export const TextContent = styled.div`
    .logo {

        margin-bottom: 0;

        img {
            max-width: 100%;
            height: 100%;
        }
    }


    h4 {
        color: var(--theme-blue);
        margin-block: 1rem;
        font-weight: 500;
        position: relative;
        padding-bottom: 1rem;
        width: min(100% - .2rem, 350px);


    }

    p {
        margin-bottom: 1rem;
    }
`

export const ImageContent = styled.div`

    display: flex;

    img {
        width: 100%; 
        height: 100%;
        /* max-height: 450px; */
        max-width: 450px;
        /* margin: auto; */
        @media (min-width: 512px){
            
           margin:auto;
        }
    }


    @media (max-width: 512px){
       max-height: 500px;
    }

`


export const AllInOne =styled.section`
    padding-block: 2rem;

    header {
        margin-bottom: 2rem;
        
        h4 {
            width: min(100% - .2rem, 550px);
            margin-inline: auto;
            color: #000;
        }
    
    }

    .bar {
        position: relative;
        border-radius: 8px;
        padding: 1rem clamp(1rem, 0.4286rem + 2.8571vw, 3rem);;
        background: var(--theme-blue);
        display: flex;
        justify-content: space-between;
        align-items:center;
        margin-bottom: 180px;


        .quizim {
            position:absolute;
            right: -25px;
            top: 50%;
            transform:translateY(-50%);
            width: 50px;
            height: 50px;
            
            img {
                max-width: 100%;
            }
        }
        .arrow_container {
            position: absolute;
            height: 150px;
            width: 300px;
            bottom: -150px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction:column;
            align-items:center;
            /* justify-content:; */

            img {
                height: 100px;
                width: 40px;
            }

            p{
                font-size: 40px;
                font-weight: 800;
                color: var(--theme-blue);
                text-transform: uppercase;
            }
            span {
                font-size: 40px;
                color: var(--theme-orange);
            }
        }
    }

    .icon{

        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: grid;
        place-items: center;

        :nth-child(1){
            background-color: #FFE1FE;
        }

        :nth-child(2){
            background-color: #FFF0EF;
        }

        :nth-child(3){
            background-color: #C3D4FF;
        }

        :nth-child(4){
            background-color: #FFD9CF;
        }

        :nth-child(5){
            background-color: #B1EAFF;
        }

        img {
            max-width: 100%;
            margin-bottom: 0;
            object-fit:contain;
        }

    }


`


export const Customised = styled.section`
    padding-block:2rem;
    background: #E8EFFF;

    

    .content {
        display: grid;
        gap: 1rem;
        .img_wrapper{ 
            display: flex;
            justify-content: center;
            
            img {
                max-height:450px;
                max-width:100%;

            }
        }


        .text_content {
            
            h3 {
                font-weight: 500;
                margin-bottom: 1rem;
            }

            button {
                padding: 1rem 2rem;
                background-color: var(--theme-blue);
                color: #fff;
                border-radius: 4px;
                border: none;
                outline: none;
            }

            
        }
        @media screen and (min-width: 612px){
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
            align-items: center;
            
            img {
                min-height:500px;
                max-height: 550px;
            }
        }
    }




`


export const FAQ = styled.section`

    padding-block: 3rem;

    header {
        margin-bottom: 3rem;

        h3 {
            color: var(--theme-blue);
            text-align:center;
        
        }
    }

    .content{
        display: grid;
        gap: 1rem;

        .faq-comp {  
            margin-bottom: 1.5rem;
        
            ::after {
                display: none;

            }
        }
        @media screen and (min-width: 600px){
            grid-column-gap: 3rem;
            grid-template-columns: repeat(2, 1fr);
        }
    }


`
export const ReviewContainer =  styled.section`
    background:#E8EFFF;
    padding-block: 2rem;

    > div > div {
        background-color:#E8EFFF !important;
    }
    .swiper-slide > div {
        height: 100%;
    }
    .swiper-slide {
        height: auto !important;

    }

`

export const Ready = styled.section`
    padding-block: 2rem;
    display: grid;
    place-items:center;
    min-height: 300px;


    h4{
        color: var(--theme-blue);
        font-weight: 700;
        width: min(100%, 550px);
        margin-inline: auto;
        margin-bottom: 2rem;
        text-align: center;
        font-size: clamp(1.6rem, 1.7143rem + 1.4286vw, 2.5rem);
    }

    button {
        background: var(--theme-blue);
        color: #fff;
        padding: 10px 28px;
        border-radius: 40px;
        border: none;
        outline: none;
    }

`