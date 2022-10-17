import React, { useEffect } from "react";
import { Link } from "react-router-dom"



import Layout from "../../../components/Layout";
import clsx from "./styles.module.css";
import img01 from "../../../images/affiliate02.png";
import img1 from "../../../images/affil.png";
import cactus from "../../../images/money_bag.png";
import { FaqComponent } from "../../../components/Faq";



//data
const cards = [
    {
        bgColor: "#DEECFF",
        icon: <svg width="75" height="73" viewBox="0 0 75 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.5827 62.0003C39.6086 61.9989 46.4321 59.7211 51.9666 55.5297L69.3675 72.381L74.9646 66.9607L57.5637 50.1093C61.8941 44.749 64.2477 38.1395 64.2493 31.3337C64.2493 14.4248 50.0429 0.666992 32.5827 0.666992C15.1225 0.666992 0.916016 14.4248 0.916016 31.3337C0.916016 48.2425 15.1225 62.0003 32.5827 62.0003ZM32.5827 8.33366C45.6808 8.33366 56.3327 18.6492 56.3327 31.3337C56.3327 44.0182 45.6808 54.3337 32.5827 54.3337C19.4846 54.3337 8.83268 44.0182 8.83268 31.3337C8.83268 18.6492 19.4846 8.33366 32.5827 8.33366Z" fill="#000F62" />
        </svg>,
        description: "Find the best classes and video lessons for your audience"
    },
    {
        bgColor: "#D8FFE0",
        icon: <svg width="75" height="74" viewBox="0 0 75 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 11.5525C0 8.65952 1.11874 5.88504 3.11011 3.8394C5.10148 1.79376 7.80236 0.644531 10.6186 0.644531H60.172C62.9882 0.644531 65.6891 1.79376 67.6805 3.8394C69.6718 5.88504 70.7906 8.65952 70.7906 11.5525V44.4582C70.208 44.3369 69.6152 44.276 69.0208 44.2764H65.4813V27.9144H30.2984L36.3864 34.1683C36.6472 34.418 36.8564 34.719 37.0015 35.0535C37.1465 35.3881 37.2246 35.7492 37.2309 36.1153C37.2371 36.4815 37.1716 36.8452 37.0381 37.1847C36.9045 37.5243 36.7058 37.8327 36.4537 38.0917C36.2017 38.3506 35.9014 38.5548 35.5708 38.6919C35.2403 38.8291 34.8862 38.8964 34.5298 38.89C34.1734 38.8835 33.8218 38.8034 33.4962 38.6543C33.1706 38.5053 32.8775 38.2904 32.6345 38.0225L26.5465 31.7686V49.7303H32.592C32.1047 50.8771 31.854 52.1151 31.8558 53.3663V55.1843H10.6186C7.80236 55.1843 5.10148 54.0351 3.11011 51.9894C1.11874 49.9438 0 47.1693 0 44.2764V11.5525ZM10.6186 6.09851C9.21047 6.09851 7.86003 6.67312 6.86435 7.69594C5.86866 8.71876 5.30929 10.106 5.30929 11.5525V22.4604H9.58504C8.87241 20.7856 8.66785 18.929 8.99806 17.1329C9.32827 15.3368 10.1779 13.6848 11.4361 12.3923C12.6943 11.0998 14.3026 10.227 16.051 9.8878C17.7994 9.54859 19.6068 9.75873 21.2372 10.4908V6.09851H10.6186ZM26.5465 6.09851V10.4908C28.1769 9.75873 29.9842 9.54859 31.7327 9.8878C33.4811 10.227 35.0893 11.0998 36.3475 12.3923C37.6057 13.6848 38.4554 15.3368 38.7856 17.1329C39.1158 18.929 38.9112 20.7856 38.1986 22.4604H65.4813V11.5525C65.4813 10.106 64.9219 8.71876 63.9262 7.69594C62.9305 6.67312 61.5801 6.09851 60.172 6.09851H26.5465ZM21.2372 49.7303V31.7686L15.1492 38.0225C14.646 38.5042 13.9804 38.7664 13.2926 38.7539C12.6049 38.7415 11.9487 38.4553 11.4623 37.9556C10.976 37.456 10.6974 36.7819 10.6852 36.0755C10.6731 35.369 10.9284 34.6853 11.3973 34.1683L17.4853 27.9144H5.30929V44.2764C5.30929 45.7228 5.86866 47.1101 6.86435 48.1329C7.86003 49.1557 9.21047 49.7303 10.6186 49.7303H21.2372ZM30.086 22.4604C30.786 22.4604 31.4704 22.2472 32.0524 21.8477C32.6345 21.4481 33.0882 20.8803 33.3561 20.2159C33.624 19.5515 33.6941 18.8204 33.5575 18.1151C33.4209 17.4098 33.0838 16.7619 32.5888 16.2534C32.0938 15.7449 31.4631 15.3986 30.7765 15.2583C30.0899 15.118 29.3782 15.19 28.7315 15.4652C28.0847 15.7404 27.5319 16.2065 27.143 16.8044C26.7541 17.4023 26.5465 18.1053 26.5465 18.8245V22.4604H30.086ZM21.2372 18.8099C21.2344 18.0914 21.0244 17.3899 20.6338 16.7938C20.2432 16.1978 19.6894 15.7341 19.0424 15.4611C18.3954 15.1881 17.6841 15.1182 16.9985 15.2601C16.3128 15.4021 15.6835 15.7495 15.1899 16.2586C14.6963 16.7676 14.3606 17.4155 14.2251 18.1204C14.0897 18.8254 14.1606 19.5557 14.4289 20.2192C14.6972 20.8828 15.1509 21.4498 15.7327 21.8487C16.3144 22.2476 16.9982 22.4604 17.6976 22.4604H21.2372V18.8099ZM35.3953 53.3663C35.3953 51.9198 35.9547 50.5326 36.9503 49.5098C37.946 48.487 39.2965 47.9123 40.7046 47.9123H69.0208C70.4289 47.9123 71.7794 48.487 72.775 49.5098C73.7707 50.5326 74.3301 51.9198 74.3301 53.3663V67.9103C74.3301 69.3568 73.7707 70.744 72.775 71.7668C71.7794 72.7896 70.4289 73.3642 69.0208 73.3642H40.7046C39.2965 73.3642 37.946 72.7896 36.9503 71.7668C35.9547 70.744 35.3953 69.3568 35.3953 67.9103V53.3663ZM70.7906 55.1843C69.8518 55.1843 68.9515 54.8012 68.2877 54.1194C67.6239 53.4375 67.251 52.5127 67.251 51.5483H63.7115C63.7115 53.477 64.4573 55.3266 65.7849 56.6904C67.1125 58.0541 68.9131 58.8203 70.7906 58.8203V55.1843ZM70.7906 62.4563C68.9131 62.4563 67.1125 63.2224 65.7849 64.5862C64.4573 65.95 63.7115 67.7996 63.7115 69.7283H67.251C67.251 68.7639 67.6239 67.8391 68.2877 67.1572C68.9515 66.4753 69.8518 66.0923 70.7906 66.0923V62.4563ZM42.4743 51.5483C42.4743 52.5127 42.1014 53.4375 41.4376 54.1194C40.7738 54.8012 39.8736 55.1843 38.9348 55.1843V58.8203C40.8123 58.8203 42.6129 58.0541 43.9405 56.6904C45.268 55.3266 46.0139 53.477 46.0139 51.5483H42.4743ZM46.0139 69.7283C46.0139 67.7996 45.268 65.95 43.9405 64.5862C42.6129 63.2224 40.8123 62.4563 38.9348 62.4563V66.0923C39.8736 66.0923 40.7738 66.4753 41.4376 67.1572C42.1014 67.8391 42.4743 68.7639 42.4743 69.7283H46.0139ZM61.0569 60.6383C61.0569 58.9507 60.4043 57.3323 59.2426 56.139C58.081 54.9457 56.5055 54.2753 54.8627 54.2753C53.2199 54.2753 51.6444 54.9457 50.4827 56.139C49.3211 57.3323 48.6685 58.9507 48.6685 60.6383C48.6685 62.3259 49.3211 63.9443 50.4827 65.1376C51.6444 66.3309 53.2199 67.0013 54.8627 67.0013C56.5055 67.0013 58.081 66.3309 59.2426 65.1376C60.4043 63.9443 61.0569 62.3259 61.0569 60.6383Z" fill="#0B7509" />
        </svg>,
        description: "Earn income for each new customer you refer and register on Gotocourse."
    },
    {
        bgColor: "#DEECFF",
        icon: <svg width="44" height="58" viewBox="0 0 44 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.0625 0C6.65898 0 4.35389 0.954796 2.65434 2.65434C0.954796 4.35389 0 6.65898 0 9.0625V50.75C0 52.6728 0.763837 54.5169 2.12348 55.8765C3.48311 57.2362 5.32718 58 7.25 58H36.25C38.1728 58 40.0169 57.2362 41.3765 55.8765C42.7362 54.5169 43.5 52.6728 43.5 50.75V9.0625C43.5 6.65898 42.5452 4.35389 40.8457 2.65434C39.1461 0.954796 36.841 0 34.4375 0L9.0625 0ZM3.625 9.0625C3.625 7.62039 4.19788 6.23734 5.21761 5.21761C6.23734 4.19788 7.62039 3.625 9.0625 3.625H34.4375C35.8796 3.625 37.2627 4.19788 38.2824 5.21761C39.3021 6.23734 39.875 7.62039 39.875 9.0625V48.1944C39.0054 47.4988 38.0621 46.9007 37.062 46.4109C34.046 44.9029 29.2284 43.5 21.75 43.5C14.2716 43.5 9.454 44.9029 6.438 46.4109C5.43793 46.9007 4.49462 47.4988 3.625 48.1944V9.0625Z" fill="#0C2191" />
        </svg>,
        description: "Get paid each month for every new customer you refer and register through your link."
    },
]


