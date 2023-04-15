import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import mg1 from '../../images/mg1.png';
import mg2 from '../../images/mg2.jpg';
import mg3 from '../../images/mg3.png';
import mg4 from '../../images/mg5.jpg';



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
        <TabPanel value={value} index={index} style={{ height: "100%", width: "100%", }}>
          <ItemsContainer>
            <div className="left">
              <img src={item.img} alt="" loading="lazy" />
              {/* <Image image={item.img} height={"300px"} /> */}
            </div>

            <div className="right">
              <ul>
                {
                  item.link.map((list,i) => (
                    <li key={i}>{list}</li>        
                  ))
                }
              </ul>

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
        <ContentComponent />

      </div>

    </Container>
  )
}


export default Works

const tabs = [
  {
    id: 1,
    name: "Plan curriculum"
  },
  {
    id: 2,
    name: "Prepare training materials"
  },
  {
    id: 3,
    name: "Set date for cohort learning"
  },
  {
    id: 4,
    name: "Launch cohort learning"
  },

]

const content = [
  {
    id: 1,
    img: mg2,
    link: [
      "Start by defining your learning objectives and the outcomes you want to achieve.",
      "Use our platform to create a custom curriculum that meets the needs of your learners and aligns with your teaching goals.",
      "	Customize your content by adding multimedia elements like videos and images, and set learning objectives to measure progress.",
      "Track the success of your curriculum with our analytics tools, and continuously improve it based on feedback from your learners."

    ],
    btn: "Sign up"


  },
  {
    id: 2,
    img: mg1,
    link: [
      "Use our intuitive platform to create engaging and interactive training materials.",
      "	Build interactive presentations, develop hands-on exercises, and incorporate multimedia elements like videos and images",
      "Customize your materials to align with your curriculum and meet the needs of your learners.",
      "With our platform, you can easily update your materials and track their effectiveness to continuously improve your training program."
    ],
    btn: "Sign up"


  },
  {
    id: 3,
    img: mg3,
  link:[
  
    "Our scheduling tools make it easy to set dates and manage registrations for your cohort learning sessions.",
    "Send invitations, track RSVPs, and keep participants informed about upcoming sessions.",
    "Customize your session schedules to meet the needs of your learners.",
    "With Gotocourse, you can easily manage your cohort learning program and focus on delivering a great learning experience."

  ],
    btn: "Sign up"


  }, {
    id: 4,
    img: mg4,
   link:[

    "Our platform provides you with the tools you need to launch your cohort learning program with ease.",
    "Create and manage cohorts and track participants’ progress.",
    "Communicate with participants, provide feedback, and measure the success of your program with our analytics tools.",
    "With Gotocourse, you can streamline your cohort learning process and deliver a great learning experience for your learners."
   ],
    btn: "Sign up"


  }
]