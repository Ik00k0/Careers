// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  emailRegex: '[a-zA-Z]{1,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}[\.\-\_]{0,1}[a-zA-Z]{0,20}@ashesi.edu.gh',
  forgotPassURL: 'https://apps.ashesi.edu.gh/career/login/forgotpassproc.php',
  jsonHeader:  { 'Content-Type': 'application/json' },
  getAllIndustries: 'https://apps.ashesi.edu.gh/career/mobile/get_all_industry.php',
  getSpecificCareer: 'https://apps.ashesi.edu.gh/career/mobile/get_careers_on_ind.php',
  getSpecificCourseUrl: 'https://apps.ashesi.edu.gh/career/mobile/get_courses_for_career.php',
  loginUrl: 'https://apps.ashesi.edu.gh/career/login/loginproc.php',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
