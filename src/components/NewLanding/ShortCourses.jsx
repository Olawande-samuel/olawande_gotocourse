import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, Short, TechPreCard } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));

    /* overflow: hidden; */
    grid-auto-rows: 390px;

    gap: 1.5rem;
    justify-content:space-around;
    padding: .5rem;
    
    @media screen and (min-width: 1400px) {
        grid-template-columns: repeat(4, 230px);
        justify-content: space-evenly;
        gap: 1rem;
    }

    @media screen and (max-width:768px){
        grid-template-columns: repeat(2, 280px);
    }


    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    }  
    `

const ShortCourses = () => {
    const { otherFunctions: {fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])
    
    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        // notifyOnChangeProps:["category", "isFetching"],

        onSuccess: (res)=>{
            if(res.data.length > 0){
                const short = res.data.filter(item=>item.subCategory === "SHORT_COURSES" && item.isActive);
                // console.log({short});
                let tech = res.data.filter(item=>item.subCategory === "TECH_ENTREPRENEURSHIP" && item.isActive);

                // console.log({tech});
                tech = tech.filter(d => d.title !== "Creative Design like a Pro")
                const threeShorts = short?.slice(0, 4)
                const threeTech = tech?.slice(0, 4)
                // console.log({threeTech});
                const myContent = threeShorts.concat(threeTech)
                setShorts(myContent)
            }
        }
    })
  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                shorts?.filter(item => item.isActive).map(item => (
                    // <TechPreCard {...item} />
                    <Short {...item} all={item} key={item.bootcampId}/>
                ))
            }
        </Grid>
    </ClassTypeComponent>
  )
}
const data = {
    header: "Explore short courses",
    header2:"& Tech entreprenuership education ",
    subtext:"Knowledge boost within 1-14 days",
    content: [],
    bottomTitle:"View  more short courses > ",
    bottomLink:`category/SHORT_COURSES`

  }
export default ShortCourses


export const shortPopUpContent = [ 

    {
        ownedBy:"Introduction Content Marketing",
        title: "Learn the art of crafting contents to directly interact with consumers withour any intermediaries.",
        list: ["You will learn how content marketing startegy works for any business.","You will learn actionable steps towards growing business with contents.", "You will be able to generate leads for businesses successfully." ]
    },
    {
        ownedBy:"Use Canva to Create Desktop and Mobile-friendly web pages",
        title:"Learn how to create mobile-friendly web pages with Canva to reach the growing number of mobile users.",
        list: [
            "You will be able to design desktop and mobile-friendly web pages and prepare them for publishing.",
            "You will learn how to build single-page, multiple-page web pages and landing pages using Canva URLs or URL shorteners.",
            "You will be a professional Canva navigator."
        ]
    },
    {
        ownedBy:"Brand Management: Aligning Business, Brand and Behavior",
        title: "Master brand management by establishing and maintaining a credible image of a brand, overseeing brand sales, and building a brand reputation!",
        list: ["You will learn what is branding and how to develop your brand strategy",
        "You will learn how to build a brand identity that aligns with the company's goals.",
        "You will be a professional and creative brand manager."]
    },
    {
        ownedBy:"Social Media Management & Marketing",
        title:"Master how to build and execute online marketing strategy for business, and how to improve your website’s performance using SEO.",
        list:[ "You will master the tools and tactics to reach your target audience online, drive more traffic to your website and convert those visitors into leads.", "You will learn how to build an effective landing page that converts visitors into leads.",
        ]
    },
    {
        ownedBy:"Establishing Product market fit",
        title:"Master the art of marketing products to customers buying, utilizing, and recommending the product in sufficient numbers to support the product's expansion and profitability.",
        list:[
            "You will learn the key elements of a product marketing plan, the importance of knowing your customers, and how o reach them.  and more.",
            "You will learn how to develop promotional strategies and tactics, and create the right messages for the right audiences.",
            "You will also master how to use data to create a marketing strategy, pricing strategies, and sales promotions.",
        ]
    },
    {
        ownedBy:"Graphic design for Freelancing",
        title:"Master how to tell a story with your visuals. Creating a visual representation of designs that conveys meaning and feeling, making your clients glad they choose you!",
        list:[
            "You will learn how to use the elements of design to create better visual storytelling.",
            "You will learn how to draw, shade and render and sort, develop your own style and signature.",
            "You will become a brilliant graphics designer.",
        ]
    },
    {
        id:8,
        ownedBy:"Agile Project Development",
        title:"Master the continual approach to software development projects by optimizing responses and ensuring they are acted upon.",
        list:[
            "You will master how to develop a model for continual improvement in software development projects.",
            "You will absorb how to identify and mitigate risks in your project through the use of data",
            "You will learn the best practices for managing projects from beginning to end.",
        ]
    },
    {
        id:9,
        ownedBy:"Introduction to Risk management",
        title:"Master the skill of balancing between taking and reducing the inevitable threats of any organization.",
        list:[
            "You will learn how to deal with the most common threats you will encounter in an organization and understand the values of reducing threats in an organization",
            "You will master how to lead and manage a team to design a balanced strategy.",
        ]
    },
    {
        id:10,
        ownedBy:" Mastering Affiliate Marketing",
        title:"Master the concept of advertising by the practice of paying outside publications to direct customers to a company's goods and services.",
        list:[
            "What you will learn in this course",
            
            "You will learn how to build an audience and create advertising campaigns.",
            "You will learn the definition of advertising, the different types of advertising, and why companies use it, and choose the right platforms for your advertising.",
            "You will also learn how to create effective ads that meet your goals. ",
        ]
    },
    {
        id:11,
        ownedBy:"Cyber Threat Intelligence",
        title:"Master the art of analyzing data using tools and techniques to produce insightful data about current or emerging threats aimed at the firm to assist reduce risks.",
        list:[
            
            "You will learn how to analyze data using tools and techniques to produce insightful data about current or emerging threats aimed at the firm",
            "You will learn how to produce reports that contain information about threats and risks so that they can be shared with others",
            "You will learn how to use data mining techniques for finding patterns in large amounts of information.",
        ]
    },
    {
        id:12,
        ownedBy:"Cloud Computing Basics for Everyone",
        title:"Master the future of computing; delivering computing services over the Internet to speed up innovation.",
        list:[
            "You will learn the basics of cloud computing and the key concepts.",
            "You will learn how to use Google Cloud services such as App Engine, BigQuery, and Spanner, how to use the Google Cloud Platform Console.",
            "You will learn the difference between Infrastructure as a Service (IaaS), Software as a Service (SaaS), and Platform as a Service (PaaS)",
        ]
    },
    {
        id:13,
        ownedBy:"Product Ideation, Design, and Management Specialization",
        title:"Discover product ideas by cultivating your entrepreneurial mindset, investigating the industry and competitive analysis, and comprehending the principles of value innovation.",
        list:[            
            "You will learn how to thoroughly understand your target market, the unmet needs of your market, your value proposition, the feature set of your product, and the user experience. ",
            "You will learn how to develop prototypes and minimal viable products (MVPs), as well as the financial plans to support their development and delivery, you may turn your concepts into reality.",
        ]
    },
    {
        id:14,
        ownedBy:"Data Visualization with Power BI",
        title:"Learn how to utilize data visualization to bring your data to life and become a great storyteller of the insights it contains with Power Bi application software.",
        list:[
            "You will learn how to use the Power Bi application software to create data visualizations that are engaging and informative.",
            "You will learn how to bring your data to life through data dashboards, interactive reports, charts, graphs, and other visual representations.",
            "You will become a professional visual analyst.",
        ]
    },
    {
        id:15,
        ownedBy:"A to Z Facebook Marketing",
        title:"Master the details of managing business' Facebook accounts, using Meta's Business Suite to make more sales.",
        list:[
            "You will learn how to create an online presence, grow a following, and maintain your social media presence.",
            "You will learn how to create powerful social media brand presences and develop successful social media postings.",
            "You will master how to create profitable Facebook ad campaigns using Meta Ads Manager.",
            "You will be able to analyze and evaluate the evaluate outcomes of your social media posts and marketing efforts.",
        ]
    },
    {
        id:16,
        ownedBy:"Agile Project Development",
        title:"Master the continual approach to software development projects by optimizing responses and ensuring they are acted upon.",
        list:[
            "You will master how to develop a model for continual improvement in software development projects.",
            "You will absorb how to identify and mitigate risks in your project through the use of data",
            "You will learn the best practices for managing projects from beginning to end.",
        ]
    },
    {
        id:17,
        ownedBy:"Why Scrum",
        title:"Master the exemplary importance of Scrum framework proven methodology for developing software.",
        list:[
            

            "You will learn how Scrum provides you with the knowledge and skills required to successfully implement Scrum in your organization.",
            "You will learn how Scrum can help you build products of the highest quality within an expedited time frame.",
        ]
    },
    {
        id:18,
        ownedBy:"Mastering Scrum with other Agile Methodologies",
        title:"Master the fundamentals of Agile Scrum and get ready to take your next step in becoming a Certified Professional.",
        list:[
            "You will learn the fundamentals, tenets, and procedures of agile methodologies, as well as Scrum and Extreme Programming frameworks.",
            "You will be able to understand and use Scrum more effectively.",
            "You will also be able to oversee information sharing among Scrum team members.",
        ]
    },
    {
        id:19,
        ownedBy:"Linkedin Marketing for Biusiness",
        title:"Learn about branding, public relations, SEO, analytics, social media, and email marketing. Learn how to create, implement, and measure a winning marketing strategy with LinkedIn's top tools.",
        list:[
            

            "You will learn how to use LinkedIn’s top tools - InMail, Sales Navigator, Lead Accelerator, and Job Search - to reach the right audience at the right time with the right message.",
            "You will also learn the essential components of a marketing strategy and how to create one that works for your business.",
            "You will master the fundamentals of marketing, including public relations, SEO, analytics, and social media",
            "You will become a professional LinkedIn marketer.",
        ]
    },
    {
        id:20,
        ownedBy:"SEO & Email marketing",
        title:"Master the skill of engaging your customers and include it into your marketing strategy. Engaging your audience and giving them the impression that they have a genuine relationship with you.",
        list:[
            

            "You will discover how to transform necessary emails, such as transactional communications and newsletters, into targeted, revenue-generating emails that your consumers truly want to read.",
            "You'll discover how to improve every area of your email marketing strategy, from timing and tone to subject lines and personalization",
            "You will also learn how to monitor and change your plan in order to achieve your objectives.",
        ]
    },
    {
        id:21,
        ownedBy:"How to advertise on Instagram",
        title:"Learn how to successfully place advertisements on Meta's Instagram profiles; how to create an Instagram audience and advertise to them in a way that doesn't represent some hurried ad placement strategy.",
        list:[
            

            "You will be shown how to develop a campaign and create engaging content for Instagram advertising.",
            "You will learn how to use various tools and see how to target certain populations, set a budget, and run planned campaigns.",
            "You will also discover how to use Instagram Stories and Instant Experience advertisements to boost your marketing and user engagement.",
        ]
    },
    {
        id:22,
        ownedBy:"Mastering effective Google ads campaig",
        title:"Effective google ads campaign optimization. You will learn:",
        list:[
            
            "Setting Up Google Search Ads",
            "The Basics of Google Search Campaigns",
            "Installing Google Tools in the website",
            "Optimizing Google Search Ads campaigns",
            "How To Optimize Campaigns in Google Ads",
        ]
    },
    {
        id:23,
        ownedBy:"Introduction to Ecommerce marketing",
        title:"Boosting online sales and achieving higher conversion. You will learn:",
        list:[
            
            "Build a Digital Marketing Strategy.",
            "Find Your Online Audience.",
            "Create a Website in 24 Hours.",
            "Drive Targeted Traffic.",
            "Build an Email List.",
            "Analyze Website Data.",
            "Create Converting Google Ads.",
            "Create Converting Facebook Ads.",
            "Create a Content Strategy Plan.",
        ]
    },
    {
        id:24,
        ownedBy:"Understanding Help Desk",
        title:"Helpdesk training. What you will learn:",
        list:[
            
            "Articulate processes and information related to IT fundamentals in the context of providing technical support.  ",
            "Demonstrate systematic and effective troubleshooting and problem-solving skills.  ",
            "Use diagnostic tools and tracking systems to solve and log customer issues.  ",
            "Apply customer service skills and a customer support mindset, including conflict mitigation and de-escalation skills.  ",

        ]
    },
    {
        id:25,
        ownedBy:"Introduction to Blockchain technology",
        title:"Blockchain technology.",
        list:[
            "What is a Blockchain",
            "Blockchain Fundamentals",
            "What is Cryptography",
            "What is Cryptographic Hash?",
            "How distributed P2P networks are working",
            "What is Bitcoin",
            "Bitcoins monetary policy",
            "How Bitcoin mining works",
            "Blockchain in Healthcare",
            "Blockchain in Finance",
            "Blockchain in Energy",
            "Blockchain and Internet",
            "Blockchain in Supply Chain",
            "Blockchain in Real Estate",
            "Blockchain in Retail",
            "Blockchain in Education",
            "Blockchain in Data Storage",
            "Blockchain in Government",

        ]
    },
    {
        id:26,
        ownedBy:"Effective Report writing",
        title:"Step by step Report writing skill",
        list:[
            
            "Save time when planning a report by knowing the essential questions to ask",
            "Increase the impact of a report by understanding its purpose",
            "Structure complex information and ideas confidently and quickly (under five minutes)",
            "Decide what sections to include in the report - and what should go where",
            "Delight readers by making the report easy to navigate and digest",
            "Create a visually attractive report that's kind to the eye",

        ]
    },
    {
        id:27,
        ownedBy:"Communicating Effectively",
        title:"Effective  Communication skills for all Business communication needs. You will learn",
        list:[
            
        "Improve Communication Skills",
        "Improve Speaking Skills",
        "Improve Listening Skills",
        "Improve Writing Skills",
        "Improve Presentation Skills",
        "How to speak clearly and concisely",
        "How to listen carefully and professionally",
        "How to write effectively",
        "How to write quality content",
        "How to prepare effectively for presentations",
        "How to deliver a quality presentation",
        ]
    },
    {
        id:28,
        ownedBy:"Developing effective research proposal",
        title:"Approach to writing a research grant proposal.",
        list:[
            
            "How to find appropriate funding opportunities for your research ideas",
            "How to write a complete research grant proposal with attachments",
            "How to compile and submit a complete research grant applicatio",
        ]
    },
    {
        id:29,
        ownedBy:"Developing startegy plan for new action plan",
        title:"Achieve a strategic planning capability that will drive strategy and enhance value in any business environment.",
        list:[

            "You will learn the importance of Strategy and Alignment to an entity.",
            "You will learn how to develop, conduct, and control strategic planning in your organizational system, or in your entrepreneurial endeavors.",
            "learn about the risk related influences that the strategic planner is exposed to.",
            "You will leave the course with a deep understanding of a robust Strategic Planning Framework, and the ability to write Strategic Planning Report.",
        ]
    },
    {
        id:30,
        ownedBy:"Principles and Tools to Boost Your Productivity",
        title:"Productivity maximization through body, mind and environment optimization",
        list:[
            
            "How to develop a productive mindset and stay motivated",
            "How to enhance personal productivity skill",
            "Learn how to achieve bigger goals in less time",

        ]
    },
    {
        id:31,
        ownedBy:"Mastering Copywriting",
        title:"Secret to Effective writing to grow business and career.",
        list:[
            "Learn how to write Powerful headlines",
            "Effective strategy to high level copywriting ",
        ]
    },
    {
        id:32,
        ownedBy:"Introduction to Tech Entrepreneurship",
        title:"Learn how to mine from the lucrative tech market with or without the knowledge of coding.In this course, you will be equipped on:",
        list:[
            
            "How to identify high-potential opportunities in the tech industry",
            "High profit making strategies",
            "Risk management affiliated with your field.",
            "How to advertise and promote your services to clients and investors",
        ]
    },
    {
        id:33,
        ownedBy:"How To Start, Launch, sustain and scale A 6 Figure Freelancing Business ",
        title:"Be a 6 Figure earner through Freelancing. Master how to earn during the slow-seasons and choose the best paying rates as you sharpen your skills.You will learn how to",
        list:[
            
            "Start off in the freelance industry with good rates",
            "Bargain with clients and close deals",
            "Find high paying clients and build long-lasting client-freelancer relationships.",
        ]
    },
    {
        id:34,
        ownedBy:"Creative Design like a Pro",
        title:"We will help you learn to design like a Pro. Master the art and psychology of designing. After this course:",
        list:[
            
            "You will be able to build and sharpen the skill of design storytelling ",
            "You will have practical knowledge on the nitty-gritty of color theory",
            "You will be able to use major design applications like Adobe Illustrator, Photoshop, and Adobe Creative Suite.",
        ]
    },
    {
        id:35,
        ownedBy:"Make 6 figure with Affliate Marketing  working 2-3hrs daily",
        title:"Learn proven methods of researching your target audience to make profitable sales on certain platforms.",
        list:[
        
            "You will be able to use our special sales funnel to increase consumer sales",
            "You will learn how to use top affiliate marketing softwares.",
        ]
    },
    {
        id:36,
        ownedBy:"How to Start, Launch, a 6 figure whatsapp moneymaking business",
        title:"Discover multiple ways to earn money on WhatsApp. Make Whatsapp your side hustle by marketing goods for high-paying clients. ",
        list:[
            

            "You will be able to capitalize on Whatsapp and earn passive income daily",
            "You will learn how  to leverage your existing contacts ",
            "You will learn how to add high-value clients to your WhatsApp clients.",
        ]
    },
    {
        id:37,
        ownedBy:"Be a rockstar with Domain flipping Business",
        title:"Master how to make a good side hustle out of trading web domains, how to find the best opportunities and leverage them. In this course: ",
        list:[
            
            "You will learn the basics of domain flipping ",
            "You will have access to our step-by-step guide on what type of domain to trade, how and  when to trade, ",
            "and the best clients to sell to",
        ]
    },
    {
        id:38,
        ownedBy:"Smile to bank with YouTube Profitable Business",
        title:"Learn how to set up a YouTube channel and monetize your content effectively. After this course:",
        list:[
            


            "You will be able to set up and build a Youtube Channel ",
            "You  will be able to market your Youtube videos ",
            "You will be able to use YouTube Optimisation tools to increase traffic on your channel.",
        ]
    },
    {
        id:39,
        ownedBy:"How to start a high premium freelancing business",
        title:"Learn the basics of starting a freelance business, the best freelancing platforms and how to secure deals within your first month of enrolling. You will learn to:",
        list:[
            
        "Close profitable deals",
        "Choose convenient rates for your services",
        "Market your services and pitch yourself to high-value clients",
        ]
    },
    {
        id:40,
        ownedBy:"How to create a proftable Digital products",
        title:"Learn how to brainstorm digital product ideas, bring it to life and  build an audience for your business.",
        list:[
            
            "You will be able to get ideas for your digital products and how to tailor them to consumer satisfaction.",
            "You will learn how to research your target market and  buying trends in your target market.",
        ]
    },
    {
        id:41,
        ownedBy:"Find your path to Copywriting like a Pro",
        title:"Master psychological tools used in writing. You can use these tools to win over clients in business, storytelling, blog writing, creative writing, and others. ",
        list:[
            
            "You will learn how to convince your buyers to buy your products.",
            "You will learn how to use writing  psychology to influence consumer decisions.",
            "You will learn how to conduct in depth research on your target audience.",

        ]
    },
    {
        id:42,
        ownedBy:"Be a rockstar Virtual Assistant ",
        title:"Master the art of offering clients administrative services and become a rockstar in it.",
        list:[
            

            "You will learn how to become a valued admin, how to communicate effectively with clients, and how to handle the stress that comes with running an administrative business. ",
            "You will also get practical tips on how you can streamline your day-to-day job so that you can take on more clients and make more money.",
            "You will also learn how to organize and maintain a client’s records, set up and manage their accounting systems.",

        ]
    },
    {
        id:43,
        ownedBy:"High income social management busiess",
        title:"Learn about the commercial aspects of managing social companies and projects.",
        list:[
            
            "You will learn how to make your social enterprise or project viable by offering services and things t hat people want, as well as gaining skills in accounting and finance, marketing, sales, and business planning.",
            "You will be able to identify the critical components of a successful social enterprise, such as marketing, sales, and business planning.",
            "You'll also learn how to manage the financial aspects of a business or project, as well as ",
            "how to create an income stream that benefits both you and your stakeholders.",
        ]
    },
    {
        id:44,
        ownedBy:"Start a 6 figure Lead generation business",
        title:"Master the process of attracting prospects to your business, increasing their interest through nurturing, and generating six figures on a regular basis.",
        list:[
            

            "You will discover how to turn a prospect into a customer.",
            "You will learn how to create effective marketing messages and how to deliver them.",
            "You will discover the significance of developing sales funnels that guide prospects through your sales process.",
            "You will advance to the level of professional lead generator.",
        ]
    },
    {
        id:45,
        ownedBy:"Build  a winning Ghost writing  business",
        title:"Learn the fundamentals of ghostwriting, ghosting it right, and succeeding in the business!",
        list:[
            
            "You'll learn how to assess a client's requirements, price your services, and manage projects.",
            "You'll discover how to build an effective brand, how to get clients, and what they expect from you.",
            "You will also obtain a thorough awareness of the legal issues of ghostwriting, such as copyright law, contract law, defamation, and libel.",
        ]
    },
    {
        id:46,
        ownedBy:"Digital marketing Rockstar",
        title:"Learn how to acquire new customers, engage them through different digital platforms, a nd generate transactions such as sales and customer loyalty.",
        list:[
            

            "You will discover the marketing funnel and how it influences the consumer journey.",
            "You'll also discover how to boost sales, cut costs, and boost your ROI.",
            "You will learn how to design an effective marketing plan that is aligned with your business goals, as well as how to create successful content that attracts customers and drives conversions.",
        ]
    },
    {
        id:47,
        ownedBy:"Learn tricks and tools for managing Online Community to success",
        title:"Set up and execute social media and communication programs to fit with marketing strategy.",
        list:[
            
            "You'll discover how trade secrets and tools can help you become an online community manager superstar.",
            "You will learn how to build and manage a successful social media strategy, as well as the relationship between your brand and its online presence.",
            "You will also learn how to assess the efficacy of your efforts and make necessary changes.",
        ]
    },
    {
        id:48,
        ownedBy:"Amazon Money making machine",
        title:"Learn the top way of making money on amazon with the amazon money making machine",
        list:[
            

            "You will learn how to make money on amazon with the amazon money-making",
            "machine and how you can build a passive income by selling on amazon.",
            "You will also learn how to find products that are in demand and sell them on amazon for profit.",
        ]
    },
    {
        id:49,
        ownedBy:"How to close sales on High ticket products",
        title:"Learn the technique of helping businesses in selling premium items or services.",
        list:[
            "You will discover how to increase ticket sales.",
            "You will learn high-quality strategies for acquiring high-ticket clients.",
            "You will also learn how to use social ticket sales.",
        ]
    },
]