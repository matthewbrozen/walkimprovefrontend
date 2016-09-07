(function() {
  "use strict";

  angular
    .module('WalkImproveApp')
    .controller('ReportsController', ReportsController);

  ReportsController.$inject = ['$http'];

  function ReportsController($http) {
    var vm = this;

    vm.all= [];
    vm.newReport = {};
    vm.addReport = addReport;
    vm.deleteReport = deleteReport;


    $http.get("backendUrl/reports")
      .then(function(response) {
        vm.all = response.data.allReports;
        console.log(vm.all);
      }, function(error) {
        console.log(error)
      });

    function addReport() {
      $http.post("backendUrl/reports",
        vm.newReport)
        .then(function(response) {
          vm.all.push(response.data.report);
          vm.newReport = {};
          console.log(vm.newReport);
          $http.get("backendUrl/reports")
            .then(function(response) {
              vm.all = response.data.allReports;
              console.log(vm.all);
            }, function(error) {
              console.log(error)
            });

        }, function(error) {
          console.log(error)
        });
    }

    function deleteReport(report) {
      console.log(report._id);
      $http.delete("backendUrl/reports/"+report.id)
        .then(function() {
          vm.all.splice(vm.all.indexOf(report), 1);
        })
    }

  }
})();
