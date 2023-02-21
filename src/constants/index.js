export const colors = {
  primary: "#f5f5f5",
  black: "rgba(0, 0, 0, 1)",
  white: "#fff",
  obsidian: "#070f18",
  textColorDark: "#081131",
  textColorLight: "#5e5b5b",
  textColorLighter: "#9F9F9F",
  btnColor: "rgb(12, 33, 145)",
  accentColor: "#023047",
  textBlue: "#0C2191",
  greenish: "#023047",
  secondary: "#2F80ED",
  gray: "#9DA6BA",
  info: "#5A63F7",
  green: "#037615"
}

export const breakpoints = {
  mobileLg: '425px',
  tablet: '768px',
  laptop: '1024px',
}

export const baseURL = process.env.REACT_APP_BASEURL;
export const IMAGEURL = process.env.REACT_APP_IMAGEURL;
// export const BLOGURL = "https://gotocourse.com/events&articles/articles";
export const BLOGURL = "https://blog.gotocourse.com/events&articles/articles";

export const KEY = "gotocourse-userdata"
export const AFFILIATE_KEY = "gotocourse-affiliate-data";
export const VERIFICATION_KEY = "userAuthdata"
export const COURSE_CATEGORY_KEY = 'gotocourse-category';

export const CLASSID = "gotocourse-classid";
// export const COURSE_CATEGORY_KEY = 'gotocourse-course-category';

export function getDate(date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = date?.split("T")[0];
  let [y, m, day] = d.split("-");
  m = months[parseInt(m) - 1];
  return `${m} ${day}`;
}
export function getFullDate(date) {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = date?.split("T")[0];
  let [y, m, day] = d.split("-");
  m = months[parseInt(m) - 1];
  return `${m} ${day} ${y}`;
}

export function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time?.length > 1) { // If time format correct
    time = time?.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}


export function calculateWeeksBetween(date1, date2) {
  let week, days
  let difference = Math.abs(new Date(date1) - new Date(date2)) / 1000 / 60 / 60 / 24;
  console.log("diffenrence", difference)
  if (difference > 7) {
    week = Math.abs(difference / 7);
    days = Math.floor(difference % 7);
    console.log("week", week)
    console.log("days", days)
    return
  }
  return "checking"
}

export function getTime(time) {
  if (time) {
    let d = time.split("T")[1];
    return d;
  }
  return ""

}

export const capitalize = (str) => {
  let strArray = str?.toLocaleLowerCase().split("");
  strArray[0] = strArray[0].toLocaleUpperCase();
  return strArray.join("");
}

export function gotoclassPayment(title, category, bootcampId, navigate, trainee) {
  console.log({trainee});
  if (trainee) {
    if (title.trim().toLowerCase().includes("/")) {
      let newTitle = title.trim().split("/").join("-").toLowerCase()
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${newTitle.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/pay`)
    } else {
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/pay`)
    }
  } else {
    if (title.trim().toLowerCase().includes("/")) {
      let newTitle = title.trim().split("/").join("-").toLowerCase()
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${newTitle.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/payment`)
    } else {
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/payment`)
    }
  }



}
export function gotoclass(title, category, bootcampId, navigate) {
  if (title.trim().toLowerCase().includes("/")) {
    let newTitle = title.trim().split("/").join("-").toLowerCase()
    navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${newTitle.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}`)
  } else {
    navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}`)
  }

}
export function changeConstants(name) {
  if (name === "SELF_PACED") return "Self-paced"
  if (name === "COHORT") return "Cohort"
  if (name === "MENTORSHIP") return "One-on-One"
  if (name === "PHYSICAL") return "In-person Training"
  return name
}

export function changeSubCategory(sub) {
  if (sub === "UPSKILL_COURSES") return "Upskill"

  if (sub === "IN_DEMAND") return "In-Demand"

  if (sub === "EXECUTIVE_COURSES") return "Executive"

  if (sub === "SHORT_COURSES") return "Short"

  if (sub === "TECH_ENTREPRENEURSHIP") return "Tech Enterpreneurship"

  return sub

}