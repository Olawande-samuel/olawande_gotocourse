import '../Console/Landing.css'
import Sidebar from '../Console/Sidebar'
import Content from '../Console/Content'

export function Landing() {
    return (
        <div className='landingcontent'>
            <div className='landingside'>
                <Sidebar/>

            </div>
            
            <div className='landingmain'>
                <Content/>
            </div>

        </div>
    )
}