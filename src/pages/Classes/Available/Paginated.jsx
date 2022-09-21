import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { ClassLists } from './index';
import { AdvancedError } from '../../../classes';
import { useAuth } from '../../../contexts/Auth';

const PaginatedClasses = ({itemsPerPage=8, list}) => {
    const {otherFunctions: {fetchBootcamps}} = useAuth();
   // We start with an empty list of items.
   const [bcs, setBcs] = useState([]);
   const [currentItems, setCurrentItems] = useState(null);
   const [pageCount, setPageCount] = useState(0);
   // Here we use item offsets; we could also use page offsets
   // following the API or data you're working with.
   const [itemOffset, setItemOffset] = useState(0);
 
   useEffect(() => {
     // Fetch items from another resources.
     const endOffset = itemOffset + itemsPerPage;
     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
     setCurrentItems(list.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(list.length / itemsPerPage));
   }, [itemOffset, itemsPerPage, list]);
 
   // Invoke when user click to request another page.
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % list.length;
     console.log(
       `User requested page number ${event.selected}, which is offset ${newOffset}`
     );
     setItemOffset(newOffset);
   };
 
   return (
     <>
        <ClassLists bootcamps={currentItems} />
        {
            currentItems?.length > 8  &&
            <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="prev"
            renderOnZeroPageCount={null}
            activeClassName="activeClassName"
            pageClassName="pageClassName"
            containerClassName="paginateWrapper"
            previousLinkClassName="previousLinkClassName"
            nextLinkClassName="nextLinkClassName"
            previousClassName="previousClassName"
            nextClassName="nextClassName"
            disabledClassName="disabledClassName"
            />
        }
     </>
   );
} 

export default PaginatedClasses