import { FormControlLabel, Menu, MenuItem, Switch } from "@mui/material"
import {useState} from "react"
import { BiTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs"
import { Navigate, useNavigate } from "react-router-dom";



export function MenuOptionsPopup({handleDelete, x, id, schedule, handleClick, data=[], openAnchor, anchorEl, setAnchorEl, toggleDownload, content, handleIsDownloadable }){
    

    const handleClose = () => {
        
        setAnchorEl(null);
    }



    return (
        <div className="suite__dots">
            <BsThreeDotsVertical
                id="basic-button"
                aria-controls={openAnchor ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openAnchor ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openAnchor}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                >
                    
                    {
                        data?.map(({title, iconImg:Icon, event}) =>(
                            <MenuItem onClick={(e)=>event(e, id)} key={id}>
                                <i><Icon /></i>
                                <span className="ms-3">{title}</span>
                            </MenuItem>
                        ))
                        
                    }

                    {content && 
                        <MenuItem onClick={(e)=>toggleDownload(e, id)} key={id}>
                            {/* <i><Icon /></i> */}
                            <FormControlLabel
                                control={<Switch />}
                                label="Downloadable"
                                labelPlacement="side"
                                value="isDownloadable"
                                // checked={formstate.isLocked}
                                checked={true}
                                onClick={handleIsDownloadable}
                            />
                        </MenuItem>
                    }


            </Menu>

        </div>
    )
}