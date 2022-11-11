import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { ClassTypeComponent, InDemand } from "./landingComponents";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 280px);
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: space-around;

  @media screen and (max-width: 930px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }
  /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
`;
const IndemandClasses = () => {
  const { otherFunctions: {fetchBootcamps }, } = useAuth();
  const [shorts, setShorts] = useState([])
    
  const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps:["category", "isFetching"],

        onSuccess: (res)=>{
            if(res.data.length > 0){
                const exe = res.data.filter(item=>item.subCategory === "IN_DEMAND");
                setShorts(exe)
            }
        }
  })
  return (
    <ClassTypeComponent {...data}>
      <Grid>
        {
          shorts?.filter(item=>item.isActive).slice(0,3).map((item) => (
            <InDemand {...item} />
          ))
        }
      </Grid>
    </ClassTypeComponent>
  );
};
const data = {
  header: "",
  header2:"Explore In demand career courses",
  subtext:"Develop Tech skills most needed by companies and increase your earnings",
  content: [],
  bottomTitle:"View more In demand career courses"
}
export default IndemandClasses;
