import React from "react";
import styled from "styled-components";
import { ClassTypeComponent, InDemand } from "./landingComponents";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 280px);
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: space-around;

  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 240px), 240px));
    justify-content: space-around;
  }
  /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
`;
const IndemandClasses = () => {
  return (
    <ClassTypeComponent {...data}>
      <Grid>
        {[...Array(3)].map((item) => (
          <InDemand />
        ))}
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