const faqs = [
    {
        question: "How do I get started as an affiliate marketer with Gotocourse?",
        answer: "Register and create an account, log in to your dashboard, generate your affiliate link and start selling."
    },
    {
        question: "Do I need to make any payment to sign up or register as an affiliate?",
        answer: "Registration as an affiliate marketer with Gotocourse is completely free."
    },
    {
        question: "How often can I make a withdrawal from my affiliate earnings?",
        answer: "You can initiate a withdrawal from your account after a minimum of 5 sales or at the end of the month."
    },
    {
        question: "Is there a direct link for complaints?",
        answer: "Affiliate marketers can make use of the chat box to contact admin or send a mail to escalate."
    },
    {
        question: "Do I have access to promotional materials to help boost my sales?",
        answer: "Necessary materials and information will be made available to affiliate marketers."
    },
    {
        question: "What commission do I get on every sales?",
        answer: "Affiliate marketers gets $50 - $250 per sales made using their affiliate link, depending on the course fee and program duration."
    },
]



const Landing = () => {
    const styles = {
        title: {
            color: "#0C2191",
            fontSize: 18,
            marginBottom: 15
        },
        answer: {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0.4
        }
    }
    return (
        <Layout>
            <div className={clsx.affiliate}>
                <div className={clsx.affiliate_top}>
                    <div className={clsx.affiliate_top__absolute}>
                        <h2>Make earning with <br /> the Gotocourse affiliate program</h2>
                        <p>Make earnings from students that register to <br /> Gotocourse through your link.</p>
                        <Link to="register">
                            <button>Get Started</button>
                        </Link>
                    </div>
                </div>

                <div className={clsx.affiliates__hero}>
                    <div className={clsx.affiliates__hero__left}>
                        <h2>
                            Make earning with the <br/>Gotocourse affiliate program
                        </h2>
                        <p>Do you have interest in helping people achieve  great success in their career?
                            Gotocourse is a platform to recommend to your followers and subscribers.  Instructors on Gotocourse are experienced practitioners who work at world's most innovative firms. Your referrals are going to learn the most in-demand tech skills relevant to today’s workplace.

                            Gotocourse has a tracking system that ensures you are compensated for all your referrals. Make use of this oppurtunity to change lives</p>

                    <button>Become an Affiliate</button>
                    </div>
                    <div className={clsx.affiliates__hero__img}>
                        <img src={img1} alt="" />

                    </div>

                </div>

                <div className={clsx.affiliate_cards}>
                    {
                        cards.map(({ bgColor, icon, description }, i) => (
                            <AffiliateCard bgColor={bgColor} icon={icon} description={description} key={i} />
                        ))
                    }
                </div>

                <div style={{ backgroundColor: "#EDFFF1" }}>
                    <div className="container-xxxl mx-auto">
                        <div className={clsx.get_started}>
                            <div className={clsx.get_started_left}>
                                <img src={img01} alt={"Placeholder"} />
                            </div>
                            <div className={clsx.get_started_right}>
                                <h3>Get access to your customized dashboard, track your best work and earnings</h3>
                                <p>Track all your traffic, referrals, and payouts with a personalized dashboard</p>
                                <div className={clsx.right_form}>
                                    <Link to="login">
                                        <button>Get started</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "var(--theme-blue" }}>
                    <div className="container-xxxl mx-auto">
                        <div className={clsx.start_now}>
                            <div className={clsx.start_now__left}>
                                <h2>Make use of this oppurtunity to change lives and make money in this house</h2>
                                <p>Earn upto 5% on qualifying registration to our  program, our competitive conversion rate help maximize earning.</p>
                                <Link to="register">
                                    <button>Start now</button>
                                </Link>
                            </div>
                            <div className={clsx.start_now__right}>
                                <img src={cactus} alt="Cactus" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx.faqs}>
                    <h2>FAQS</h2>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                faqs.slice(0, 3).map(({ question, answer }, i) => (
                                    <FaqComponent title={question} answer={answer} styles={styles} key={i} />
                                ))
                            }
                        </div>
                        <div className="col-md-6">
                            {
                                faqs.slice(3, 6).map(({ question, answer }, i) => (
                                    <FaqComponent title={question} answer={answer} styles={styles} key={i} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}



const AffiliateCard = ({ bgColor, icon, description }) => (
    <div className={clsx.affiliate_card} style={{ backgroundColor: bgColor }}>
        {icon}
        <p>
            {description}
        </p>
    </div>
)


export default Landing;