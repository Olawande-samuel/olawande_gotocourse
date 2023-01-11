import "../classConsole/Content.css";
import { Link } from "react-router-dom";

export default function ConsoleAssessments() {
  let assessment = false
  return (
    <div className="">
      {
        assessment ?
          <main className="assess">



            <div className="assesstop">
              {[...Array(2)].map((x, id) => (
                <div className="assessbox">
                  <div className="assessleft">
                    <p className="assesstitle">Cybersecurity</p>
                    <p className="assessbold">Quiz 2</p>
                    <div className="d-flex align-center gap-2">
                      <p className="assesstitle">11/02/2022</p>
                      <p className="assesstitle">11:03</p>
                    </div>
                  </div>

                  <div className="assessright">
                    <p className="assesstitle">See Deadline</p>
                    <button className="assessbold">Open Answer</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="assessbottom">
              <p className="assessinfo">Submitted assessments</p>

              {[...Array(2)].map((x, id) => (
                <div className="assessbox">
                  <div className="assessleft">
                    <p className="assesstitle">Cybersecurity</p>
                    <p className="assessbold">Quiz 2</p>
                    <div className="d-flex align-center gap-2">
                      <p className="assesstitle">11/02/2022</p>
                      <p className="assesstitle">11:03</p>
                    </div>
                  </div>

                  <div className="assessright">
                    <p className="assesstitle">See Deadline</p>
                    <button className="assessbold">Open Answer</button>
                  </div>
                </div>
              ))}
            </div>


          </main>
          :
          <div className="dashboard_empty">
            <p>No Class Assessment</p>
          </div>
      }
    </div>
  );
}
