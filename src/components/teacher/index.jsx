import Layout from "../Layout"
import Customise from "./Customise"
import Faq from "./Faq"
import Hero from "./Hero"
import Reasons from "./Reasons"
import Review from "./Review"
import Stat from "./Stat"
import Unlock from "./Unlock"
import Works from "./Works"

const NewTeacherLanding = () => {
    return (
        <Layout>
        <Hero/>
        <Reasons/>
        <Stat/>
        <Works/>
        <Review/>
        <Customise/>
        <Faq/>
        <Unlock/>
        </Layout>
    )
}

export default NewTeacherLanding