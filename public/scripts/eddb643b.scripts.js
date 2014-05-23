"use strict";angular.module("dugoutApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/main",controller:"MainCtrl"}).when("/game",{templateUrl:"partials/game",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("dugoutApp").controller("MainCtrl",["$scope","$http","$location","Game",function(a,b,c,d){a.homeTeam=d.getHomeTeam(),a.awayTeam=d.getAwayTeam(),b.get("/api/teams").success(function(b){a.teams=b}),a.setTeams=function(a,b){d.setHomeTeam(a),d.setAwayTeam(b),c.path("/game/")}}]),angular.module("dugoutApp").controller("NavbarCtrl",["$scope","$location",function(a,b){a.menu=[{title:"Home",link:"/"}],a.isActive=function(a){return a===b.path()}}]),angular.module("dugoutApp").controller("GameCtrl",["$scope","$http","$location","Game",function(a,b,c,d){function e(){for(var b=-1,c=0;3>c&&-1!==a.innData.onBase[c];c++)b++;var d=0;if(2===b)l(),d=1;else{for(var e=b;e>0;e--)a.innData.onBase[e+1]=a.innData.onBase[e];a.innData.onBase[0]=1}u(q(g(),d)),h()}function f(){a.innData.outs++,h(),a.innData.outs>2&&(a.innData.outs=0,i(),u(s()),a.innData.top?(a.innData.top=!1,8===a.innData.inning&&a.homeTeam.score.total>a.awayTeam.score.total&&(a.gameOver=!0,u(t()))):(a.innData.inning++,a.innData.top=!0,a.innData.inning>8&&(a.gameOver=!0,u(t()))),j())}function g(){return a.innData.top?a.awayLineup[a.awayTeam.batter]:a.homeLineup[a.homeTeam.batter]}function h(){a.innData.atBat.ball=0,a.innData.atBat.strike=0,a.innData.top?(a.awayLineup[a.awayTeam.batter].atBat=!1,a.awayTeam.batter++,a.awayTeam.batter>8&&(a.awayTeam.batter=0),a.awayLineup[a.awayTeam.batter].atBat=!0):(a.homeLineup[a.homeTeam.batter].atBat=!1,a.homeTeam.batter++,a.homeTeam.batter>8&&(a.homeTeam.batter=0),a.homeLineup[a.homeTeam.batter].atBat=!0)}function i(){a.innData.top?"number"!=typeof a.awayTeam.score.inning[a.innData.inning].score&&(a.awayTeam.score.inning[a.innData.inning].score=0):"number"!=typeof a.homeTeam.score.inning[a.innData.inning].score&&(a.homeTeam.score.inning[a.innData.inning].score=0)}function j(){a.awayLineup[a.awayTeam.batter].atBat=a.innData.top,a.awayLineup[a.awayTeam.batter].nextUp=!a.innData.top,a.homeLineup[a.homeTeam.batter].atBat=!a.innData.top,a.homeLineup[a.homeTeam.batter].nextUp=a.innData.top,a.innData.onBase=[-1,-1,-1]}function k(b){var c=0;h();for(var d=0;b>d;d++)-1!==a.innData.onBase[2]&&(a.innData.onBase[2]=-1,c++,l()),-1!==a.innData.onBase[1]&&(a.innData.onBase[2]=a.innData.onBase[1],a.innData.onBase[1]=-1),-1!==a.innData.onBase[0]&&(a.innData.onBase[1]=a.innData.onBase[0],a.innData.onBase[0]=-1),a.innData.onBase[0]=0===d?1:-1;return c}function l(){a.innData.top===!0?("number"==typeof a.awayTeam.score.inning[a.innData.inning].score?a.awayTeam.score.inning[a.innData.inning].score++:a.awayTeam.score.inning[a.innData.inning].score=1,a.awayTeam.score.total++):("number"==typeof a.homeTeam.score.inning[a.innData.inning].score?a.homeTeam.score.inning[a.innData.inning].score++:a.homeTeam.score.inning[a.innData.inning].score=1,a.homeTeam.score.total++)}function m(a){var b=[];for(var c in a.lineup)if("NA"!==a.lineup[c].battingPosition){var d=a.lineup[c];d.atBat=!1,d.nextUp=!1,b.push(d)}return b.sort(function(a,b){return parseInt(a.battingPosition)-parseInt(b.battingPosition)})}function n(b,c,d){var e=a.getBatterName(b)+" hits a ";return e+=4>c?c+"B":"HR",d>0&&(e+=p(d)),e+=". "+o()}function o(){return"#"+a.awayTeam.abrv.toUpperCase()+"vs"+a.homeTeam.abrv.toUpperCase()}function p(b){var c=a.homeTeam.abrv.toUpperCase(),d=a.homeTeam.score.total,e=a.awayTeam.score.total,f=" and scores "+b+" run";return b>1&&(f+="s"),a.innData.top&&(c=a.awayTeam.abrv.toUpperCase(),d=a.awayTeam.score.total,e=a.homeTeam.score.total),d===e?f+". Game tied at "+d+"-"+e:f+". "+c+(d>e?" leads ":" trails ")+d+"-"+e}function q(b,c){return a.getBatterName(b)+" walks"+(c>0?p(c):"")+". "+o()}function r(b){return a.getBatterName(b)+" strikes out for out number "+(a.innData.outs+1)+". "+o()}function s(){var b="";return b=a.innData.top?"Going into the B"+(a.innData.inning+1)+" ":"After "+(a.innData.inning+1)+" inning"+(a.innData.inning>0?"s":"")+" ",b+=a.awayTeam.score.total===a.homeTeam.score.total?a.awayTeam.abrv.toUpperCase()+" & "+a.homeTeam.abrv.toUpperCase()+" are tied at "+a.awayTeam.score.total+".":a.awayTeam.abrv.toUpperCase()+(a.awayTeam.score.total>a.homeTeam.score.total?" leads ":" trails ")+a.homeTeam.abrv.toUpperCase()+" "+a.awayTeam.score.total+"-"+a.homeTeam.score.total+". ",b+" "+o()}function t(){var b="";if(a.awayTeam.score.total===a.homeTeam.score.total)b=a.homeTeam.abrv.toUpperCase()+" & "+a.awayTeam.abrv.toUpperCase()+" end the game tied at "+a.homeTeam.score.total+". ";else{var c=a.awayTeam,d=a.homeTeam;c.score.total<d.score.total&&(c=d,d=a.awayTeam),b=c.abrv.toUpperCase()+" defeats "+d.abrv.toUpperCase()+" by a score of "+c.score.total+"-"+d.score.total+". "}return b+o()}function u(b){a.tweets.unshift(b),a.tweets.length>10&&a.tweets.pop()}function v(b){return a.getBatterName(b)+" makes out number "+(a.innData.outs+1)+". "+o()}a.initScore=function(){for(var a={total:0,inning:[]},b=0;9>b;b++)a.inning.push({score:""});return a},a.gameOver=!1,a.homeTeam=d.getHomeTeam(),a.awayTeam=d.getAwayTeam(),a.tweets=[],null===a.homeTeam&&null===a.awayTeam?c.path("/"):(a.innData={inning:0,top:!0,atBat:{ball:0,strike:0},outs:0,onBase:[-1,-1,-1]},a.awayTeam.score=a.initScore(),a.homeTeam.score=a.initScore(),a.awayTeam.batter=0,a.homeTeam.batter=0,b.get("/api/lineup/"+a.homeTeam.id).success(function(b){a.homeRoster=b,a.homeLineup=m(b),a.homeLineup[0].nextUp=!0}),b.get("/api/lineup/"+a.awayTeam.id).success(function(b){a.awayRoster=b,a.awayLineup=m(b),a.awayLineup[0].atBat=!0})),a.ball=function(){a.innData.atBat.ball++,a.innData.atBat.ball>3&&(a.innData.atBat.ball=0,e())},a.strike=function(){a.innData.atBat.strike++,a.innData.atBat.strike>2&&(a.innData.atBat.strike=0,u(r(g())),f())},a.out=function(){u(v(g())),f()},a.hit=function(a){u(n(g(),a,k(a)))},a.getBatterName=function(a){return a.name.first.charAt(0)+". "+a.name.last}}]),angular.module("dugoutApp").service("Game",function(){this.homeTeam=null,this.awayTeam=null,this.setHomeTeam=function(a){this.homeTeam=a},this.getHomeTeam=function(){return this.homeTeam},this.setAwayTeam=function(a){this.awayTeam=a},this.getAwayTeam=function(){return this.awayTeam}});