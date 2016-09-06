(function() {
  "use strict";

  angular
    .module('WalkImproveApp')
    .controller('ReportsController', ReportsController);

  ReportsController.$inject = ['$http'];

  function ReportsController($http) {
    var vm = this;

    vm.all = [];
    vm.newReport = {};
    vm.addReport = addReport;
    vm.deleteReport = deleteReport;

    $http.get("http://localhost:3000/reports")
      .then(function(response) {
        vm.all = response.data.reports;
      }, function(error) {
        console.log(error)
      });

    function addReport() {
      $http.post("http://localhost:3000/reports",
        vm.newReport)
        .then(function(response) {
          vm.all.push(response.data.report);
          vm.newReport = {};
        }, function(error) {
          console.log(error)
        });
    }

    function deleteReport(report) {
      console.log(report._id);
      $http.delete("http://localhost:3000/reports/"+report._id)
        .then(function() {
          vm.all.splice(vm.all.indexOf(report), 1);
        })
    }

  }
})();
