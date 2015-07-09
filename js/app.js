var dataSong;
var dataArtist;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])
var volumeCurrent = 0.5;



var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
    $scope.audioObject = {}
    $scope.order = 'name'
    $scope.getSongs = function() {
        $http.get(baseUrl + $scope.track).success(function(response){
            dataSong = $scope.tracks = response.tracks.items

        })
    }
    $scope.getArtists = function(val) {
        $http.get(baseUrl + $scope.track).success(function(response){
            if(response.tracks.items.artists[0].name = val){
                dataArtist = $scope.artistAlbum = response.tracks.items.name
            }
        })
        return dataArtist;
    }

    $scope.play = function(song) {

        if($scope.currentSong == song) {
            $scope.audioObject.pause()
            $scope.currentSong = false
            $('#setVolume').hide();
            return
        }
        else {
            if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
            $scope.audioObject = new Audio(song);
            $scope.audioObject.volume = volumeCurrent;
            $scope.audioObject.play()
            $scope.currentSong = song

            function setVolume(vol) {
                volumeCurrent = vol;
                $scope.audioObject.volume = vol;
            }

            window.Player = {
                setVolume: setVolume,
            };
        }

        $("#setVolume").show();


    }
    $scope.setOrder = function(value){
        $scope.order = value;
    }
})


