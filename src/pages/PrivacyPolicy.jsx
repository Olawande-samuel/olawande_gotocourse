import Layout from "../components/Layout";
import {policies} from "../data"
const Policies = ()=>{
    return (
        <Layout>
            <main className="policy_wrapper">
                <div className="container">
                    {/* <h2 className="text-center fw-bolder py-3">OUR POLICIES</h2> */}

                    <section id="privacy">
                        <h4  className="policy_title">Privacy Policy</h4>

                        <ul>
                            {policies.privacy.map(({details}, index)=>(
                                <li key={index}>{details}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

        </Layout>
    )
}
export const TeachingPolicy = ()=>{
    return (
        <Layout>
            <main className="policy_wrapper">
                <div className="container">
                    <section id="teaching">
                        <h4>Teaching Policy</h4>
                        <h6 className="policy_title">On GOTOCOURSE: </h6>
                        <ul>
                            {policies.teaching.map(({details}, index)=>(
                                <li key={index}>{details}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

        </Layout>
    )
}
export const EndUserPolicy = ()=>{
    return (
        <Layout>
            <main className="policy_wrapper">
                <div className="container">
                    <section id="end-user">
                        <h4 className="policy_title">End User Policy</h4>
                        <ul>
                            {policies.endUser.map(({details}, index)=>(
                                <li key={index}>{details}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

        </Layout>
    )
}
export const TermsOfUse = ()=>{
    return (
        <Layout>
            <main className="policy_wrapper">
                <div className="container">
                    <section id="terms-of-use">
                        <h4 className="policy_title">Terms of Use</h4>
                        <ul>
                            {policies.TOU.map((item, index)=>(
                                <>
                                    <li key={index}>{item.details}</li>
                                    {item.info?.length > 0 && item.info?.map(({content}, index)=>(
                                     <li className="policy_inner_list" key={index}>{content}</li>
                                    ))}
                                </>

                            ))}
                        </ul>
                    </section>
                    
                </div>
            </main>

        </Layout>
    )
}
export const Cookies = ()=>{
    return (
        <Layout>
            <main className="policy_wrapper">
                <div className="container">
                    <section id="cookies">
                        <h4 className="policy_title">Cookies</h4>
                        <p>This informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.</p>
                        <p>We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.</p>
                        <h4>Information Collection And Use</h4>
                        <p>While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, postal address, and phone number.</p>
                    </section>
                    
                </div>
            </main>

        </Layout>
    )
}

export default Policies