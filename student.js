myApp.service('student', ['api',
  function (api) {

    this.registerStudent = function (formData) {
      console.log(formData);
      console.lof("near");

      var fd = new FormData();

      fd.append('email', formData.email);
      fd.append('mobileNumber', formData.contactNumber);
      fd.append('password', formData.password);
      fd.append('registrationToken', formData.registrationToken);

      var headers = {
        'Content-Type': undefined
      };

      console.log(headers);
      return api.put('/api/student/register', {data: fd, headers: headers});

    };


  }
]);
