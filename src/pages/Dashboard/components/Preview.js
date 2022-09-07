import { Box } from "@mui/material";
import { Modal } from "react-bootstrap";
import Layout from "../../../components/Layout";

export function PreviewModal({preview, open, setOpen}){

    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      minWidth: "95%",
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "10px",
      boxShadow: 24,
      p: 6,
      padding: "4rem 2rem",
    };
  
  
    return (
      <Modal
        open={open}
        onClose={e => {
          setOpen(_ => false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <div className="position-relative" style={{
            height: "80vh",
            overflowY: "scroll",
          }}>
          <Layout>
            <p>helllllllllllllllllllllllllllllllppooooooooooooooooooooooooooooooooooo</p>
            {/* <CourseDetail preview={preview} /> */}
          </Layout>
          </div>
        </Box>
      </Modal>
    )
  }