import styled from "styled-components";

export const Chat = styled.section`
  display: ${(props) => props.md === true ? 'none' : "grid"};
  grid-template-columns: 30% 70%;
  height: 100vh;
  font-family: "Inter", sans-serif;



  @media screen and (max-width: 680px){
    grid-template-columns: 1fr;
    display: ${(props) => props.md === false ? 'none' : "grid"};
  }
`;
export const Contact = styled.article`
  background-color: #2e3747;
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem;

  .contact_logo_wrapper {
    margin-bottom: 31px;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 100%;
  }
  span {
    color: #fff;
    font-size: 1.5rem;
  }
`;
export const Header = styled.div`
  margin-bottom: 26px;
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;

  h6 {
    margin-bottom: 0;
  }
`;
export const Search = styled.div`
  position: relative;
  color: #fff;

  input {
    width: 100%;
    position: relative;
    background-color: rgba(255, 255, 255, 0.0605);
    padding: 0.3rem;
    border-radius: 3px;
    color: #fff;
    border: 0.5px solid #666666;
  }
  i {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const ChatBox = styled.main`
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
`;


export const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
  padding-block: 11.5px;
  color: #838383;
  cursor: pointer;

  &:hover {
    background-color: #838383;
  }
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  flex: 20%;

  .chat_image_wrapper, img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  
  p {
    
    text-transform: uppercase;
    background-color: var(--theme-blue);
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    font-weight: 700;
    display: grid;
    place-items:center;
  }
`;

export const PreviewContent = styled.div`
  flex: 80%;
  position: relative;
  color: #838383;
  .name {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #fff;
    font-weight: 100;
    letter-spacing: 1px;
  }
  .previewText {
    font-size: 14px;
  }
  .time {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
  }
`;





export const Opened = styled.section`
  height: 100%;
  position: relative;

  .back {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
    cursor: pointer;

    @media screen and (min-width: 681px){
      display:none;
    }
  }
`;
export const ChatHeader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  z-index: 300;
  padding-top: 1rem;
`;
export const OpenedContent = styled.div`
  position: relative;
  height: 100%;
`;
export const InputContainer = styled.form`
  position: absolute;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  bottom: 10px;
  right: 1.5rem;
  left: 1.5rem;
  z-index: 300;
  background: #fff;
  /* padding-inline: 1.5rem; */

  .input_holder {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    flex: 85%;
    position: relative;
    color: var(--theme-blue);
    border: 1px solid rgba(0, 0, 0, 0.39);
    border-radius: 8px;

    input {
      padding: 0.4rem;
      border: none;
      outline: none;
      ::placeholder {
        color: var(--theme-blue);
      }
    }
  }

  .send {
    flex: 10%;
    button {
      padding: 5px 22px;
      color: #fff;
      background: #2e3747;
      border-radius: 10px;
      border: none;
      outline: none;
    }
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content:flex-end; */
  height: 100%;
  padding-bottom: 75px;
  padding-top: 65px;
  padding-inline: 1.5rem;
  overflow-y: auto;
`;











export const Closed = styled.section`
  height: 100%;
  background: #fff;
  display: grid;
  place-items: center;
`;
export const ImgWrapper = styled.div`
  width: min(100% - 0.5rem, 400px);
  height: min(100% - 0.5rem, 400px);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #eaf4ff;
  color: #004db6;

  img {
    max-width: 100%;
    max-height: 250px;
  }
`;










export const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-block: 0.7rem;
  align-self: ${(props) => (props.sender === true ? "flex-end" : "flex-start")};
`;
export const BarProfile = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;

  /* order: ${(props) => (props.sender === "user" ? "2" : "1")}; */

  img {
    max-width: 100%;
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  p {
    text-transform: uppercase;
    background-color: var(--theme-blue);
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    text-align: center;
    font-weight: 700;
    display: grid;
    place-items:center;
  }
`;
export const BarText = styled.div`
  border-radius: 30px;
  padding: 0.4rem;
  max-width: 400px;
  background-color: ${(props) =>
    props.color === "purple" ? "#2e3747" : "#FFCFCF"};
  color: ${(props) => (props.color === "purple" ? "#fff" : "#626262")};
  /* order: ${(props) => (props.sender === "user" ? "1" : "2")}; */
`;



// 

export const TabWrapper = styled.div`

margin-bottom: .4rem;

`