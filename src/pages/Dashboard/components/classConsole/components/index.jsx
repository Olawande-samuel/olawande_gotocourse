import { Menu, MenuItem } from "@mui/material"
import {useState} from "react"
import { BiTrash } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs"



export function MenuOptionsPopup({handleDelete, x, id, handleClick, data=[], openAnchor, anchorEl, setAnchorEl }){


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
                        data?.map(({title, iconImg:Icon, action}) =>(
                            <MenuItem onClick={(e)=>action(e, id)} key={id}>
                                <i><Icon /></i>
                                <span className="ms-3">{title}</span>
                            </MenuItem>
                        ))
                        
                    }
            </Menu>

        </div>
    )
}