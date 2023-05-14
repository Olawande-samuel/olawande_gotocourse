import mixpanel from "mixpanel-browser";
mixpanel.init('de7e6e0ca11a1f334afc964a5377c489', {debug: true, ignore_dnt:true,})

let userNotIdentified = true;
let lastEventTracked = "";


export class MixpanelService {

    _identifyUserAndTrackSignIn(username, email) {
      mixpanel.identify(email);
      mixpanel.track("return-signin");
      mixpanel.people.set({
        '$name': username,
        '$email': email
      });
      userNotIdentified = false;
    };
  
    viewOwnProfile(username, email) {
      if (userNotIdentified) {
        this._identifyUserAndTrackSignIn(username, email);
      }
      mixpanel.track("view-own-profile");
    };
    
    clickCourseButton(username, email, courseTitle) {
      if (userNotIdentified) {
        this._identifyUserAndTrackSignIn(username, email);
      }
      mixpanel.track("viewed-course-details");
    };
  
  };