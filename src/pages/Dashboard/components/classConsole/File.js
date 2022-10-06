
import '../classConsole/Content.css'
import { IoMdCloudDownload } from 'react-icons/io';
import { PopModalContent } from '.';
import { useState } from 'react';

export default function File(){
    const [open, setOpen] = useState(false);
    const OpenToggle = () => setOpen(!open)
    const closeSmall = () => setOpen(false);

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
                <PopModalContent open={open} closeSmall={closeSmall} />

        </>

    )
}