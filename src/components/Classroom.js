import Image from "./Image";
import classroom from "../images/classroom.png";
import { Class } from "../images/components/svgs";

const Classroom = () => {
  return (
    <div className="classroom">
      <div className="container">
        <div className="d-flex content">
          <div className="class_left">
            <i className="icon">
              <Class style={{marginBottom:"18px"}}/>
            </i>
            <header style={{marginBlock:"18px"}}>
              <h3 className="title">Classroom Management</h3>
            </header>
            <p className="paragraph">
              We use an efficient classroom management tool that helps track
              student progress and optimise learning for both teachers and
              students.
            </p>

            <button className="btn-plain">Get Started</button>
          </div>

          <div className="class_right">
              <div className="background">
            <Image
              image={classroom}
              alt="preview of our online classroom"
              width="600px"
              height="452px"
            />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
