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

export const KEY = "gotocourse-userdata"
export const AFFILIATE_KEY = "gotocourse-affiliate-data";
export const VERIFICATION_KEY = "userAuthdata"
export const COURSE_CATEGORY_KEY = 'gotocourse-category';

export const CLASSID = "gotocourse-classid";
// export const COURSE_CATEGORY_KEY = 'gotocourse-course-category';

export function getDate(date){
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let d = date.split("T")[0];
  let [y, m, day] = d.split("-");
  m = months[parseInt(m) - 1];
  return `${m} ${day}`;
}

export function getTime(time){
    if(time){
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

export function gotoclassPayment(title, category, bootcampId, navigate){
  if(title.trim().toLowerCase().includes("/")){
       let newTitle = title.trim().split("/").join("-").toLowerCase()
       navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${newTitle.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/payment`)
  } else {
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}/payment`)
  }

}
export function gotoclass(title, category, bootcampId, navigate){
  if(title.trim().toLowerCase().includes("/")){
       let newTitle = title.trim().split("/").join("-").toLowerCase()
       navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${newTitle.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}`)
  } else {
      navigate(`/categories/${category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}`)
  }

}
