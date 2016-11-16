myApp.service('currentUser',["session", "$rootScope", function (session, $rootScope) {



    this.isLoggedIn = function () { return !!(session.auth_token()); } ;

    this.subDomain = '';

    this.setSubDomain = function (port, host) {
       this.subDomain = getSubDomainFromUniversityUrl(port, host) ;
    } ;

    this.type = "student" ;

    this.registrationId = null ;

    this.setUserType = function (isUniversityUrl) {
      if(isUniversityUrl)
        this.type = "university" ;
    } ;

    this.store = function (user) {
      session.set(user) ;
    } ;

    this.load = function() {
      session.load() ;
    } ;

    this.unload = function() {
      session.clear() ;
    } ;

    this.user = function() {
      return session.user() ;
    } ;

    this.getAuthToken = function() {
      return session.auth_token() ;
    } ;

    this.autoLogout = function () {
      this.unload();

      $rootScope.$broadcast('logout');
    } ;

    this.logout = function () {

      this.unload();
      $rootScope.$broadcast('auth:logged-out');

    } ;


}]) ;
