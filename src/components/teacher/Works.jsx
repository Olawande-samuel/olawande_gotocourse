import styled from "styled-components"
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import mg1 from  '../../images/mg1.png'
import mg2 from  '../../images/mg2.png'
import mg3 from  '../../images/mg3.png'
import mg4 from  '../../images/mg4.png'



const Container = styled.div`
padding: 2rem 0;
font-family: "Raleway";

.container{
    .tophead{
        text-align: center;
        h4{
       margin-bottom: 1rem;
       text-align: center;
       font-family: 'Raleway';
       font-style: normal;
       font-weight: 800;
       font-size: 28px;
    }
        p{
            font-weight: 400;
            color: #000000;
            font-size: 18px;

        }
    }
}
`
const ItemsContainer = styled.div`
display: flex;

.left{
    flex: .5;
    height: 350px;
    text-align: center;
    img{
        max-width: 100%;
        max-height: 100%;
    }
}

.right{
    flex: .5;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
    }

    button {
        margin-top: 2rem;
        border: 2px solid white;
        border-radius: 7px;
        background: var(--theme-blue);
        color: #fff;
        padding: 0.5rem 2rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }

    
}

@media (max-width: 768px){
    flex-direction: column;
}


`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{ height: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ContentComponent = () => {
  const [value, setValue] = useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {tabs.map((h, i) => (
            <Tab label={h.name} {...a11yProps(i)} />
          ))}
        </Tabs>
      </div>
      {content.map((item, index) => (
        <TabPanel value={value} index={index} style={{ height: "100%", width:"100%",  }}>
            <ItemsContainer>
                <div className="left">
                    <img src={item.img} alt="" />
                </div>

                <div className="right">
                    <p>
                        {item.text1} 
                        <br/>
                        <br/>
                        {item.text2}
                    </p>

                    <div>
                        <Link to={`/qualifications`}>
                        <button>{item.btn}</button>
                        </Link>
                    </div>

                </div>

            </ItemsContainer>
          
        </TabPanel>
      ))}
    </div>
  )
}



const Works = () => {
    return (
        <Container>
            <div className="container">
                <div className="tophead">
                    <h4>How It Works</h4>
                    <p>Check out the features on Gotocourse that makes the teaching of technical skills seamless</p>
                </div>
                <ContentComponent/>

            </div>

        </Container>
    )
}


export default Works 

const tabs=[
    {
        id: 1,
        name:"Plan curriculum"
    },
    {
        id: 2,
        name:"Prepare training materials" 
    },
    {
        id: 3,
        name:"Set date for cohort learning" 
    },
    {
        id: 4,
        name:"Launch cohort learning" 
    },

]

const content =[
    {
        id:1,
        img:mg1,
        text1:`
        GoToCourse is the perfect platform for creating, 
        managing, and delivering engaging and interactive 
        curriculum. With a wide range of features and a powerful 
        user interface, GoToCourse makes it easy to plan 
        and track your curriculum development and delivery.
        `,
        text2:`With GoToCourse, you can be sure that your 
        curriculum is engaging and up-to-date, helping to 
        ensure that your students get the most out of their 
        learning experience.
        `,
        btn:"Sign up"


    },
    {
            id:2,
            img:mg2,
            text1:`
            Are you an educator looking to bring your classroom to the next level? Launch cohort learning with GoToCourse, the e-learning platform designed just for you! With GoToCourse, you can easily create and launch your own unique learning experience. From interactive content to engaging activities and assessments, you can create a powerful learning environment that challenges and inspires your students.
            `,
            btn:"Sign up"


        },
        {
            id:3,
            img:mg3,
            text1:`
            Are you an educator looking to bring your classroom to the next level? Launch cohort learning with GoToCourse, the e-learning platform designed just for you! With GoToCourse, you can easily create and launch your own unique learning experience. From interactive content to engaging activities and assessments, you can create a powerful learning environment that challenges and inspires your students.
            `,
           
            btn:"Sign up"
    
    
        },{
            id:4,
            img:mg4,
            text1:`
            Are you a teacher looking to create educational materials for your students? Gotocourse is the perfect e-learning platform for you! Our platform allows teachers to easily create and customize training materials for their classes. You can use our intuitive tools to create interactive and engaging materials that can be used both in the classroom and online. With Gotocourse, you can create a unique learning experience for your students that is tailored to their individual interests and needs. Join us today and start creating the materials you need to make your class a success!
            `,
            btn:"Sign up"
    
    
        }
]