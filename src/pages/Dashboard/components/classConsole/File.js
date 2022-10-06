
import '../classConsole/Content.css'
import { IoMdCloudDownload } from 'react-icons/io';

export default function File({ OpenToggle}){
    return (
        <>
         <div className=''>
                    

                    <section className="contenttop">
                        <div className="contentbutton">
                            <button className=''>Refresh</button>
                            <button className='' onClick={OpenToggle}>Add New +</button>
                        </div>

                    </section>

                    <main className='contentbody'>


                    </main>

                    <div className="contentbutton">
                        <button className=''>Open</button>
                        <div>
                            <IoMdCloudDownload />
                        </div>
                    </div>

                </div>
        </>

    )
}