  /*
   
   Sector 33 Classroom Edition.  Copyright 2015, NASA.  All rights reserved.
   
   Sector 33 CE creates an environment for setting up and testing airplane routes similar to an air traffic controller's task.  In addition to pre-defined problems, the user can also create
   their own problems to solve.  
   
   jQuery and several plugins are used throughout the product: https://jquery.org/license/
   
  */

// Setup variables and global environment.  Layout is statically defined to a pre-set layout size of 1024x768.
  
  var currentMouseX, currentMouseY;
  var isInPlay = false;
  var canHoverOverRoute = false;
  var hoverRouteNum = 0;
  var hoverRoute = null;
  var hoverPosition;
  
  var checkColor = 'limegreen';
  
  var currentAnchorPos = { // anchor pos var for tracking anchor used to drag routes (round bullseye button)
  top: 1,
  left: 1
  };
  var currentProblem = readStorage('Sector33CurrentProblem');
  var isMuted = readStorage('Sector33SoundSetting');
  var disableSound = false;
  
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_Opera = navigator.userAgent.indexOf("Presto") > -1;
  var is_IE9 = document.all && !window.atob;
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1;
  var isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
  var isLinux = navigator.platform.toUpperCase().indexOf('LINUX')!==-1;



  if (!currentProblem) currentProblem = '2-1'; // Default problem in newly loaded
  
  var currentRoute = route1;
  var planes = [];
  var cplanes = [];
  
  var initialMilesPixels = 17.33; // statically defined distance for each mile in pixels
  var oLeft = 0.0;
  var oTop = 0.0;
  var k600KnotPixels = 2.8885; // value to use for each incremental move
  var currentSpeed = 1000; // Toggled speed of display updates
  var totalTime = 320; // Total time for each problem
  var inc = 0;
  var intervalID;
  var hideMenuIntervalID = 0;
  var speedChangeTimeout = 0;
  var menuTimeout = 0;
  var interval;
  var stepperInterval = 0; // Stepper when in review mode
  var incSteps = 0;
  var flip = false;
  var isPaused = false;
  var isInReview = false;
  var isInCreate = false;
  var isInSolve = false;
  var reviewItems = [];
  var routeNum = 0;
  var numPlanes = 0;
  var finalPlaneOrder = 0;
  var cloud1Route = 0;
  var cloud2Route = 0;
  var currentPlane = null;
  var isPaused = true;
  var hasEnded = false;
  var isShowingHelp = false;
  var isShowingExtras = false;
  var hasBuiltCreate = false;
  var isShowingProblemSelection = false;
  var didCollide = false;
  var div2 = 20; // divisor to split values by half
  var median = 246; // statically defined pixel y value for median or middle line
  var r0End = { // first startpoint (left most point) for all routes
  top: median,
  left: 42
  };
  var mod = {  // Modesto
  top: median,
  left: r0End.left + 208
  };

  var oal = {
  top: median,
  left: mod.left + 225
  };
  var tph = {
  top: median,
  left: oal.left + 172
  };
  var minah = {
  top: median - 149,
  left: oal.left + 88
  };
  var lidat = {
  top: median + 149,
     left: oal.left + 90
  };
  var r1End = { // first startpoint (right most point) on route 1,2
  top: median - 176,
  left: 857
  };
var r3End = { // first startpoint (right most point) on route 3
top: 97,
left: tph.left + 256
};
  var r4End = { // first startpoint (right most point) on route 4
  top: median,
  left: r3End.left - 11
  };
var r5End = { // first startpoint (right most point) on route 5,6
top: median + 182,
left: r1End.left
};

  var target1Center = { // target locations.  Targets are X icons to land plane on at end of problem
  x: mod.left,
  y: mod.top
  };
  var target2Center = {
  x: mod.left - 52,
  y: mod.top
  };
  var target3Center = {
  x: mod.left - 104,
  y: mod.top
  };
  var target4Center = {
  x: mod.left - 156,
  y: mod.top
  };
  var target5Center = {
  x: mod.left - 208,
  y: mod.top
  };
  target2Center = {
  x: mod.left - 51,
  y: mod.top
  };
  target3Center = {
  x: mod.left - 103,
  y: mod.top
  };
  target4Center = {
  x: mod.left - 155,
  y: mod.top
  };
  target5Center = {
  x: mod.left - 207,
  y: mod.top
  };

  var route0 = { // defined routes.  Routes start at 0 (0-5 == 1-6)
  routeNum: 0,
  point3: r1End,
  point2: r1End,
  point1: r1End,
  point0: r1End,
  segment1miles: 0,
  segment2miles: 0,
  segment3miles: 0
  };
  
  var route1 = {
  routeNum: 1,
  point3: r1End,
  point2: minah,
  point1: mod,
  point0: r0End,
  segment1miles: 17,
  segment2miles: 0,
  segment3miles: 0
  };
  var route2 = {
  routeNum: 2,
  point3: r1End,
  point2: minah,
  point1: oal,
  point0: r0End,
  segment1miles: 17,
  segment2miles: 10,
  segment3miles: 0
  };
  var route3 = {
  routeNum: 3,
  point3: r3End,
  point2: tph,
  point1: oal,
  point0: r0End,
  segment1miles: 17,
  segment2miles: 10,
  segment3miles: 0
  };
  var route4 = {
  routeNum: 4,
  point3: r4End,
  point2: tph,
  point1: oal,
  point0: r0End,
  segment1miles: 14,
  segment2miles: 10,
  segment3miles: 0
  };
  var route5 = {
  routeNum: 5,
  point3: r5End,
  point2: lidat,
  point1: oal,
  point0: r0End,
  segment1miles: 17,
  segment2miles: 10,
  segment3miles: 0
  };
  var route6 = {
  routeNum: 6,
  point3: r5End,
  point2: lidat,
  point1: mod,
  point0: r0End,
  segment1miles: 17,
  segment2miles: 0,
  segment3miles: 0
  };

  var rectOffset = 0; // offset for different resolutions (if necessary)
  var rectangle1a = { // drop zones for anchors, etc.)
  x1: route1.point0.left - rectOffset,
  x2: route1.point1.left + rectOffset,
  y1: route1.point0.top - rectOffset,
  y2: route1.point1.top + rectOffset
  };
  var rectangle1b = {
  x1: route1.point1.left - rectOffset,
  x2: route1.point2.left + rectOffset,
  y1: route1.point1.top - rectOffset,
  y2: route1.point2.top + rectOffset
  };
  var rectangle1c = {
  x1: route1.point2.left - rectOffset,
  x2: route1.point3.left + rectOffset,
  y1: route1.point2.top - rectOffset,
  y2: route1.point3.top + rectOffset
  };
  var rectangle1ba = {
  x1: route1.point1.left + 40,
  x2: route1.point2.left - 20,
  y1: route1.point1.top - 50,
  y2: route1.point2.top + 20
  };

  var rectangle2a = {
  x1: route2.point0.left - rectOffset,
  x2: route2.point1.left + rectOffset,
  y1: route2.point0.top - rectOffset,
  y2: route2.point1.top + rectOffset
  };
  var rectangle2b = {
  x1: route2.point1.left - rectOffset,
  x2: route2.point2.left + rectOffset,
  y1: route2.point1.top - rectOffset,
  y2: route2.point2.top + rectOffset
  };
  var rectangle2c = {
  x1: route2.point2.left - rectOffset,
  x2: route2.point3.left + rectOffset,
  y1: route2.point2.top - rectOffset,
  y2: route2.point3.top + rectOffset
  };
  
  var rectangle3a = {
  x1: route3.point0.left - rectOffset,
  x2: route3.point1.left + rectOffset,
  y1: route3.point0.top - rectOffset,
  y2: route3.point1.top + rectOffset
  };
  var rectangle3b = {
  x1: route3.point1.left - rectOffset,
  x2: route3.point2.left + rectOffset,
  y1: route3.point1.top - rectOffset,
  y2: route3.point2.top + rectOffset
  };
  var rectangle3c = {
  x1: route3.point2.left - rectOffset,
  x2: route3.point3.left + rectOffset,
  y1: route3.point2.top - rectOffset,
  y2: route3.point3.top + rectOffset
  };
  
  var rectangle4a = {
  x1: route4.point0.left - rectOffset,
  x2: route4.point1.left + rectOffset,
  y1: route4.point0.top - rectOffset,
  y2: route4.point1.top + rectOffset
  };
  var rectangle4b = {
  x1: route4.point1.left - rectOffset,
  x2: route4.point2.left + rectOffset,
  y1: route4.point1.top - rectOffset,
  y2: route4.point2.top + rectOffset
  };
  var rectangle4c = {
  x1: route4.point2.left - rectOffset,
  x2: route4.point3.left + rectOffset,
  y1: route4.point2.top - rectOffset,
  y2: route4.point3.top + rectOffset
  };
  
  var rectangle5a = {
  x1: route5.point0.left - rectOffset,
  x2: route5.point1.left + rectOffset,
  y1: route5.point0.top - rectOffset,
  y2: route5.point1.top + rectOffset
  };
  var rectangle5b = {
  x1: route5.point1.left - rectOffset,
  x2: route5.point2.left + rectOffset,
  y1: route5.point1.top - rectOffset,
  y2: route5.point2.top + rectOffset
  };
  var rectangle5c = {
  x1: route5.point2.left - rectOffset,
  x2: route5.point3.left + rectOffset,
  y1: route5.point2.top - rectOffset,
  y2: route5.point3.top + rectOffset
  };
  
  var rectangle6a = {
  x1: route6.point0.left - rectOffset,
  x2: route6.point1.left + rectOffset,
  y1: route6.point0.top - rectOffset,
  y2: route6.point1.top + rectOffset
  };
  var rectangle6b = {
  x1: route6.point1.left - rectOffset,
  x2: route6.point2.left + rectOffset,
  y1: route6.point1.top - rectOffset,
  y2: route6.point2.top + rectOffset
  };
  var rectangle6c = {
  x1: route6.point2.left - rectOffset,
  x2: route6.point3.left + rectOffset,
  y1: route6.point2.top - rectOffset,
  y2: route6.point3.top + rectOffset
  };

  var vHideMenu = function() {
	  hideAllRoutes("vhidemenu");
  };

    // Read storage used to get around issue with Chrome, etc. not accepting local cookies when in offline mode.
    function readStorage (key) {
        if (typeof(localStorage) == 'undefined' ){
            return $.cookie(key);
        }
        else{
            return localStorage.getItem(key);
        }
    
    }

    function writeStorage(key, str) {
        if (typeof(localStorage) == 'undefined' ){
            $.removeCookie('Sector33CurrentProblem');
            $.cookie('Sector33CurrentProblem', str, {
                     expires: 365
                     });
        }
        else{
            try{
                localStorage.setItem(key, str);
            }
            catch (e){
                alert("save failed!");
                if (e == QUOTA_EXCEEDED_ERR){
                    alert('Quota exceeded!');
                }
            }
        }
    }

    // reset all variables and return to defaults
  function resetVars() {
      isInPlay = false;
      canHoverOverRoute = false;
      hoverRouteNum = 0;
      hoverRoute = null;
      
      checkColor = 'limegreen';
      
      currentAnchorPos = {
      top: 1,
      left: 1
      };
      currentProblem = readStorage('Sector33CurrentProblem');
      
      if (!currentProblem) currentProblem = '2-1';
      
      currentRoute = route1;
      planes = [];
      cplanes = [];
      
      initialMilesPixels = 17.33;
      oLeft = 0.0;
      oTop = 0.0;
      k600KnotPixels = 2.8885;
      currentSpeed = 1000;
      totalTime = 320;
      inc = 0;
      intervalID = 0;
      hideMenuIntervalID = 0;
      speedChangeTimeout = 0;
      menuTimeout = 0;
      interval = 0;
      stepperInterval = 0;
      incSteps = 0;
      flip = false;
      isPaused = false;
      isInReview = false;
      isInCreate = false;
      isInSolve = false;
      reviewItems = [];
      routeNum = 0;
      numPlanes = 0;
      finalPlaneOrder = 0;
      cloud1Route = 0;
      cloud2Route = 0;
      currentPlane = null;
      isPaused = true;
      hasEnded = false;
      isShowingHelp = false;
      isShowingExtras = false;
      hasBuiltCreate = false;
      isShowingProblemSelection = false;
      didCollide = false;
     
  }

    // Provide all math and functionality to get planes moving and stage updated.
  function movePlane() {
	  if (isInReview) {
        setTrackingItem();
      }
	  else $("#reviewButton").css({'opacity': 1});
	  
      // if in review mode and going backwards, then flip is true
	  if (flip) {
		  inc--;
	  } else {
		  inc++;
	  }
	  $(".collisionError").hide();
	  
      // problem is over, so show the score
	  if (isInSolve && firstPlaneIsOnLastTarget() && !flip) {
		  if (!isInReview) score();
		  return;
	  }
	  
	  if ( (inc < 0 || inc > totalTime) && !isInSolve) {
		  clearInterval(intervalID);
          if (!isInReview) score();
	  } else {
		  hideMenuIntervalID++;
		  var speedCheck = currentSpeed == 500 ? 10 : currentSpeed == 100 ? 50 : 5;
		  if (hideMenuIntervalID > speedCheck) {
			  hideMenuIntervalID = 0;
			  hideAllRoutes();
		  }
		  var cuMin = parseInt(inc / 60);
		  var cuSec = inc % 60;
		  var countDownVal = totalTime - inc;
		  var cdMin = parseInt(countDownVal / 60);
		  var cdSec = countDownVal % 60;
		  var cuText = cuSec < 10 ? cuMin + ':0' + cuSec : cuMin + ":" + cuSec;
		  var cdText = cdSec < 10 ? cdMin + ':0' + cdSec : cdMin + ":" + cdSec;
		  $("#incrementalTime").text(cuText);
		  $("#totalTime").text(cdText);
		  $("#progressbar").progressbar("option", "value", inc);
		  
          // setup planes for next pass
		  var len = planes.length;
		  for (var i = 0; i < len; ++i) {
			  if (i in planes) {
				  var s = planes[i];
				  if (s.colliding) {
 					  $(".collisionError").show();
				  }
                  
                  var tag = "#" + s.color;
				  var tagId = tag + "tag";
				  var tLeft = parseInt($(tagId).css('left'));
				  var tTop = parseInt($(tagId).css('top'));
				  sLeft = parseInt($(tag).css('left'));
				  sTop = parseInt($(tag).css('top'));
				  sCenterX = sLeft + div2;
				  sCenterY = sTop + div2;
				  if (s.left == 0) {
					  s.left = sLeft;
					  s.top = sTop;
				  }
				  
				  if (Math.abs(sCenterY - median) < 2) $(tag).css({
																  'top': sCenterY - median
																  });
				  var startOfRoute;
				  var endOfRoute;
				  var flipOffset = flip ? k600KnotPixels : 0;
				  var kDiv2 = k600KnotPixels/2.5;
				  
				  if ((sCenterX <= s.route.point1.left - flipOffset && Math.abs(sCenterY - s.route.point1.top) < k600KnotPixels / 2)
					  || ((currentProblem == "2-10" || currentProblem == "5-7") &&
						  (sCenterX <= s.route.point1.left - flipOffset+kDiv2 && Math.abs(sCenterY - s.route.point1.top) < (k600KnotPixels+kDiv2) / 2) ))
					  {
                      
					  startOfRoute = {
					  left: s.route.point1.left,
					  top: s.route.point1.top
					  };
					  endOfRoute = {
					  left: s.route.point0.left,
					  top: s.route.point0.top
					  };
					  
						  
				  } else if (sCenterX <= s.route.point2.left - flipOffset) {
					  startOfRoute = {
					  left: s.route.point2.left,
					  top: s.route.point2.top
					  };
					  endOfRoute = {
					  left: s.route.point1.left,
					  top: s.route.point1.top
					  };
					  s.canChangeRoute = false;
					  if (s.showingRoute) if (s.route == route1 || s.route == route2) $("#anchor1").hide();
					  else $("#anchor2").hide();
				  } else {
					  
					  startOfRoute = {
					  left: s.route.point3.left,
					  top: s.route.point3.top
					  };
					  endOfRoute = {
					  left: s.route.point2.left,
					  top: s.route.point2.top
					  };
				  }
				  if (flip) {
					  var saveRoute = startOfRoute;
					  startOfRoute = endOfRoute;
					  endOfRoute = saveRoute;
				  }
				  
				  var startRoutePointWithOffset = {
				  left: startOfRoute.left - div2,
				  top: startOfRoute.top - div2
				  }
				  var endRoutePointWithOffset = {
				  left: endOfRoute.left - div2,
				  top: endOfRoute.top - div2
				  }
				  var pixels = (s.speed / 600) * k600KnotPixels;
                  if (currentProblem == '3-6' && sLeft < oal.left && s.top < oal.top+5 && s.id == "red" && is_safari && !is_chrome)
                      ;//pixels -= .04;
				  var center = calcFromEndPoint(startRoutePointWithOffset, endRoutePointWithOffset, pixels);
				  
				  
				  s.left += center.left;
				  s.top += center.top;
				  
				  var newEndPoint = {
				  left: s.left,
				  top: s.top
				  }
				  s.centerX = s.left + div2;
				  s.centerY = s.top + div2;
				  
				  if (!flip && Math.abs(s.centerY - median) < 2 && Math.abs(s.centerX - mod.left) > 0) {
					  s.centerX = mod.left;
					  s.top -= (s.centerY - median);
				  }
				  
				  $(tag).css({
							 'position': 'absolute',
							 'left': s.left,
							 'top': s.top
							 });
 				  var topDiff = Math.abs(tTop - sTop);
				  var leftDiff = Math.abs(tLeft - sLeft);
				  sLeft = parseInt($(tag).css('left'));
				  sTop = parseInt($(tag).css('top'));
 				  s.tagCenterX += center.left;
				  s.tagCenterY +=  center.top;
				  if (is_safari && !is_chrome) {
						  s.tagCenterX += Math.abs((s.tagCenterX - s.left)) - leftDiff;
						  s.tagCenterY += Math.abs((s.tagCenterY - s.top)) - topDiff;
 				  }
                 
                  s.tagCenterX = Math.abs(s.left-tLeft) < 40 ? s.tagCenterX-center.left : s.tagCenterX;
                  s.tagCenterY = Math.abs(s.top-tTop) < 30 ? s.tagCenterY-center.top : s.tagCenterY;
				  $(tagId).css({
							   'position': 'absolute',
							   'left': s.tagCenterX ,
							   'top': s.tagCenterY
							   });
				  
				  drawConnector(s);
				  
                  // plane, etc. has been touched and needs to display its route
				  if (s.showingRoute && !$("#anchor1").is('.ui-draggable-dragging') && !$("#anchor2").is('.ui-draggable-dragging')) {
					  showRoute(s.route, 2, s.color, newEndPoint, true);
				  }
				  
                  // if in review, grab the stored next tracked item and use it to display the stage objects
				  if (isInReview) {
					  setTrackingItem();
				  } else {
					  
					  if (currentSpeed == 1000) {
						  
						  var seed = 0;
						  if (cloud1Route > 0) {
							  seed = Math.floor((Math.random() * 20) + 1);
							  var pos = $('#cloud1').position();
							  $('#lightning1').css({
												   left: pos.left + (seed) * 2
												   });
							  
							  if (seed == 2) {
								  $("#lightning1").attr("src", "images/lightning11.png");
								  fadeForLightning(1, seed);
							  } else if (seed == 9) {
								  $("#lightning1").attr("src", "images/lightning12.png");
								  fadeForLightning(1, seed);
							  } else if (seed == 10) {
								  $("#lightning1").attr("src", "images/graylightning1.png");
								  fadeForLightning(1, seed);
							  }
							  
						  }
						  if (cloud2Route > 0 && seed != 2 && seed != 9) {
							  seed = Math.floor((Math.random() * 22) + 1);
							  var pos = $('#cloud2').position();
							  $('#lightning2').css({
												   'z-index': 1,
												   left: pos.left + seed * 2
												   });
							  if (seed == 5) {
								  $("#lightning2").attr("src", "images/lightning11.png");
								  fadeForLightning(2, seed);
							  } else if (seed == 8) {
								  $("#lightning2").attr("src", "images/lightning12.png");
								  fadeForLightning(2, seed);
							  } else if (seed == 10) {
								  $("#lightning2").attr("src", "images/graylightning1.png");
								  fadeForLightning(2, seed);
							  }
							  
						  }
						  
					  }
				  }
				  
				  
			  }
              // check for collisions and display results if necessary
              collisionDetected(s.color);
		  }
	  }
  };

  // setup animation for lightning effects
  function fadeForLightning(which, seed) {
	  var nameIt = "#lightning" + which;
	  $(nameIt).fadeIn(seed * 10, function() {
					   
					   $(nameIt).fadeOut(seed * 5, function() {
										 if (seed == 10) fadeForLightning1(which, seed);
										 
										 });
					   
					   });
	  
  }
  
  // setup alternate animation for lightning effects
  function fadeForLightning1(which, seed) {
	  var nameIt = "#lightning" + which;
	  $(nameIt).fadeIn(seed * 20, function() {
					   $(nameIt).fadeOut(seed * 5);
					   });
	  
  }

  // check planes for target positioning.  Returns true if first plane past MOD is on last target in stage (left most target that is showing or part of this problem)
  function firstPlaneIsOnLastTarget() {
	  var target = "#target" + planes.length;
	  var targetpos = $(target).position();
	  for (var i = 0; i < planes.length; i++) {
		  var plane = planes[i];
		  var pid = "#" + plane.id;
		  var planepos = $(pid).position();
		  if (planepos.left + 20 < targetpos.left + 10) {
			  return true;
		  }
	  }
	  
	  return false;
  }

    // Calc miles from starting point to ending point so that initial positioning of planes can be determined
  function calculateMiles(startPoint, endPoint) {
	  var x1 = startPoint.left;
	  var y1 = startPoint.top;
	  var x2 = endPoint.left;
	  var y2 = endPoint.top;
	  var dx = x2 - x1;
	  var dy = y2 - y1;
	  var distance = Math.sqrt(dx * dx + dy * dy);
	  var velocityx = dx / distance;
	  var velocityy = dy / distance;
	  var center = {
	  dx:dx,
	  dy:dy,
	  velocityx: velocityx,
	  velocityy: velocityy,
	  distance: distance
	  };
	  return center;
  }
  
  // Calc positioning from starting point to ending point so that initial positioning of planes can be determined
  function calculatePositioning(startPoint, endPoint, pixelsToUse) {
	  var x1 = startPoint.left;
	  var y1 = startPoint.top;
	  var x2 = endPoint.left;
	  var y2 = endPoint.top;
	  var dx = x2 - x1;
	  var dy = y2 - y1;
	  var distance = Math.sqrt(dx * dx + dy * dy);
	  var velocityx = dx / distance * pixelsToUse;
	  var velocityy = dy / distance * pixelsToUse;
	  var left = startPoint.left + velocityx;
	  var top = startPoint.top + velocityy;
	  var center = {
	  left: left,
	  top: top,
	  velocityx: velocityx,
	  velocityy: velocityy,
	  distance: distance
	  };
	  return center;
  }

  // Calc positioning of plane from end point given, esp. for special circumstances
  function calcFromEndPoint(startPoint, endPoint, pixelsToUse) {
	  calcCenter = calculatePositioning(startPoint, endPoint, pixelsToUse);
	  var center = {
	  left: calcCenter.velocityx,
	  top: calcCenter.velocityy
	  }
	  return center;
  }
  
  // Default Calc positioning of plane from start point given
  function calcStartingPosition(startPoint, endPoint, pixelsToUse) {
	  calcCenter = calculatePositioning(startPoint, endPoint, pixelsToUse);
	  center = {
	  left: calcCenter.left - div2,
	  top: calcCenter.top - div2
	  }
	  return center;
  }
  
// Default Calc alternate positioning of plane from start point given, used for different staging (Not in use)
  function calcFromEndPoint1(startPoint, endPoint, miles, pixels) {
	  var x1 = startPoint.left;
	  var y1 = startPoint.top;
	  var x2 = endPoint.left;
	  var y2 = endPoint.top;
	  var dx = x2 - x1;
	  var dy = y2 - y1;
	  var distance = Math.sqrt(dx * dx + dy * dy);
	  var pixelsToUse = (initialMilesPixels) * miles;
	  var div2tmp = div2;
	  if (pixels > 0) {
		  pixelsToUse = pixels;
		  div2tmp = 0;
	  }
	  var velocityx = dx / distance * pixelsToUse;
	  var velocityy = dy / distance * pixelsToUse;
	  var left = startPoint.left + velocityx;
	  var top = startPoint.top + velocityy;
	  var center = {
	  left: left - div2tmp,
	  top: top - div2tmp
	  }
	  if (pixels > 0) {
		  center = {
		  left: velocityx,
		  top: velocityy
		  }
	  }
	  
	  return center;
  }

    // draw out connector or line from plane to data tag
  function drawConnector(thePlane) {
	  var prefix = "";
	  var planeTag = "#" + prefix + thePlane.tagName;
	  var dataTag = "#" + prefix + thePlane.tagName + "tag";
	  var planePos = $(planeTag).position();
	  var dataPos = $(dataTag).position();
	  if (dataPos) {
		  thePlane.tagCenterX = dataPos.left;
		  thePlane.tagCenterY = dataPos.top;
		  var lineTag = "#" + prefix + thePlane.color + "line";
		  
		  $('div').each(function() {
						if ($(this).attr('id') == lineTag) {
						$(this).remove();
						}
						});
		  var lineColor = thePlane.color == 'limegreen' ? 'limegreen' : thePlane.color == 'magenta' ? 'magenta' : thePlane.color;
		  $("#connector").line(planePos.left + 20, planePos.top + 20, dataPos.left + 20, dataPos.top + 20, {
							   color: lineColor,
							   stroke: 2,
							   zindex: -1,
							   id: lineTag,
							   className: 'lineTag'
							   });
	  }
  }

    // position anchor on route in drop zone after drop
  function setAnchorOnRoute(theRoute) {
	  var tmpRoute;
	  var offset = 0;
	  var intRoute = parseInt(theRoute);
	  switch (intRoute) {
		  case 1:
			  tmpRoute = route1;
			  var pos = $('#anchorDropZone1').position();
			  $('#anchor1').css({
								'position': 'absolute',
								'left': pos.left+offset,
								'top': pos.top+offset
								});
			  break;
		  case 2:
			 tmpRoute = route2;
			  var pos = $('#anchorDropZone2').position();
			  $('#anchor1').css({
								'position': 'absolute',
								'left': pos.left+offset,
								'top': pos.top+offset
								});
			  break;
		  case 3:
			  tmpRoute = route3;
			  break;
		  case 4:
			  tmpRoute = route4;
			  break;
		  case 5:
			  tmpRoute = route5;
			  var pos = $('#anchorDropZone2').position();
			  $('#anchor2').css({
								'position': 'absolute',
								'left': pos.left+offset,
								'top': pos.top+offset
								});
			  break;
		  case 6:
			  tmpRoute = route6;
			  var pos = $('#anchorDropZone3').position();
			  $('#anchor2').css({
								'position': 'absolute',
								'left': pos.left+offset,
								'top': pos.top+offset
								});
			  break;
	  }
	  return tmpRoute;
  
  }

    // calc positioning and place plane
  function placePlane(thePlane, miles, prefix, distance, position) {
	  if (!prefix) prefix = "";
	  var offset = thePlane.routeNum > 4 ? 17.3 : initialMilesPixels;
	  var startPoint = thePlane.route.point3;
	  var endPoint = thePlane.route.point2;
	  var extraMiles = 0;
	  if (position) {
		  setAnchorOnRoute(thePlane.routeNum);
		  if (position.left < thePlane.route.point1.left) {
			  startPoint = thePlane.route.point1;
			  endPoint = thePlane.route.point0;
			  thePlane.canChangeRoute = false;
		  } else if (position.left < thePlane.route.point2.left) {
			  startPoint = thePlane.route.point2;
			  endPoint = thePlane.route.point1;
			  thePlane.canChangeRoute = false;
		  } else {
			  thePlane.canChangeRoute = true;
		  }
	  }
	  
	  var center = calcStartingPosition(startPoint, endPoint, (offset * miles));
	  thePlane.left = center.left;
	  thePlane.top = center.top;
	  thePlane.centerX = center.left + 20;
	  thePlane.centerY = center.top + 20;
	  var tag = "#" + thePlane.tagName;
	  $(tag).css({
				 position: 'absolute',
				 width: '40px',
				 height: '40px',
				 'z-index': 2,
				 top: center.top,
				 left: center.left,
				 visibility: 'visible'
				 });
	  
      // if there is a prefix, then there should be no additional placement (ie., Create mode)
	  if (!prefix) {
		  var tag1 = "#" + thePlane.tagName + "tag";
		  $(tag1).css({
					  position: 'absolute',
					  'z-index': 2,
					  top: center.top - 50,
					  left: center.left - 70,
					  visibility: 'visible'
					  });
		  
		  drawConnector(thePlane);
		  var lineTag = "#" + thePlane.color + "line";
		  $(tag1).draggable({
							containment: '#connector',
                            delay: 300,
                			drag: function(event, ui) {
							drawConnector(thePlane);
							},
							stop: function(event, ui) {
							drawConnector(thePlane);
							}
							});
		  $(tag1).unbind("click").click(function() {
						if ($(this).is('.ui-draggable-dragging')) {
                            return;
						}
						var id = $(this).attr("id");
						id = id.replace("tag", "");
						var tagId = "#" + id;
						var start = {
						left: $(tagId).css('left'),
						top: $(tagId).css('top')
						}
                        currentPlane = thePlane;
 						showMenu(id, start);
						});
	  }
  
  }

    // calc intersection of point on rectangle
  function pointRectangleIntersection(p, r) {
	  var x1 = Math.min(r.x1, r.x2);
	  var x2 = Math.max(r.x1, r.x2);
	  var y1 = Math.min(r.y1, r.y2);
	  var y2 = Math.max(r.y1, r.y2);
	  return p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2;
  }

    // determine path for plane selected to determine if path should be displayed in create mode (drag over)
  function pathForPlane(point1, thePlane) {
	  var point = {
		  x: point1.left + 20,
		  y: point1.top + 20
	  }
	  if (thePlane) {
		  var planeRoute = thePlane.route;
		  if (point.x > planeRoute.point2.x) {
			  return thePlane.routeNum;
		  }
	  }
	  var rect = 0;
	  var retVal = 0;
	  if (pointRectangleIntersection(point, {
									 x1: 549,
									 x2: 555,
									 y1: 108,
									 y2: 125
									 })) retVal = 2;
	  if (pointRectangleIntersection(point, {
									 x1: 545,
									 x2: 548,
									 y1: 110,
									 y2: 121
									 })) retVal = 2;
	  if (pointRectangleIntersection(point, {
									 x1: 835,
									 x2: 870,
									 y1: 60,
									 y2: 70
									 })) retVal = 2;
	  if (pointRectangleIntersection(point, {
									 x1: 263,
									 x2: 480,
									 y1: 240,
									 y2: 250
									 })) retVal = 2;
	  if (pointRectangleIntersection(point, {
									 x1: 560,
									 x2: 650,
									 y1: 240,
									 y2: 250
									 })) retVal = 3;
	  if (pointRectangleIntersection(point, {
									 x1: 895,
									 x2: 910,
									 y1: 100,
									 y2: 90
									 })) retVal = 3;
	  if (pointRectangleIntersection(point, {
									 x1: 650,
									 x2: 905,
									 y1: 240,
									 y2: 250
									 })) retVal = 4;
	  if (pointRectangleIntersection(point, {
									 x1: 532,
									 x2: 500,
									 y1: 83,
									 y2: 93
									 }) || pointRectangleIntersection(point, {
																	  x1: 522,
																	  x2: 450,
																	  y1: 93,
																	  y2: 115
																	  }) || pointRectangleIntersection(point, {
																									   x1: 460,
																									   x2: 560,
																									   y1: 120,
																									   y2: 80
																									   }) || pointRectangleIntersection(point, {
																																		x1: 500,
																																		x2: 450,
																																		y1: 115,
																																		y2: 140
																																		})) retVal = 1;
	  if (pointRectangleIntersection(point, {
									 x1: 475,
									 x2: 495,
									 y1: 110,
									 y2: 93
									 })) retVal = 1;
	  
	  if (pointRectangleIntersection(point, rectangle2a)) rect = 1;
	  else if (pointRectangleIntersection(point, rectangle2b)) {
		  if (point.x > 475 && point.x < 511 && point.y < 130 && point.y > 93) retVal = 1;
		  else retVal = 2;
	  } else if (pointRectangleIntersection(point, rectangle2c)) retVal = 2;
	  else if (pointRectangleIntersection(point, rectangle1a)) {
		  retVal = 1;
	  } else if (pointRectangleIntersection(point, rectangle1b)) retVal = 1;
	  else if (pointRectangleIntersection(point, rectangle1c)) retVal = 1;
	  else if (pointRectangleIntersection(point, rectangle3a)) retVal = 3;
	  else if (pointRectangleIntersection(point, rectangle3b)) retVal = 3;
	  else if (pointRectangleIntersection(point, rectangle3c)) retVal = 3;
	  else if (pointRectangleIntersection(point, rectangle4a)) retVal = 4;
	  else if (pointRectangleIntersection(point, rectangle4b)) retVal = 4;
	  else if (pointRectangleIntersection(point, rectangle4c)) retVal = 4;
	  else if (pointRectangleIntersection(point, rectangle5a)) retVal = 5;
	  else if (pointRectangleIntersection(point, rectangle5b)) {
      if (point.x > 469 && point.x < 551 && point.y < 490 && point.y > 350) retVal = 6;
	  else rect = 5;
      if (point.x > 534 && point.x < 545 && point.y > 330 && point.y < 345) retVal = 5;
      if (point.x > 544 && point.x < 552 && point.y > 345 && point.y < 375) retVal = 5;
      if (point.x > 539 && point.x < 546 && point.y > 345 && point.y < 365) retVal = 5;
		  
	  } else if (pointRectangleIntersection(point, rectangle5c)) retVal = 5;
	  else if (pointRectangleIntersection(point, rectangle6a)) retVal = 6;
	  else if (pointRectangleIntersection(point, rectangle6b)) retVal = 6;
	  else if (pointRectangleIntersection(point, rectangle6c)) retVal = 6;
	  
	  return retVal;
	  
  }

    // create rect for calculating intersection
  function genRect(route, section) {
	  var ffOffset = 10;
	  if (section == 0) return {
	  x1: route.point0.left,
	  x2: route.point1.left,
	  y1: route.point0.top - ffOffset,
	  y2: route.point1.top + ffOffset
	  };
	  else if (section == 1) return {
	  x1: route.point1.left,
	  x2: route.point2.left,
	  y1: route.point1.top - ffOffset,
	  y2: route.point2.top + ffOffset
	  };
	  else return {
	  x1: route.point2.left,
	  x2: route.point3.left,
	  y1: route.point2.top + ffOffset,
	  y2: route.point3.top - ffOffset
	  };
  }

    // check whether route already contains a plane when dragging, etc.
  function checkRouteForPlane(routeNum) {
	  for (var i = 0; i < planes.length; i++) {
		  var p = planes[i];
		  if (p.routeNum == routeNum) return true;
	  }
	  return false;
  }
  
// check whether route already contains a cloud when dragging, etc.
  function checkRouteForCloud(routeNum) {
	  cloud1Route = $("#cloud1").data("route") != 0 ? $("#cloud1").data("route") : cloud1Route;
	  cloud2Route = $("#cloud2").data("route") != 0 ? $("#cloud2").data("route") : cloud2Route;
	  return (routeNum == cloud1Route || routeNum == cloud2Route) && routeNum != 0;
  }

    // additional helper for checking drag over of plane/cloud on route in Create mode
  function isOnLine(initial_x, initial_y, endx, endy, pointx, pointy, tolerate) {
	  var slopex = Math.abs(initial_x - endx);
	  var slopey = Math.abs(initial_y - endy);
	  
	  var x1 = endx - slopex - tolerate;
	  var x2 = endx + slopex + tolerate;
  
  }
  
    // additional helper for checking drag over of plane/cloud on route in Create mode
  function isPointOnLine(x,y,x1,y1, px,py)
  {
	  var EPSILON = 0.001;
	  var a = (y1 - y) / (x1 - x);
	  var b = y - a * x;
	  if ( Math.abs(py - (a*px+b)) < EPSILON)
	  {
		  return true;
	  }
	  
	  return false;
  }

    // display route in Create mode if hover is true for that path
  function showRouteForHover(tag, route) {
	  var center = $(tag).position();
	  var px = center.left-div2;
	  var py = center.top-div2;
	  var routeNum = route.routeNum;
	  var colortouse = routeNum == 1 ? "white" : routeNum == 2 ? "red" : routeNum == 3 ? "limegreen" : routeNum == 4 ? "blue" : routeNum == 5 ? "yellow" : "magenta"  ;
	  showRoute(route, 4, colortouse, false, false, 'ccroute');
  }
  
   // place planes when in Create mode
  function placePlaneForCreateMode(thePlane, location) {
	  var center = location;
	  var tag = "#" + thePlane.color;
	  $(tag).css({
				 position: 'absolute',
				 width: '40px',
				 height: '40px',
				 'z-index': 2,
				 top: center.top,
				 left: center.left,
				 visibility: 'visible'
				 });
	  
	  var tag1 = "#" + thePlane.color + "tag";
	  $(tag1).css({
				  position: 'absolute',
				  'z-index': 2,
				  top: center.top + 40,
				  left: center.left - 15,
				  visibility: 'visible'
				  });
	  
	  drawConnector(thePlane);
	  $(tag).draggable({
		  cursorAt: {left: 20, top: 45},
					   drag: function(event, ui) {
 					   canHoverOverRoute = true;
					   var center = $(tag).position();
					   
 						$(tag1).css({
								   position: 'absolute',
								   'z-index': 2,
								   top: center.top - 40,
								   left: center.left - 20,
								   visibility: 'visible'
								   });
					   
					   var routeNum = 0;
					   var route = route0;
	
					   if (!thePlane.route)
						  thePlane.route = route0;
					   routeNum = 0;
					   var px = center.left-div2;
					   var py = center.top-div2;
					   
					   if (checkRouteForCloud(routeNum)) {
                            return;
                            routeNum = routeNum == 1 ? routeNum = 2 : routeNum == 2 ? routeNum = 1 : routeNum == 5 ? routeNum = 6 : routeNum = 5;
					   }
					   drawConnector(thePlane);
					 },
				   stop: function(event, ui) {
					   canHoverOverRoute = false;
                       var tag = "#" + thePlane.color;
                       var center = {left: currentMouseX, top: currentMouseY};
					   var parentOffset = $(this).parent().offset();
					   parentOffset.left = 0;
					   parentOffset.top = 0;
					   var x = event.pageX - parentOffset.left - div2;
					   var y = event.pageY - parentOffset.top - div2;
					   center = {left: event.pageX, top: event.pageY};
				   
					   if (checkRouteForCloud(routeNum))
						  hoverRouteNum = 0;
					   if (hoverRouteNum == 0) {
                           hideAllRoutes();
						   var storeCenter = thePlane.startingPos;
						   thePlane.route = route0;
                           thePlane.routeNum = 0;
                           thePlane.left = storeCenter.left;
                           thePlane.top = storeCenter.top;
 						   $(tag).css({
									  position: 'absolute',
									  width: '40px',
									  height: '40px',
									  'z-index': 2,
									  top: storeCenter.top,
									  left: storeCenter.left,
									  visibility: 'visible'
									  });
					   
						   $(tag1).css({
									   position: 'absolute',
									   'z-index': 2,
									   top: storeCenter.top + 40,
									   left: storeCenter.left - 15,
									   visibility: 'visible'
									   });
						   
						   drawConnector(thePlane);
						   var removeP = getCurrentPlane(thePlane.color);
						   if (removeP) {
                            planes = $.grep(planes, function(value) {
                                        return value != removeP;
                                        });
                       }
                       
                       if (planes.length > 1) {
                            $("#createCreateButton").css({
                                                    'opacity': 1
                                                    });
					   } else {
                            $("#createCreateButton").css({
                                                    'opacity': .6
                                                    });
					   }
                      
						   
						   
						   return;
					   }
                       thePlane.canShowRoute = true;
					   var route = route0;
					   if (hoverRouteNum > 0) {
						  route = hoverRouteNum == 1 ? route1 : hoverRouteNum == 2 ? route2 : hoverRouteNum == 3 ? route3 : hoverRouteNum == 4 ? route4 : hoverRouteNum == 5 ? route5 : route6;
					   }
					   
					   thePlane.route = route;
					   thePlane.routeNum = hoverRouteNum;
					   var endPoint1;
					   var endPointType;
					   var extraMiles = 0;
					   if (center.left < route.point1.left) {
                           extraMiles = route.segment1miles + route.segment2miles;
                           endPoint1 = route.point1;
                           endPointType = 1;
					   } else if (center.left < route.point2.left) {
                           extraMiles = route.segment1miles;
                           endPoint1 = route.point2;
                           endPointType = 2;
					   } else {
                            endPoint1 = route.point3;
                            endPointType = 3;
                            if (center.top > 425 && center.top < 435 && center.left > 560 && center.left < 575)
                                endPointType = 2;
                       
					   }
                       thePlane.routeSegment = endPointType;
					   var pos = calculatePositioning(endPoint1, center, k600KnotPixels);
					   var pMiles = hoverRouteNum == 2 && endPointType == 2 ? initialMilesPixels+4  : initialMilesPixels;
  					   var distance = pos.distance / pMiles;
					   var roundDistance = distance;
					   var adjuster = 0;
					   hoverRoute == 0;
					   var storedPlane = getCurrentPlane(thePlane.color);
					   if (!storedPlane) {
                           var removeP = getCurrentPlane(thePlane.color);
                           if (removeP) {
                           cplanes = $.grep(cplanes, function(value) {
                                            return value != removeP;
                                            });
                           }
                           planes.push(thePlane);
                       }
                       storedPlane = thePlane;
                       storedPlane.route = route;
                       storedPlane.routeNum = hoverRouteNum;
                       
					   var dist;
					   var milesOffset = 0;
                       var miles = hoverRouteNum == 4 ? Math.floor(roundDistance):Math.floor((roundDistance + adjuster));
                       var tmpCenter = center;
                       
					   if (hoverRouteNum == 1) {
                            if (endPointType == 2) {
                               if (center.top < 165)
                                miles-=2;
                               else
                                miles--;
                            }
                            if (center.left > 270 && center.left < 280)
                                miles=19;
                            if (center.left > 535 && center.left < 545)
                                miles=2;
                            if (center.left > 825 && center.left < 840)
                                miles=2;
                            if (center.left > 839)
                                miles=1;
                       }
                       else if (hoverRouteNum == 2) {
                            if (endPointType == 3 && center.top > 160 && center.top < 180 ) {
                                storedPlane.route = route2;
                                storedPlane.routeNum = 2;
                                miles = 1;
                                tmpCenter = {left:center.left-5,top:center.top};
                            }
                            else if (endPointType == 2) {
                                if (miles <7 && miles!=6)
                                    miles--;
                                if (center.top < 225 && center.top > 215)
                                    miles=5;
                               if (center.left < 545 && center.left > 535)
                                    miles=2;
                            }
                            else if (miles > 3)
                                miles++;
                       
					   }
                       else if (hoverRouteNum == 3) {
                            miles--;
                            if (center.left > 890)
                                miles=1;
                       }
                       else if (hoverRouteNum == 4) {
                           if (center.left > 270 && center.left < 280)
                                miles=12;
                           if (center.left > 445)
                                miles--;
                           if (center.left > 465)
                                miles--;
                            if (center.left > 478 && center.left < 590)
                                miles+=2;
                            if (center.left > 477 && center.left < 490)
                                miles=10;
                           if (center.left > 461 && center.left < 470)
                                miles=1;
                           if (center.left > 590 && center.left < 600)
                                miles=4;
                           if (center.left > 600 && center.left < 615)
                                miles=3;
                           if (center.left > 620 && center.left < 630)
                                miles=2;
                           if (center.left > 635 && center.left < 645)
                                miles=1;
                           if (center.left > 650 )
                                miles+=3;
                           if (center.left > 758)
                                miles--;
                           if (center.left > 758 && center.left < 765)
                                miles=8;
                       
                           if (center.left > 860 && center.left < 870)
                                miles=2;
                           if (center.left > 870)
                                miles=1;

                       
                       }
                       else if (hoverRouteNum == 5) {
                            if (endPointType == 2) {
                                if (center.top < 400)
                                    miles+=3;
                                if (center.top > 400 && center.top < 410)
                                    miles+=2;
                                if (center.top > 410 && center.top < 425)
                                    miles++;
                                if (center.top > 425)
                                    miles-=2;
                                if (center.left > 564 && center.top > 425 && endPointType == 2)
                                    miles = 17;
                                else if (center.top > 425 && center.top < 435 && center.left > 560 && center.left < 575)
                                    miles = 1;
                                else if (center.top > 435 && center.top < 445) {
                                   miles++;
                                }
                       }
                       }
                       else if (hoverRouteNum == 6) {
                            if (endPointType == 3 && center.left < 760)
                                miles++;
                            if (endPointType == 2 && center.left < 520)
                                miles+=2;
                           if (center.top > 407 && center.top < 420)
                                miles--;
                           if (center.top > 435 && center.top < 442)
                                    miles--;
                           if (center.left > 522 && center.left < 530)
                                miles = 3;
                            if (center.left > 822)
                                miles=2;
                            if (center.left > 840)
                                miles=1;
                       }
                       if (center.left < 260) {
                           storedPlane.route = route4;
                           storedPlane.routeNum = 4;
                           miles = 12;
                       }
 
                       placePlane(storedPlane, miles, "c", null, tmpCenter);
                       storedPlane.canShowRoute = true;
                       
                       if (hoverRouteNum == 4 && is_safari && !is_chrome && pos.left < tph.left) {
                            var tag = '#'+storedPlane.id;
                            $(tag).css({'left': $(tag).position().left+2});
                        }
						drawConnector(storedPlane);
					   
					   hideAllRoutes();
					   
                      if (planes.length > 1) {
                            $("#createCreateButton").css({
                                                    'opacity': 1
                                                    });
					   } else {
                            $("#createCreateButton").css({
                                                    'opacity': .6
                                                    });
					   }

					  }
				  });
	    
	  var lineTag = "#" + thePlane.color + "line";
	  $(tag1).draggable({
						containment: '#connector',
                        delay: 300,
                    	drag: function(event, ui) {
						drawConnector(thePlane);
						},
						stop: function(event, ui) {
						drawConnector(thePlane);
						}
						});
	  
	  $(tag).unbind("click").click(function() {
								   var id = $(this).attr("id");
								   
								   var start = {
								   left: $(this).css('left'),
								   top: $(this).css('top')
								   }
								   canHoverOverRoute = false;
                                   currentPlane = thePlane;
 								   showMenu(id, start);
								   })
	  $(tag1).unbind("click").click(function() {
									var id = $(this).attr("id");
									id = id.replace("tag", "");
									var tagId = "#" + id;
									var start = {
									left: $(tagId).css('left'),
									top: $(tagId).css('top')
									}
									canHoverOverRoute = false;
                                    currentPlane = thePlane;
 									showMenu(id, start);
									})
	  
	  
  }

    // place all planes when first displaying Create mode
  function placePlanesForCreateMode() {
	  for (var i = 0; i < planes.length; i++) {
		  var thePlane = planes[i];
          thePlane.canChangeRoute = true;
          thePlane.canShowRoute = true;
		  var tag = "#" + thePlane.id;
          if (!isInSolve) {
              thePlane.speed = thePlane.orgSpeed;
          }
          thePlane.route = thePlane.orgRoute;
          thePlane.routeNum = thePlane.orgRouteNum;

		  thePlane.left = thePlane.orgPos.left;
		  thePlane.top = thePlane.orgPos.top;
		  $(tag).css({
					 left: thePlane.orgPos.left,
					 top: thePlane.orgPos.top
					 });
		  var center = $(tag).position();
		  var tag1 = "#" + thePlane.color + "tag";
		  $(tag1).css({
					  position: 'absolute',
					  'z-index': 2,
					  top: center.top + 40,
					  left: center.left - 15,
					  visibility: 'visible',
					  'background-color': 'black',
					  'color': thePlane.color
					  });
		  $(tag1 + ' #speedSpan').css({'color':thePlane.color});
 		  $(tag1 + ' #speedSpan').html(thePlane.speed + " kts");
 		  drawConnector(thePlane);
          
	  }
	  var cloud1Pos = $("#cloud1").data().origPosition;
	  var cloud2Pos = $("#cloud2").data().origPosition;
	  $("#cloud1").css({
					   'left': cloud1Pos.left,
					   'top': cloud1Pos.top
					   });
	  $("#cloud2").css({
					   'left': cloud2Pos.left,
					   'top': cloud2Pos.top
					   });

	  $(".collisionError").hide();
	  $(".spacingError").hide();
  }
  
    // build DOM or object for plane
  function createPlaneDOM(thePlane) {
	  var newPlane = '';
	  var backingColor = thePlane.color == 'limegreen' ? 'limegreen' : thePlane.color == 'magenta' ? 'magenta' : thePlane.color;
	  newPlane += '<img id="' + thePlane.color + '" class="plane" src="' + thePlane.imgSrc + '"/>';
	  newPlane += '<div class="dataTag" id="' + thePlane.color + 'tag" style="background-color:black;color:' + backingColor + ';border-color:' + backingColor + ';">' + thePlane.dataTag;
	  newPlane += '<br /><span id="speedSpan">' + thePlane.speed + ' kts</span>';
	  
	  newPlane += '</div>';
	  $("#content").append(newPlane);
	  var tag = "#" + thePlane.tagName;
	  $(tag).unbind("click").click(function() {
								   var id = $(this).attr("id");
								   var start = {
								   left: $(this).css('left'),
								   top: $(this).css('top')
								   }
                                   currentPlane = thePlane;
 								   showMenu(id, start);
								   })
	  
  }
  
    // build plane object for problem
  function createPlane(type) {
	  var aPlane = {
	  color: 'red',
	  route: route5,
	  routeNum: 5,
	  imgSrc: '',
	  tagName: '',
	  speed: 600,
	  canShowRoute: true,
	  showingRoute: false,
	  canChangeRoute: true,
	  id: 'red',
	  distance: 0.0,
	  left: 0.0,
	  top: 0.0,
	  width: 40,
	  height: 40,
	  centerX: 0.0,
	  centerY: 0.0,
	  tagCenterX: 0.0,
	  tagCenterY: 0.0,
	  dataTag: '',
	  finalOrder: -1,
	  target: 0,
	  colliding: false
	  };
	  aPlane.color = type;
	  aPlane.id = type;
	  aPlane.tagName = type;
	  aPlane.imgSrc = 'images/' + type + 'plane.png';
	  createPlaneDOM(aPlane);
	  return aPlane;
  }
  
    // build plane object for Create mode
  function createPlaneForCreateMode(type) {
	  var aPlane = {
	  color: 'red',
	  route: route5,
	  routeNum: 5,
	  imgSrc: '',
	  tagName: '',
	  speed: 600,
	  canShowRoute: true,
	  showingRoute: false,
	  canChangeRoute: true,
	  id: 'red',
	  distance: 0.0,
	  left: 0.0,
	  top: 0.0,
	  width: 40,
	  height: 40,
	  centerX: 0.0,
	  centerY: 0.0,
	  tagCenterX: 0.0,
	  tagCenterY: 0.0,
	  dataTag: '',
	  finalOrder: -1,
	  target: 0,
	  colliding: false
	  };
	  aPlane.dataTag = type == 'cyan' ? "AAL12" : type == 'yellow' ? "SWA23" : type == 'limegreen' ? "DAL88" : type == 'red' ? "UAL74" : "VRD36";
	  if (type == "AAL12") theColor = 'cyan';
	  else if (callSign == "SWA23") theColor = 'yellow';
	  else if (callSign == "DAL88") theColor = 'limegreen';
	  else if (callSign == "UAL74") theColor = 'red';
	  
	  aPlane.color = type;
	  aPlane.id = "c" + type;
	  aPlane.tagName = "c" + type;
	  aPlane.imgSrc = 'images/' + type + 'plane.png';
	  var newPlane = '';
	  newPlane += '<img id="c' + type + '" class="plane" src="' + aPlane.imgSrc + '"/>';
	  newPlane += '<div class="dataTag" id="c' + type + 'tag" style="background-color:black;color:' + type + ';border-color:' + type + ';">' + aPlane.dataTag;
	  newPlane += '</div>';
	  $("#createContent").append(newPlane);
	  var tag = "#" + aPlane.tagName;
	  $(tag).unbind("click").click(function() {
								   var id = $(this).attr("id");
								   var start = {
								   left: $(this).css('left'),
								   top: $(this).css('top')
								   }
                                   currentPlane = thePlane;
                                   showMenu(id, start);
								   })
	  
	  return aPlane;
  }

    // Grab currently selected plane object and return it
  function getCurrentPlane(color, arr) {
	  var s;
	  var a = arr ? arr : planes;
	  var result = $.grep(a, function(e) {
						  return e.color == color;
						  });
	  if (result.length > 0) s = result[0];
	  return s;
  }
  
  function getCurrentPlaneForCreateMode(color) {
	  var s;
	  var result = $.grep(cplanes, function(e) {
						  return e.color == color;
						  });
	  if (result.length > 0) s = result[0];
	  return s;
  }
  
  function animateButtonPress(button) {
      //Still need implementation?
  }

    // play current problem from Play button
  function play() {
	  if (hasEnded || isInCreate) return;
	  animateButtonPress("#playButton");
	  hasEnded = false;
	  if (isPaused) {
		  $("#playButton").attr("src", "images/ssapp_pause_icon.png");
		  flip = false;
		  intervalID = setInterval(movePlane, currentSpeed);
	  } else {
		  $("#playButton").attr("src", "images/ssapp_play_icon2.png");
		  clearInterval(intervalID);
	  }
	  isPaused = !isPaused;
	  isInPlay = true;
	  
  }
  
    // pause current problem from Pause button
  function pause() {
	  isPaused = true;
	  $("#playButton").attr("src", "images/ssapp_play_icon2.png");
	  clearInterval(intervalID);
  }
  
    // reload current problem from Reload button. Clears all previous values, objects, etc.
  function reload(hideAnimation, isSelectingProblem) {
	  isInPlay = false;
  	  clearTimeout(speedChangeTimeout);

 	  $("#info").html("");
	  $("#speedTable").fadeOut();
	  if (!hideAnimation) {
		  animateButtonPress("#reloadButton");
	  }
	  hasEnded = false;
	  clearInterval(intervalID);
	  hideMenuIntervalID = 0;
	  isPaused = true;
	  if (!isInReview)
          reviewItems.length = 0;
      for (var i = 0; i < planes.length; i++) {
          var p = planes[i];
          p.colliding = false;
      }
	  if (isInSolve) {
          placePlanesForCreateMode();
		  if (isSelectingProblem) {
            $("#info").html($("#info").html()+" isSelectingProblem ");
              var tmpPlanes = planes;
              parseProblemXML(currentProblem);
              for (var i = 0; i < planes.length; i++) {
                  var p = planes[i];
                  var aPlane = getCurrentPlane(p.color, tmpPlanes);
                  if (aPlane) {
                      var tag = "#" + aPlane.color;
                      aPlane.route = p.route;
                      aPlane.routeNum = p.routeNum;
                      aPlane.id = p.color;
                      aPlane.tagName = p.color;
                      aPlane.dataTag = p.dataTag;
                      aPlane.speed = p.speed;
                      aPlane.colliding = false;
                  }
              }
              cplanes = tmpPlanes;
		  }
		  inc = 0;
		  $("#playButton").attr("src", "images/ssapp_play_icon2.png");
		  $("#changeSpeedButton").attr("src", "images/ssapp_1x.png");
		  $("#incrementalTime").text('0:00');
	  } else {
		  parseProblemXML(currentProblem);
	  }
	  currentSpeed = 1000;
	  $('#soundEffect').remove();
	  $("#embedSound").remove();
	  
  }
  
// reloads stage in Create mode. Clears all previous values, objects, etc.
  function reloadCreateMode(hideAnimation) {
      animateButtonPress("#createReloadButton");
      isInSolve = false;
      clearStage();
      planes.length = 0;
      create();
  }

    // Build out route, lines, etc.
  function buildRoute(theRoute, stroke, color, start, empty) {
	  if (empty)
		  $("#s1").empty();
	  var startTop = theRoute.point3.top;
	  var startLeft = theRoute.point3.left;
	  
	  if (start) {
		  startTop = parseInt(start.top) + div2;
		  startLeft = parseInt(start.left) + div2;
	  }
	  if (startLeft < theRoute.point1.left) {
		  $('#s1').line(startLeft, startTop, theRoute.point0.left, theRoute.point0.top, {
						color: color,
						stroke: stroke,
						zindex: 1,
						className: 'lineTag'
						});
		  return;
	  } else {
		  $('#s1').line(theRoute.point1.left, theRoute.point1.top, theRoute.point0.left, theRoute.point0.top, {
						color: color,
						stroke: stroke,
						zindex: 1,
						className: 'lineTag'
						});
	  }
	  if (startLeft < theRoute.point2.left) {
		  $('#s1').line(startLeft, startTop, theRoute.point1.left, theRoute.point1.top, {
						color: color,
						stroke: stroke,
						zindex: 1,
						className: 'lineTag'
						});
	  } else {
		  $('#s1').line(theRoute.point2.left, theRoute.point2.top, theRoute.point1.left, theRoute.point1.top, {
						color: color,
						stroke: stroke,
						zindex: 1,
						className: 'lineTag'
						});
		  $('#s1').line(startLeft, startTop, theRoute.point2.left, theRoute.point2.top, {
						color: color,
						stroke: stroke,
						zindex: 1,
						className: 'lineTag'
						});
	  }
  }

    // display route for currently selected plane.
  function showRoute(theRoute, stroke, color, start, keep) {
	  $("#s1").empty();
	  hideMenuIntervalID = 0;
	  color = color == 'magenta' ? 'magenta' : color == 'limegreen' ? 'limegreen' : color;
	  if (keep) {
		  buildRoute(theRoute, stroke, color, start);
		  $("#s1").fadeIn(10);
		  return;
	  }
	  $("#s1").fadeOut(function() {
					   buildRoute(theRoute, stroke, color, start);
					   $("#s1").fadeIn(10);
					   });
  
  }

    // show route for current cloud being dropped in Create mode.
  function showRouteForCloudDrop(theRoute, stroke, color, start, keep) {
    color = color == 'magenta' ? 'magenta' : color == 'limegreen' ? 'limegreen' : color;
    if (keep) {
        buildRoute(theRoute, stroke, color, start);
        $("#s1").fadeIn(10);
        return;
    }
    $("#s1").fadeOut(function() {
                     buildRoute(theRoute, stroke, color, start);
                     $("#s1").fadeIn(10);
                     });
    
}

    // show route for currently selected plane in Create mode.
  function showRouteForCreateMode(theRoute, stroke, color, start, keep, tag) {
	  hideMenuIntervalID = 0;
	  if (keep) {
		  buildRoute(theRoute, stroke, color, start, tag);
		  $("#createS1").fadeIn();
		  return;
	  }
	  $("#createS1").fadeOut(function() {
							 buildRouteForCreateMode(theRoute, stroke, color, start);
							 $("#createS1").fadeIn();
							 });
	  
  }
    // create route and parameters for Create mode problem.
  function buildRouteForCreateMode(theRoute, stroke, color, start, tag) {
	  $("#createS1").empty();
	  var startTop = theRoute.point3.top;
	  var startLeft = theRoute.point3.left;
	  
	  if (start) {
		  startTop = parseInt(start.top) + div2;
		  startLeft = parseInt(start.left) + div2;
	  }
	  if (startLeft < theRoute.point1.left) {
		  $('#createS1').line(startLeft, startTop, theRoute.point0.left, theRoute.point0.top, {
							  color: color,
							  stroke: stroke,
							  zindex: 1,
							  id: tag,
							  className: 'lineTag'
							  });
		  return;
	  } else {
		  $('#createS1').line(theRoute.point1.left, theRoute.point1.top, theRoute.point0.left, theRoute.point0.top, {
							  color: color,
							  stroke: stroke,
							  zindex: 1,
							  id: tag,
							  className: 'lineTag'
							  });
	  }
	  if (startLeft < theRoute.point2.left) {
		  $('#createS1').line(startLeft, startTop, theRoute.point1.left, theRoute.point1.top, {
							  color: color,
							  stroke: stroke,
							  zindex: 1,
							  id: tag,
							  className: 'lineTag'
							  });
	  } else {
		  $('#createS1').line(theRoute.point2.left, theRoute.point2.top, theRoute.point1.left, theRoute.point1.top, {
							  color: color,
							  stroke: stroke,
							  zindex: 1,
							  id: tag,
							  className: 'lineTag'
							  });
		  $('#createS1').line(startLeft, startTop, theRoute.point2.left, theRoute.point2.top, {
							  color: color,
							  stroke: stroke,
							  zindex: 1,
							  id: tag,
							  className: 'lineTag'
							  });
	  }
  }

    //hide all routes currently configured for Create mode problem.
  function hideAllRoutesForCreateMode(who) {
	  $("#createS1").fadeOut(10);
	  $("#canchor1").fadeOut();
	  $("#canchor2").fadeOut();
	  $("#cspeedTable").fadeOut(function() {
								hideMenuIntervalID = 0;
								var len = planes.length;
								for (var i = 0; i < len; ++i) {
								if (i in planes) {
								var s = planes[i];
								s.showingRoute = false;
								}
								}
								});
	  
  }
  
    //hide all routes currently configured for problem.
  function hideAllRoutes(who) {
	  $("#s1").fadeOut(10);
	  $("#anchor1").fadeOut();
	  $("#anchor2").fadeOut();
	  $("#speedTable").fadeOut(function() {
							   hideMenuIntervalID = 0;
							   var len = planes.length;
							   for (var i = 0; i < len; ++i) {
							   if (i in planes) {
							   var s = planes[i];
							   s.showingRoute = false;
							   }
							   }
							   });
	  
  }

    // hide path div
  function hidePath(path) {
	  $("#s1").css({
				   visibility: 'hidden'
				   });
  }

    // change speed of display/updates for current problem from Speed button.
  function changeSpeed() {
	  if (hasEnded || !isInPlay) return;
	  animateButtonPress("#changeSpeedButton");
	  clearInterval(intervalID);
	  if (currentSpeed == 1000) {
		  currentSpeed = 250;
		  $("#changeSpeedButton")
            .attr("src", "images/ssapp_4x.png")
            .attr("width", "90")
            .attr("height", "60")
            .css({
                width: "90px !important",
                height: "60px !important",
                "object-fit": "contain",
                "max-width": "90px",
                "max-height": "60px",
                display: "block"
            });
	  } else if (currentSpeed == 250) {
		  currentSpeed = 100;
		  $("#changeSpeedButton")
            .attr("src", "images/ssapp_10x.png")
            .css({
				width: "90px",
				height: "60px",
				"object-fit": "contain",
				display: "block"
			});
	  } else {
		  currentSpeed = 1000;
		  $("#changeSpeedButton")
            .attr("src", "images/ssapp_1x.png")
            .css({
				width: "90px",
				height: "60px",
				"object-fit": "contain",
				display: "block"
			});
	  }
	  if (!isPaused) intervalID = setInterval(movePlane, currentSpeed);
	  
  }
  
    // show menu for currently selected plane.
  function showMenu(id, start) {
	  if (isInReview) return;
	  if (currentPlane == null) {
		  currentPlane = getCurrentPlane(id);
	  }
     if (isInCreate) {
        var posit = $("#"+currentPlane.id).position();
         if (Math.floor(posit.left) == Math.floor(currentPlane.startingPos.left) && Math.floor(posit.top) == Math.floor(currentPlane.startingPos.top))
             return;
      }
	  currentPlane = getCurrentPlane(id);
	  currentRoute = currentPlane.route;
	  if (currentPlane) {
		  if (currentPlane.showingRoute == true) {
			  hideAllRoutes("showingroutetrue");
			  $("#info").html(" ");
		 } else {
			  hideAllRoutes("showingfalse");
			  currentPlane.showingRoute = true;
			  var thisId = "#" + currentPlane.id;
			  
			  $("#speedTable").fadeOut(function() {
									   $("#speedTable #menuTag").text(currentPlane.dataTag);
									   setSpeedButton(currentPlane.speed, true);
									   if (inc > totalTime / 2 || isInCreate) $("#speedTable").css({
																								   'left': 800,
																								   'border-color': currentPlane.color
																								   });
									   else $("#speedTable").css({
																 'left': 1,
																 'border-color': currentPlane.color
																 });
									   
									   $("#speedTable #menuTag").css({
																	 'color': currentPlane.color
																	 });
									   
									   $("#speedTable").fadeIn();
									   });
   
			 
			 showRoute(currentPlane.route, 2, currentPlane.color, start);
 
             setAnchorOnRoute(currentPlane.routeNum);
             var pos1 = $("#cloud1").position();
             var pos2 = $("#cloud2").position();
             cloud1Route = pos1.top == 400 ? 0 : cloud1Route;
             cloud2Route = pos2.top == 400 ? 0 : cloud2Route;
             updateCloudRoutes();
             if (currentPlane.route.point2.left < (parseInt(start.left)+div2)) {
                 if ((currentPlane.routeNum == 1 && (cloud1Route != 2 && cloud2Route != 2)) || (currentPlane.routeNum == 2 && (cloud1Route != 1 && cloud2Route != 1)))
                         $("#anchor1").fadeIn();
                     if ((currentPlane.routeNum == 5 && (cloud2Route != 6 && cloud1Route != 6)) || (currentPlane.routeNum == 6 && (cloud2Route != 5 && cloud1Route != 5)))
                          $("#anchor2").fadeIn();
             }
          }
		  clearTimeout(menuTimeout);
		  menuTimeout = setTimeout(function() {
								   hideAllRoutes("vhidemenu");
								   }, 6000);
		  
	  }
  }

    // layout and display targets for current problem.
  function placeTargets() {
	  for (var i = 0; i < planes.length; i++) {
		  var tmpFinal = 3 * i;
		  newLeft = (mod.left - 8) - (tmpFinal * (initialMilesPixels));
		  var id = "#target" + (i + 1);
		  $(id).css({
					'left': newLeft,
					'top': mod.top - 10
					});
		  $(id).fadeIn();
	  }
  }

    // clear stage not only clears out vars, but empties all DOM items.
  function clearStage() {
	  $("#s1").empty();
	  $("#connector").empty();
	  if (isInReview) $("#reviewButton").css({
											 'opacity': 1
											 });
	  else $("#reviewButton").css({
								  'opacity': .6
								  });
	  
	  $("#playButton").attr("src", "images/ssapp_play_icon2.png");
	  $("#changeSpeedButton").attr("src", "images/ssapp_1x.png");
	  $("#incrementalTime").text('0:00');
	  $("#progressbar").progressbar({
									value: 0
									});
	  $("#cloud1").hide();
	  $("#cloud2").hide();
	  cloud1Route = 0;
	  cloud2Route = 0;
      $("#cloud1").data("route",cloud1Route);
      $("#cloud2").data("route",cloud2Route);

	  didCollide = false;
	  $("#collisionText").html("Alert: planes too close!<br />Separation less than 2Nmi");
	  $(".collisionError").css({
							   'background-color': 'transparent',
							   'color': 'red',
							   'font-family': 'Roboto Mono, sans-serif' 
							   });
	  $(".collisionError").hide();
	  $(".spacingError").hide();
	  
	  $('div').each(function() {
					var theClass = $(this).attr('class');
					if (theClass == 'plane' || theClass == 'dataTag' || theClass == 'dataTag ui-draggable') {
					$(this).remove();
					}
					});
	  $('img').each(function() {
					var theClass = $(this).attr('class');
					if (theClass == 'plane') {
					$(this).remove();
					}
					});
	  $('#content').find('#red').remove();
	  $('#content').find('#yellow').remove();
	  $('#content').find('#limegreen').remove();
	  $('#content').find('#cyan').remove();
	  $('#content').find('#magenta').remove();
	  $('#content').find('#redtag').remove();
	  $('#content').find('#yellowtag').remove();
	  $('#content').find('#limegreentag').remove();
	  $('#content').find('#cyantag').remove();
	  $('#content').find('#magentatag').remove();
	  
	  $('#target1').hide();
	  $('#target2').hide();
	  $('#target3').hide();
	  $('#target4').hide();
	  $('#target5').hide();
	  
	  if (!isInSolve) planes.length = 0;
	  
	  hideAllRoutes();
  }


    // grab problem from XML file, parse it, and create currently selected problem.  Finally, display problem on stage.
  function parseProblemXML(problem) {
  
      $("#customProblemText").hide();

      isInSolve = false;
  
	  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		  var xmlhttp = new XMLHttpRequest();
	  } else { // code for IE6, IE5
		  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  clearTimeout(speedChangeTimeout);
	  
	  if (!isInCreate) {
		  clearStage();
  
		  currentProblem = problem;
          writeStorage('Sector33CurrentProblem', currentProblem);
		  
		  
		  $('#problemSpan').text(currentProblem);
	  }
	  
	  isInPlay = false;
	  inc = 0;
	  flip = false;
	  var xml =  document.getElementById (currentProblem);
  
	  planes.length = 0;
	  var type = xml.getElementsByTagName("ProblemType")[0].childNodes[0].nodeValue;
	  var tTime = xml.getElementsByTagName("TargetSolutionTime")[0].childNodes[0].nodeValue;
	  var splitTime = tTime.split(":");
	  var min = parseInt(splitTime[0]);
	  var sec = parseInt(splitTime[1]);

      totalTime = (min * 60) + sec;
      $("#totalTime").text(tTime);
	  
	  $("#progressbar").progressbar("option", "max", totalTime);
	  
	  var parsedPlanes = xml.getElementsByTagName("Airplane");
	  finalPlaneOrder = parsedPlanes.length;
	  numPlanes = finalPlaneOrder;
	  for (var i = 0; i < numPlanes; i++) {
		  var callSign = parsedPlanes[i].getElementsByTagName("CallSign")[0].childNodes[0].nodeValue;
		  var seg = parseInt(parsedPlanes[i].getElementsByTagName("SegmentChoice")[0].childNodes[0].nodeValue);
		  var dist = parseInt(parsedPlanes[i].getElementsByTagName("DistanceFromSegmentStart")[0].childNodes[0].nodeValue);
		  var plan = parseInt(parsedPlanes[i].getElementsByTagName("PlannedRouteChoice")[0].childNodes[0].nodeValue);
		  var speed = parseInt(parsedPlanes[i].getElementsByTagName("Speed")[0].childNodes[0].nodeValue);
		  
		  var segmentToRoute = 1;
		  var route;
		  switch (seg) {
			  case 1:
				  segmentToRoute = 3;
				  break;
			  case 2:
				  segmentToRoute = 4;
				  break;
			  case 3:
				  segmentToRoute = 5;
				  break;
		  }
		  
		  $("#progressbar").fadeIn();
		  $("#totalTime").fadeIn();
		  $("#incrementalTime").css({
									left: 1,
									top: 20
									});
		  $("#incrementalTime").html("0:00");
		  
		  $(".collisionError").hide();
		  $(".spacingError").hide();
		  
		  $("#anchor1").hide();
		  $("#anchor2").hide();
		  
		  $("#cloud1").hide();
		  $("#cloud2").hide();
		  
		  $("#lightning1").hide();
		  $("#lightning2").hide();
		  
		  $("#target3").hide();
		  $("#target4").hide();
		  $("#target5").hide();
		  
		  cloud1Route = 0;
		  cloud2Route = 0;
		  
		  var theRoute = segmentToRoute + plan;
		  route = setAnchorOnRoute(theRoute);
		  
		  var theColor = 'magenta';
		  if (callSign == "AAL12") theColor = 'cyan';
		  else if (callSign == "SWA23") theColor = 'yellow';
		  else if (callSign == "DAL88") theColor = 'limegreen';
		  else if (callSign == "UAL74") theColor = 'red';
		  
		  var aPlane = isInCreate ? getCurrentPlaneForCreateMode(theColor) : createPlane(theColor);
          if (aPlane == null)
              aPlane = createPlane(theColor);
		  aPlane.route = route;
		  aPlane.routeNum = theRoute;
		  aPlane.id = theColor;
		  aPlane.dataTag = callSign;
		  aPlane.speed = speed;
		  aPlane.colliding = false;
		  placePlane(aPlane, dist);
		  var tag = "#" + aPlane.color;
		  sLeft = parseInt($(tag).css('left'));
		  sTop = parseInt($(tag).css('top'));
		  var dataTag = "#" + aPlane.color + "tag";
		  $(dataTag).html(callSign + '<br /><span id="speedSpan">' + speed + ' kts</span>');
		  
		  aPlane.centerX = sLeft + div2;
		  aPlane.centerY = sTop + div2;
		  
		  if (theRoute == 1 || theRoute == 2 || theRoute == 5 || theRoute == 6) {
			  aPlane.canChangeRoute = true;
		  }
		  planes[i] = aPlane;
		  
	  }
	  placeTargets();
	  var clouds = xml.getElementsByTagName("StormCloud");
	  
	  for (var i = 0; i < clouds.length; i++) {
		  var segment = parseInt(clouds[i].getElementsByTagName("SegmentId")[0].childNodes[0].nodeValue);
		  var cloudPoint;
		  switch (segment) {
			  case 7:
				  cloudPoint = $("#anchorDropZone1").position();
				  $('#cloud1').css({
								   'left': cloudPoint.left - 5,
								   'top': cloudPoint.top + 10
								   });
				  $("#cloud1").fadeIn();
				  cloud1Route = 1;
                  
				  $('#lightning1').css({
									   'z-index': 1,
									   'position': 'absolute',
									   'left': cloudPoint.left - 5,
									   'top': cloudPoint.top + 30
									   });
				  break;
				  
			  case 9:
				  cloudPoint = {
				  left: 475,
				  top: 160
				  }
				  $('#cloud1').css({
								   'left': cloudPoint.left,
								   'top': cloudPoint.top
								   });
				  $("#cloud1").fadeIn();
				  cloud1Route = 2;
				  $('#lightning1').css({
									   'opacity': .6,
									   'z-index': 1,
									   'position': 'absolute',
									   'left': cloudPoint.left - 5,
									   'top': cloudPoint.top + 30
									   });
				  break;
				  
			  case 10:
				  cloudPoint = {
				  left: 475,
				  top: 300
				  }
				  $('#cloud2').css({
									'left': cloudPoint.left,
								   'top': cloudPoint.top
								   });
				  $("#cloud2").fadeIn();
				  cloud2Route = 5;
				  $('#lightning2').css({
									   'opacity': .6,
									   'z-index': 0,
									   'position': 'absolute',
									   'left': cloudPoint.left - 5,
									   'top': cloudPoint.top + 30
									   });
				  break;
				  
			  case 8:
				  cloudPoint = $("#anchorDropZone3").position();
				  $('#cloud2').css({
								   'left': cloudPoint.left - 5,
								   'top': cloudPoint.top + 10
								   });
				  $("#cloud2").fadeIn();
				  cloud2Route = 6;
				  $('#lightning2').css({
									   'opacity': .6,
									   'z-index': 0,
									   'position': 'absolute',
									   'left': cloudPoint.left - 5,
									   'top': cloudPoint.top + 30
									   });
				  break;
		  }
		  $("#cloud1").data("route",cloud1Route);
		  $("#cloud2").data("route",cloud2Route);
  
	  }
	  
  }

    // check for collision between two planes, set the currently inspected plane's collision status, and return collision status for use elsewhere (in case it is needed).
  function collisionDetected(color) {
	  for (var i = 0; i < planes.length; i++) {
		  if (i in planes) {
			  var testA = planes[i];
			  
			  if (testA.color != color) {
				  var a = getCurrentPlane(color);
				  var offSet = 33;
				  var tag = "#" + color;
				  var testTag = "#" + testA.color;
				  var aPos = $(tag).position();
				  var tPos = $(testTag).position();
				  
				  var aCenterX = aPos.left + 20;
				  var aCenterY = aPos.top + 20;
				  var tCenterX = tPos.left + 20;
				  var tCenterY = tPos.top + 20;
				  var xDist = Math.abs(tCenterX - aCenterX);
				  var yDist = Math.abs(tCenterY - aCenterY);
				  var distance = Math.sqrt(Math.round(xDist * xDist) + Math.round(yDist * yDist));
				  if (distance < offSet) {
 					  $(tag).fadeOut(100, function() {
									 $(tag).fadeIn(100);
									 });
					  $(testTag).fadeOut(100, function() {
										 $(testTag).fadeIn(100);
										 });
					  
					  didCollide = true;
					  a.colliding = true;
                      
					  return true;
					  
				  } else {
					  a.colliding = false;
				  }
				  
				  
			  }
		  }
	  }
	  return false;
  }

    // returning from Create mode, so reset the stage and clean up, making sure everything is normalized.
  function backFromCreateMode() {
      currentSpeed = 1000;
	  cplanes.length = 0;
	  canHoverOverRoute = false;
      $("#cloud1").data("route", 0);
      $("#cloud2").data("route", 0);
      cloud1Route = 0;
      cloud2Route = 0;
	  $("#cloud1").draggable('disable');
	  $("#cloud1").removeClass("ui-state-disabled");
	  $("#cloud2").draggable('disable');
	  $("#cloud2").removeClass("ui-state-disabled");
	 $("#progressbar").fadeIn();
	  $("#totalTime").fadeIn();
	  $("#incrementalTime").css({
								left: 1,
								top: 20
								});
	  
	  $("#cfooter").fadeOut("slow", function() {
							$("#cfooter").css({
											  "z-index": "-1"
											  });
							});
	  isInCreate = false;
	  isInSolve = false;
	  clearStage();
	  parseProblemXML(currentProblem);
	  
  }

        // altenate intersection logic.
    function pointRectangleIntersection(p, r) {
        return p.x > r.x1 && p.x < r.x2 && p.y > r.y1 && p.y < r.y2;
    }

    // if necessary, update the cloud route layout and display when dragging routes/clouds.
  function updateCloudRoutes() {
      var c1 = $("#cloud1");
      var c2 = $("#cloud2");
      var c1Pos = c1.position();
      var c2Pos = c2.position();
      var c1Point = {
                    x:c1Pos.left+c1.width,
                    y:c1Pos.top+c1.height
      };
      var c2Point = {
                    x:c2Pos.left+c2.width,
                    y:c2Pos.top+c2.height
      };
      var cd1 = $("#cloudDropZone1");
      var cd2 = $("#cloudDropZone2");
      var cd3 = $("#cloudDropZone3");
      var cd4 = $("#cloudDropZone4");
      var cd1off = {
          x1: cd1.offset().left, y1:cd1.offset().top,  x2:cd1.offset().left+cd1.width(), y2:cd1.offset().top+cd1.height()
      }
      var cd2off = {
      x1: cd2.offset().left, y1:cd2.offset().top,  x2:cd2.offset().left+cd2.width(), y2:cd2.offset().top+cd2.height()
      }
      var cd3off = {
      x1: cd1.offset().left, y1:cd3.offset().top,  x2:cd3.offset().left+cd3.width(), y2:cd3.offset().top+cd3.height()
      }
      var cd4off = {
      x1: cd4.offset().left, y1:cd4.offset().top,  x2:cd4.offset().left+cd4.width(), y2:cd4.offset().top+cd4.height()
      }
      

      if (pointRectangleIntersection(c1Point, cd1off)) {
            cloud1Route = 1;
            c1.data('route',cloud1Route);
      }
      if (pointRectangleIntersection(c1Point, cd2off)) {
          cloud1Route = 2;
          c1.data('route',cloud1Route);
          }
      if (pointRectangleIntersection(c1Point, cd3off)) {
              cloud1Route = 3;
              c1.data('route',cloud1Route);
              }
      if (pointRectangleIntersection(c1Point, cd4off)) {
          cloud1Route = 4;
          c1.data('route',cloud1Route);
          }
      
      if (pointRectangleIntersection(c2Point, cd1off)) {
          cloud1Route = 1;
          c2.data('route',cloud1Route);
      }
      if (pointRectangleIntersection(c2Point,  cd2off)) {
          cloud1Route = 2;
          c2.data('route',cloud1Route);
      }
      if (pointRectangleIntersection(c2Point,  cd3off)) {
          cloud1Route = 3;
          c2.data('route',cloud1Route);
      }
      if (pointRectangleIntersection(c2Point,  cd4off)) {
          cloud2Route = 4;
          c2.data('route',cloud1Route);
      }
  }

    // main create function to get everything ready and setup.
  function create() {
      hideAllRoutes();
     if (!isInSolve)
         planes.length = 0;
      
      currentSpeed = 1000;
	  animateButtonPress("#createButton");
	  $(".collisionError").hide();
	  $(".spacingError").hide();
	  $("#cfooter").css({
						"z-index": "4"
						});
	  $("#cfooter").fadeIn("slow", function() {});
	  isInCreate = true;
	  if (isInReview) {
		  $("#footer").css({
						   "background-image": "url(images/S33-CE-silver-menu-solve.png)"
						   });
		  $("#reviewButton").attr("src", 'images/S33-CE-review-button.png');
		  $("#stepper").fadeOut();
		  $('#progressbar').animate({
									top: 25
	 								}, 100);
      }
      isInReview = false;
 	  if (isInSolve) {
		  review(1);
		  var tmpPlanes = planes;
		  buildCreate();
		  planes = tmpPlanes;
		  for (var i = 0; i < planes.length; i++) {
			  var p = planes[i];
              p.routeNum = p.orgRouteNum ? p.orgRouteNum : p.routeNum;
              p.route = p.orgRoute ? p.orgRoute : p.route;
 			  var tag = "#" + p.color;
			  $(tag).draggable('enable');
			  placePlaneForCreateMode(p, {
									  left: p.orgPos.left,
									  top: p.orgPos.top
									  });
  		  }
	  	  if (planes.length > 1) {
              $("#createCreateButton").css({
                                           'opacity': 1
                                           });
          } else {
              
              $("#createCreateButton").css({
                                           'opacity': .6
                                           });
              
          }
	  
		  
	  } else {
          isInSolve = false;
          planes.length = 0;
          cplanes.length = 0;
          clearStage();
		  buildCreate();
          $("#createCreateButton").css({
                                       'opacity': .6
                                       });
	  }
	  updateCloudRoutes();
  }

    // solve for Created problem.  Returns to main stage using the currently Created problem and allows user to now solve the problem.  Also used to return from Review mode.
  function solve() {
 	  didCollide = false;
      for (var i = 0;i<cplanes.length;i++) {
          var p = cplanes[i];
          p.colliding = false;
          
      }
      $(".collisionError").hide();
	  if (planes.length < 2) return;
  
	  isInCreate = false;
	  isInSolve = true;
	  var tmpPlanes = planes;
      $("#customProblemText").show();
	  var cloud1Pos = $("#cloud1").position();
	  var cloud2Pos = $("#cloud2").position();
	  $("#cloud1").data("origPosition", cloud1Pos);
	  $("#cloud2").data("origPosition", cloud2Pos);
	  $("#cloud1").draggable('disable');
	  $("#cloud1").removeClass("ui-state-disabled");
	  $("#cloud2").draggable('disable');
	  $("#cloud2").removeClass("ui-state-disabled");
	  var c1 = cloud1Route;
      var c2 = cloud2Route;
      clearStage();
      cloud1Route = c1;
      cloud2Route = c2;
	  planes = tmpPlanes;
	  for (var i = 0; i < planes.length; i++) {
		  var p = planes[i];
          p.colliding = false;
          p.orgRoute = p.route;
          p.orgRouteNum = p.routeNum;
		  createPlaneDOM(p);
          placePlaneForCreateMode(p, {
								  left: p.left,
								  top: p.top
								  });
		  var tag = "#" + p.color;
		  $(tag).draggable('disable');
		  $(tag).removeClass("ui-state-disabled");
		  var pos = $(tag).position();
		  if (pos) {
			  p.orgPos.left = pos.left;
			  p.orgPos.top = pos.top;
		  }
	  }
	  
	  placeTargets();
	  finalPlaneOrder = planes.length;
  
	  if (cloud1Pos.left > mod.left) {
		  $("#cloud1").fadeIn();
	  }
	  if (cloud2Pos.left > mod.left) {
		  $("#cloud2").fadeIn();
	  }
	  $("#progressbar").fadeOut();
	  $("#totalTime").fadeOut();
	  $("#incrementalTime").css({
								left: 100,
								top: 18
								});
	  $("#incrementalTime").html("0:00");
	  $("#problemSpan").html("Problems");
	  
	  $("#cfooter").fadeOut("slow", function() {
							$("#cfooter").css({
											  "z-index": "-1"
											  });
							});
 }

    // review current problem in progress.  Problem just have been played at least for 1 second, and cannot be reset.  User can then step thru the problem in replay mode.
  function review(reset) {
 	  if (inc < 1 && !isInReview) return;
	  //else if (!isInReview) totalTime = inc;
	  isPaused = false;
	  pause();
      
	  if (isInReview || reset) {
		  isInReview = false;
		  $("#footer").css({
						   "background-image": "url(images/S33-CE-silver-menu-solve.png)"
						   });
		  $("#reviewButton").attr("src", 'images/S33-CE-review-button.png');
		  $("#stepper").fadeOut();
		  $('#progressbar').animate({
									top: 25
									}, 100);
          if (isInSolve) {
              $("#incrementalTime").animate({
                                            top: 18
                                            });
              
          }
	  } else {
		  isInReview = true;
  
          for (var i = 0;i<planes.length;i++) {
              var p = planes[i];
              p.colliding = false;
          }
          
          totalTime = inc-1;
          inc = 0;
          var cuMin = parseInt(inc / 60);
		  var cuSec = inc % 60;
		  var countDownVal = totalTime - inc;
		  var cdMin = parseInt(countDownVal / 60);
		  var cdSec = countDownVal % 60;
		  var cuText = cuSec < 10 ? cuMin + ':0' + cuSec : cuMin + ":" + cuSec;
		  var cdText = cdSec < 10 ? cdMin + ':0' + cdSec : cdMin + ":" + cdSec;
		  $("#incrementalTime").text(cuText);
		  $("#totalTime").text(cdText);
		  $("#progressbar").progressbar("option", "value", inc);


		  $("#footer").css({
						   "background-image": "url(images/S33-CE-orange-menu-review.png)"
						   });
		  $("#reviewButton").attr("src", 'images/S33-CE-solve-button1.png');
		  $("#stepper").fadeIn();
		  $('#progressbar').animate({
									top: 40
									}, 100);
          if (isInSolve) {
              $("#incrementalTime").animate({
                                        top: 30
                                        });
            
          }
	  }
	  //reload();
	  
    }

    // apply change for interval in review mode.
    function setIntervalForReview(el, timeout, shouldMove) {
        var moveIt = shouldMove;
        interval = window.setInterval(function() {
                                      if (inc == 0 || inc == totalTime) {
                                      clearTimeout(interval);
                                      return;
                                      }
                                      el.val(parseInt(el.val(), 10) + 1);
                                      if (++incSteps == 10) {
                                      clearTimeout(interval);
                                      setIntervalForReview(el, 60, true);
                                      } else if (incSteps == 20) {
                                      clearTimeout(interval);
                                      setIntervalForReview(el, 40, true);
                                      } else if (incSteps == 30) {
                                      clearTimeout(interval);
                                      setIntervalForReview(el, 20, true);
                                      }
                                      if (moveIt) {
                                      movePlane();
                                      } else {
                                      moveIt = true;
                                      
                                      }
                                      }, timeout);
        
    }


    // standard sound support.  Not all browsers supported (HTML5).
  function sound(animate) {
	  if (disableSound) {
		  alert("Sound currently not working in this browser");
		  return;
	  }
	  if (animate) animateButtonPress("#soundButton");
	  if (isMuted) {
		  $("#soundButton").attr("src", "images/ssapp_volume_icon.png");
		  isMuted = false;
	  } else {
		  $("#soundButton").attr("src", "images/ssapp_mute_icon.png");
		  isMuted = true;
		  $('#soundEffect').remove();
		  $("#embedSound").remove();
	  }
      
      writeStorage('Sector33SoundSetting', isMuted);
	  
  }

    // simply play sound (HTML5).
  function playSoundFile(planeCharToUse, routeToUse, speedToUse) {
        if (isMuted) return;
        $('#soundEffect').remove();
        $("#embedSound").remove();
        var router;
        if (speedToUse) {
            router = speedToUse;
        } else {
            router = routeToUse > 4 ? routeToUse - 2 : routeToUse;
        }
        var mp3 = "audio/" + planeCharToUse + router + "";
        if ((is_safari || is_explorer) && !is_chrome) {
            $.playSafariSound(mp3);
            $("audio")[$('audio').size()-1].play();
        }
        else
            $.playSound(mp3);
        
        
  }

    // load the extras screen for selecting videos, etc.
  function extras() {
	  reload();
	  if (isShowingExtras) {
      
		  $("#extras").fadeOut("slow", function() {
							 $("#extras").css({
											"z-index": "-1"
											});
							 });
 		  isShowingExtras = false;
	  } else {
 		  animateButtonPress("#helpButton");
		  
          
		  $("#extras").css({
						 "z-index": "3"
						 });
		  $("#extras").fadeIn("slow", function() {});
		  $("#cloud1").hide();
		  $("#cloud2").hide();
          
          isShowingExtras = true;
          
	  }
  }

    // load the help screen for displaying help screens, etc.
  function help() {
      $("#help").fadeIn("slow", function() {
                         $("#help").css({
                                        "z-index": "3"
                                        });
                         });
      
  }

    Number.prototype.toFixedDown = function(digits) {
        var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
        return m ? parseFloat(m[1]) : this.valueOf();
    };

    function compare(a,b) {
        if (a.left < b.left)
            return -1;
        if (a.left > b.left)
            return 1;
        return 0;
    }


    // calculate and display score after problem has completed.
  function score() {
	  
	  clearTimeout(speedChangeTimeout);
	  clearInterval(intervalID);
	  hideMenuIntervalID = 0;
	  isPaused = true;
	  hasEnded = true;
	  $("#playButton").attr("src", "images/ssapp_play_icon2.png");
	  $("#changeSpeedButton").attr("src", "images/ssapp_1x.png");
	  var aplanes = planes;
	  var len = aplanes.length;
	  var totalNMI = 0.0;
	  
	  var str=" ";
	  
      var xVal = 0;
      var fOrder = len;
      aplanes.sort(compare);

      for (var i = 0; i < len; i++) {
        var plane = aplanes[i];
        plane.finalOrder = fOrder--;
      }
      
	  for (var i = 0; i < len; i++) {
		  var plane = aplanes[i];
		  var targetOrder = plane.finalOrder;
		  var targetId = "#target" + (targetOrder == 0 ? 1 : targetOrder);
		  var targetPos = $(targetId).position();
		  if (!targetPos) {
			  targetPos = $("#target1").position();
		  }
		  if (targetPos) {
			  var planeId = "#" + plane.id;
			  var planePos = $(planeId).position();
			  var targetCenter = (targetOrder == 0 || targetOrder == 1 ? target1Center : targetOrder == 2 ? target2Center : targetOrder == 3 ? target3Center : targetOrder == 4 ? target4Center : target5Center);
			  var planeCenter = {
			  x: planePos.left + div2,
			  y: planePos.top + div2
			  };
			  
			  var xDist = targetCenter.x - planeCenter.x;
			  var yDist = targetCenter.y - planeCenter.y;
			  var dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
			  var d1 = (dist / 17.11);
              var d2 = "'"+d1+"'";
              var d3 = d2.substring(d2.indexOf("."),d2.indexOf(".")+2  );
              
              var d4 = parseFloat(d3);
              d1 = d4 >= .9  ? Math.round(d1) : d4 <= .1 ? Math.floor(d1) : d1;
  			  var distance = d1.toFixedDown(1);
              plane.distance = distance;
			  var dataTag = planeId + "tag";
    		  if (plane.distance <= .1) {
  				  if (!isInReview) {
                      $(dataTag + ' #speedSpan').html("");
                      var backingColor = plane.color == 'limegreen' ? 'limegreen' : plane.color == 'magenta' ? 'magenta' : plane.color;
                      
                      $(dataTag).css({
                                     'color': 'black',
                                     'background-color': backingColor,
                                     'border-color': 'white'
                                     });
                  }
			  } else {
				  $(dataTag + ' #speedSpan').html(plane.distance + " Nmi");
                  $(dataTag + ' #speedSpan').css({'color':plane.color});
				  totalNMI += (Math.abs(plane.distance));
				  
			  }


		  }
	  }
      
      if (isInReview) return;
      
	  if (didCollide) {
		  $("#collisionText").html("Minimum Seperation<br/> lost");
		  $(".collisionError").css({
								   'background-color': 'transparent',
								   'color': '#ff3b3b',
								   'border-color': '#ff3b3b',
								   'font-family': 'Roboto Mono, sans-serif' 
								   });
		  $(".collisionError").fadeIn();
		  if (totalNMI == 0) {
			  $("#spacingText").html("<br />Targets reached");
			  $(".spacingError").css({
									 'background-color': 'yellow',
									 'font-family': 'Roboto Mono, sans-serif' 
									 });
			  $(".spacingError").fadeIn();
		  } else {
			  var theSpacing = totalNMI.toFixed(1);
			  $("#spacingText").html("Total spacing error:<br />" + theSpacing + " Nmi");
			  $(".spacingError").css({
									 'background-color': 'transparent',
									 'color': '#ff3b3b',
									 'border-color': '#ff3b3b',
									 'font-family': 'Roboto Mono, sans-serif' 
									 });
			  $(".spacingError").fadeIn();
		  }
	  } else if (totalNMI == 0) {
 		  $("#collisionText").html("Congratulations!<br />Perfect Solution");
		  $(".collisionError").css({
								   'background-color': 'limegreen',
								   'color': 'black',
								   'font-family': 'Roboto Mono, sans-serif' 
								   });
		  $(".collisionError").fadeIn();
	  } else {
		  var theSpacing = totalNMI.toFixed(1);
		  $("#spacingText").html("Total spacing error:<br />" + theSpacing + " Nmi");
		  $(".spacingError").css({
								 'background-color': 'gold'
								 });
		  $(".spacingError").fadeIn();
	  }
	  
  }

    // function for displaying route when hovering over route with cloud or plane.
  function buildHoverRouteForCreate(theRoute) {
	  var color = 'transparent';
	  var stroke = 20;
	  var stagger = 10;
	  $('#s2').line(theRoute.point1.left-5, theRoute.point1.top-stagger, theRoute.point0.left-stagger, theRoute.point0.top-stagger, {
					color: color,
					stroke: stroke,
					zindex: 10,
                    opacity: 0,
					id: "CreateRoute1-0"+theRoute.routeNum,
					className: 'routePath'
					});
	  $('#s2').line(theRoute.point2.left-5, theRoute.point2.top-stagger, theRoute.point1.left-stagger, theRoute.point1.top-stagger, {
						color: color,
						stroke: stroke,
						zindex: 10,
                        opacity: 0,
						id: "CreateRoute2-1"+theRoute.routeNum,
						className: 'routePath'
						});
		  $('#s2').line(theRoute.point3.left-5, theRoute.point3.top-stagger, theRoute.point2.left-stagger, theRoute.point2.top-stagger, {
						color: color,
						stroke: stroke,
						zindex: 10,
                        opacity: 0,
						id: "CreateRoute3-2"+theRoute.routeNum,
						className: 'routePath'
						});
  }

    // builds Create screen/stage and sets up hover triggers, planes, and cloud objects.
  function buildCreate() {
	  if (cplanes.length == 0)
		  clearStage();
      
    
      currentSpeed = 1000;
	  isInCreate = true;
	  $("#createCreateButton").css({
								   'opacity': .6
								   });
	  
	  buildHoverRouteForCreate(route2);
	  buildHoverRouteForCreate(route1);
	  buildHoverRouteForCreate(route5);
	  buildHoverRouteForCreate(route6);
	  buildHoverRouteForCreate(route3);
	  buildHoverRouteForCreate(route4);
	 
	  var theColor = "yellow";
	  if (!getCurrentPlane(theColor)) {
	  var aPlane = createPlane(theColor);
	  aPlane.route = route1;
	  aPlane.routeNum = 1;
 	  aPlane.id = theColor;
	  aPlane.tagName = theColor;
	  aPlane.dataTag = "SWA23";
	  aPlane.speed = 600;
      aPlane.orgSpeed = 600;
	  aPlane.colliding = false;
	  aPlane.orgPos = {
	  left: 40,
	  top: 10
	  };
	  aPlane.startingPos = {
	  left: 40,
	  top: 10
	  };
	  placePlaneForCreateMode(aPlane, aPlane.orgPos);
	  var tag = "#" + aPlane.color;
	  sLeft = parseInt($(tag).css('left'));
	  sTop = parseInt($(tag).css('top'));
	  var dataTag = "#" + aPlane.color + "tag";
	  $(dataTag).html(aPlane.dataTag + '<br /><span id="speedSpan">' + aPlane.speed + ' kts</span>');
	  aPlane.centerX = sLeft + div2;
	  aPlane.centerY = sTop + div2;
	  aPlane.canChangeRoute = true;
	  cplanes[0] = aPlane;
	  }
	  
	  var theColor = "cyan";
	  if (!getCurrentPlane(theColor)) {
	  var aPlane = createPlane(theColor);
	  aPlane.route = route1;
	  aPlane.routeNum = 1;
	  aPlane.id = theColor;
	  aPlane.tagName = theColor;
	  aPlane.dataTag = "AAL12";
	  aPlane.speed = 600;
      aPlane.orgSpeed = 600;
	  aPlane.colliding = false;
	  aPlane.orgPos = {
	  left: 120,
	  top: 10
	  };
	  aPlane.startingPos = {
	  left: 120,
	  top: 10
	  };
	  placePlaneForCreateMode(aPlane, aPlane.orgPos);
	  var tag = "#" + aPlane.color;
	  sLeft = parseInt($(tag).css('left'));
	  sTop = parseInt($(tag).css('top'));
	  var dataTag = "#" + aPlane.color + "tag";
	  $(dataTag).html(aPlane.dataTag + '<br /><span id="speedSpan">' + aPlane.speed + ' kts</span>');
	  aPlane.centerX = sLeft + div2;
	  aPlane.centerY = sTop + div2;
		  aPlane.canChangeRoute = true;
	  cplanes[1] = aPlane;
	  }
	  
	  var theColor = "magenta";
	  if (!getCurrentPlane(theColor)) {
		  var aPlane = createPlane(theColor);
	  aPlane.route = route1;
	  aPlane.routeNum = 1;
 	  aPlane.id = theColor;
	  aPlane.tagName = theColor;
	  aPlane.dataTag = "VRD36";
	  aPlane.speed = 600;
          aPlane.orgSpeed = 600;
	  aPlane.colliding = false;
	  aPlane.orgPos = {
	  left: 200,
	  top: 10
	  };
	  aPlane.startingPos = {
	  left: 200,
	  top: 10
	  };
	  placePlaneForCreateMode(aPlane, aPlane.orgPos);
	  var tag = "#" + aPlane.color;
	  sLeft = parseInt($(tag).css('left'));
	  sTop = parseInt($(tag).css('top'));
	  var dataTag = "#" + aPlane.color + "tag";
	  $(dataTag).html(aPlane.dataTag + '<br /><span id="speedSpan">' + aPlane.speed + ' kts</span>');
	  aPlane.centerX = sLeft + div2;
	  aPlane.centerY = sTop + div2;
		  aPlane.canChangeRoute = true;
	 cplanes[2] = aPlane;
	  }
	  
	  var theColor = "limegreen";
	  if (!getCurrentPlane(theColor)) {
	  var aPlane = createPlane(theColor);
	  aPlane.route = route1;
	  aPlane.routeNum = 1;
	  aPlane.id = theColor;
	  aPlane.tagName = theColor;
	  aPlane.dataTag = "DAL88";
	  aPlane.speed = 600;
          aPlane.orgSpeed = 600;
	  aPlane.colliding = false;
	  aPlane.orgPos = {
	  left: 40,
	  top: 100
	  };
	  aPlane.startingPos = {
	  left: 40,
	  top: 100
	  };
	  placePlaneForCreateMode(aPlane, aPlane.orgPos);
	  var tag = "#" + aPlane.color;
	  sLeft = parseInt($(tag).css('left'));
	  sTop = parseInt($(tag).css('top'));
	  var dataTag = "#" + aPlane.color + "tag";
	  $(dataTag).html(aPlane.dataTag + '<br /><span id="speedSpan">' + aPlane.speed + ' kts</span>');
	  aPlane.centerX = sLeft + div2;
	  aPlane.centerY = sTop + div2;
		  aPlane.canChangeRoute = true;
	 cplanes[3] = aPlane;
	  }
	  var theColor = "red";
	  if (!getCurrentPlane(theColor)) {
	  var aPlane = createPlane(theColor);
	  aPlane.route = route1;
	  aPlane.routeNum = 1;
	  aPlane.id = theColor;
	  aPlane.tagName = theColor;
	  aPlane.dataTag = "UAL74";
	  aPlane.speed = 600;
          aPlane.orgSpeed = 600;
	  aPlane.colliding = false;
	  aPlane.orgPos = {
	  left: 120,
	  top: 100
	  };
	  aPlane.startingPos = {
	  left: 120,
	  top: 100
	  };
	  placePlaneForCreateMode(aPlane, aPlane.orgPos);
	  var tag = "#" + aPlane.color;
	  sLeft = parseInt($(tag).css('left'));
	  sTop = parseInt($(tag).css('top'));
	  var dataTag = "#" + aPlane.color + "tag";
	  $(dataTag).html(aPlane.dataTag + '<br /><span id="speedSpan">' + aPlane.speed + ' kts</span>');
	  aPlane.centerX = sLeft + div2;
	  aPlane.centerY = sTop + div2;
		  aPlane.canChangeRoute = true;
	  cplanes[4] = aPlane;
	  }
	  
	  
	  $('#cloudDropZone1').css({
							   'left': 376,
							   'top': 140
							   });
	  $('#cloudDropZone2').css({
							   'left': 486,
							   'top': 140
							   });
	  $('#cloudDropZone3').css({
							   'left': 376,
							   'top': 292
							   });
	  $('#cloudDropZone4').css({
							   'left': 486,
							   'top': 292
							   });
	   
	  
	  
	  if (!isInSolve) {
		  $("#cloud1").css({
						   top: 400,
						   left: 10,
						   zindex: 444
						   });
		  $("#cloud2").css({
						   top: 400,
						   left: 100,
						   zindex: 444
						   });
		  $("#cloud1").data("startingPosition", {
							left: 10,
							top: 400
							});
		  $("#cloud2").data("startingPosition", {
							left: 100,
							top: 400
							});
		  $("#cloud1").data("origPosition", {
							left: 10,
							top: 400
							});
		  $("#cloud2").data("origPosition", {
							left: 100,
							top: 400
							});
		  $("#cloud1").data("route", 0);
		  $("#cloud2").data("route", 0);
		  
		  $("#cloud1").draggable({
								 revert: function(valid) {
								if (!valid) {
                                   var pos2 = $(this).data().startingPosition;
                                    $(this).css({
                                                'position': 'absolute',
                                                'left': pos2.left,
                                                'top': pos2.top
                                                });
                                     $("#cloud1").data("route",0);
                                     cloud1Route = 0;
                                     hideAllRoutes();
                                
								 }
								return false;
								},
                                start: function(event, ui) {
                                    if ($("#cloud2").data('route')  == 0 || $("#cloud2").data('route') > 2) {
                                        $("#cloudDropZone1").css({"background-color" : "darkgray", "opacity":".4"});
                                        $("#cloudDropZone2").css({"background-color" : "darkgray", "opacity":".4"});
                                    }
                                    if ($("#cloud2").data('route')  == 0 || $("#cloud2").data('route') < 3) {
                                        $("#cloudDropZone3").css({"background-color" : "darkgray", "opacity":".4"});
                                        $("#cloudDropZone4").css({"background-color" : "darkgray", "opacity":".4"});
                                     
                                    }
                                    var str=" ";
                                    for (var i=0;i<planes.length;i++) {
                                        if ((planes[i].routeNum == 1 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 1 || $("#cloud2").data('route')  == 1))
                                            $("#cloudDropZone1").css({"background-color" : "transparent"});
                                        if ((planes[i].routeNum == 2 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 2 || $("#cloud2").data('route')  == 2))
                                            $("#cloudDropZone2").css({"background-color" : "transparent"});
                                        if ((planes[i].routeNum == 6 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 6 || $("#cloud2").data('route')  == 6))
                                            $("#cloudDropZone3").css({"background-color" : "transparent"});
                                        if ((planes[i].routeNum == 5 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 5 || $("#cloud2").data('route')  == 5))
                                            $("#cloudDropZone4").css({"background-color" : "transparent"});
                                 
                                
                                    }
                                 
                                },
								drag: function(event, ui) {
								},
								 stop: function(event, ui) {
                                     $("#cloudDropZone1").css({"background-color" : "transparent"});
                                     $("#cloudDropZone2").css({"background-color" : "transparent"});
                                     $("#cloudDropZone3").css({"background-color" : "transparent"});
                                     $("#cloudDropZone4").css({"background-color" : "transparent"});
      
								 }
							  });
		  $("#cloud2").draggable({
							  revert: function(valid) {
								if (!valid) {
								var pos2 = $(this).data().startingPosition;
								$(this).css({
											'position': 'absolute',
											'left': pos2.left,
											'top': pos2.top
											});
								 $("#cloud2").data("route",0);
                                 cloud2Route = 0;
                                 hideAllRoutes();
								 }
								return false;
								},
								 start: function(event, ui) {
								 if ($("#cloud1").data('route')  == 0 || $("#cloud1").data('route') > 2) {
								  $("#cloudDropZone1").css({"background-color" : "darkgray", "opacity":".4"});
								  $("#cloudDropZone2").css({"background-color" : "darkgray", "opacity":".4"});
								 }
								 if ($("#cloud1").data('route')  == 0 || $("#cloud1").data('route') < 3) {
								  $("#cloudDropZone3").css({"background-color" : "darkgray", "opacity":".4"});
								  $("#cloudDropZone4").css({"background-color" : "darkgray", "opacity":".4"});
								 }
                                 var str=" ";
                                 for (var i=0;i<planes.length;i++) {
                                 
                                 if ((planes[i].routeNum == 1 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 1 || $("#cloud2").data('route')  == 1))
                                 $("#cloudDropZone1").css({"background-color" : "transparent"});
                                 if ((planes[i].routeNum == 2 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 2 || $("#cloud2").data('route')  == 2))
                                 $("#cloudDropZone2").css({"background-color" : "transparent"});
                                 if ((planes[i].routeNum == 6 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 6 || $("#cloud2").data('route')  == 6))
                                 $("#cloudDropZone3").css({"background-color" : "transparent"});
                                 if ((planes[i].routeNum == 5 && planes[i].routeSegment == 2) || ($("#cloud1").data('route')  == 5 || $("#cloud2").data('route')  == 5))
                                 $("#cloudDropZone4").css({"background-color" : "transparent"});
                                
                                 
                                }

								 },
								 drag: function(event, ui) {
								 },
								 stop: function(event, ui) {
								 $("#cloudDropZone1").css({"background-color" : "transparent"});
								 $("#cloudDropZone2").css({"background-color" : "transparent"});
								 $("#cloudDropZone3").css({"background-color" : "transparent"});
								 $("#cloudDropZone4").css({"background-color" : "transparent"});
								 
								 }
								 });
		  
		  
		  $(".cloudDropZone").droppable({
										accept: '.cloud',
										greedy: true,
										over: function(event, ui) {
										},
										
										out: function(event, ui) {
                                            //can use to implement additional triggers
                                        },
										
										drop: function(event, ui) {
											hideAllRoutes();
											var center = $(this).position();
											var id = $(this).id;
											var eid = "#" + ui.draggable.attr("id");
											var othereid = eid == '#cloud1' ? '#cloud2' : '#cloud1';
											var eidRoute = $(eid).data("route");
											var otherRoute = $(othereid).data("route");
											var thisId = $(this).attr("id");
                                            if ($(this).css("background-color") == "transparent" || $(this).css("background-color") == "rgba(0, 0, 0, 0)")
                                        
                                                {
                                                   ui.draggable.animate(ui.draggable.data().origPosition, "fast");
                                                    ui.draggable.data("route", 0);
                                                    if (eid == "#cloud1") {
                                                      cloud1Route = 0;
                                                    }
                                                    else {
                                                      cloud2Route = 0;
                                                    }
                                                    return;
                                                }
                                        var eid = "#" + ui.draggable.attr("id");
                                        var othereid = eid == '#cloud1' ? '#cloud2' : '#cloud1';
                                        var othereidRoute = parseInt($(othereid).data('route'));
										var routeNum = thisId == "cloudDropZone1" ? 1 :
                                            thisId == "cloudDropZone2" ? 2 :
                                                thisId == "cloudDropZone3" ? 6 : 5;
                                        
										var p = null;
										if (checkRouteForPlane(routeNum)) {
                                              $("#s1").empty();

											  for (var i = 0; i < planes.length; i++) {
												  var p1 = planes[i];
												  if (p1.routeNum == routeNum) {
                                                        p = p1;
                                                        if (p != null && $("#"+p.id).position().left != p.startingPos.left) {
                                                            p.routeNum = routeNum == 1 ? 2 : routeNum == 2 ? 1: routeNum == 5 ? 6 : 5;
                                                            p.route = p.routeNum == 1 ? route1 : p.routeNum == 2 ? route2 : p.routeNum == 5 ? p.route = route5 : p.routeNum == 6 ? route6 : p.route;
                                                            var pTag = "#"+p.id;
                                                            var pos = $(pTag).position();
                                                            showRouteForCloudDrop(p.route, 2, p.color, pos, true);
                                                        }
                                                        
												  }
											  }
				
										}
                                        if (p != null) {
                                        
                                            clearTimeout(menuTimeout);
                                            menuTimeout = setTimeout(function() {
                                                                 hideAllRoutes("vhidemenu");
                                                                 }, 6000);
                                        

                                        }
											var pos = $(eid).position();
											$(eid).css({
													   'position': 'absolute',
													   'left': pos.left,
													   'top': pos.top
													   });
											ui.draggable.data("route", routeNum);
											if (eid == "#cloud1")
                                                cloud1Route = routeNum;
											else
                                                cloud2Route = routeNum;
											
										}
		
                                    });
          $("#cloud1").data('route',0);
          $("#cloud2").data('route',0);
	  }
	  else {
          var pos1 = $("#cloud1").position();
          var pos2 = $("#cloud2").position();
          cloud1Route = pos1.top == 400 ? 0 : cloud1Route;
          cloud2Route = pos2.top == 400 ? 0 : cloud2Route;
          $("#cloud1").data('route',cloud1Route);
          $("#cloud2").data('route',cloud2Route);

      }
	  $("#cloud1").draggable('enable');
	  $("#cloud2").draggable('enable');
  
	  $("#cloud1").fadeIn();
	  $("#cloud2").fadeIn();
	  
  }

    // select section from button menu of plane problems.
  function selectSection(section) {
	  var currentSection = currentProblem.charAt(0);
	  var num = currentProblem.charAt(2);
	  if (currentProblem.length > 3) num = parseInt(currentProblem.substr(2, 4));
	  if (!section) section = currentSection;
	  $("#problemsTable .row2").hide();
	  $("#problemsTable .row3").hide();
	  $("#problemsTable .row4").hide();
	  $("#problemsTable .row5").hide();
	  $("#twoproblem").attr("src", "images/S33CE-L2inactive.png");
	  $("#threeproblem").attr("src", "images/S33CE-L3inactive.png");
	  $("#fourproblem").attr("src", "images/S33CE-L4inactive.png");
	  $("#fiveproblem").attr("src", "images/S33CE-L5inactive.png");
	  var selectedButton;
	  if (section == '2') {
		  $("#twoproblem").attr("src", "images/S33CE-L2selected.png");
		  selectedButton = "#2td" + num;
		  $("#problemsTable .row2").show();
	  } else if (section == '3') {
		  $("#threeproblem").attr("src", "images/S33CE-L3selected.png");
		  selectedButton = "#3td" + num;
		  $("#problemsTable .row3").show();
	  } else if (section == '4') {
		  $("#fourproblem").attr("src", "images/S33CE-L4selected.png");
		  selectedButton = "#4td" + num;
		  $("#problemsTable .row4").show();
	  } else {
		  $("#fiveproblem").attr("src", "images/S33CE-L5selected.png");
		  selectedButton = "#5td" + num;
		  $("#problemsTable .row5").show();
	  }
	  if (section == currentSection) $(selectedButton).css("backgroundImage", "url(images/S33CE-ProbSelected.png)");
	  
	  
  }

    // select individual problem from Problem button in section selected.
  function selectProblem(callerIsCreateMode) {
	  if (isShowingProblemSelection) {
		  $("#problems").fadeOut("slow", function() {
								 $("#problems").css({
													"z-index": "-1"
													});
								 });
		  isShowingProblemSelection = false;
	  } else {
		  animateButtonPress("#problemButton");
          reload();
		  $("#cloud1").hide();
		  $("#cloud2").hide();
		  selectSection();
		  $("#problems").css({
							 "z-index": "3"
							 });
		  $("#problems").fadeIn("slow", function() {});
		  isShowingProblemSelection = true;
	  }
	  
  }

    // setup display of problem button input.
  function setProbButton(problem, activate) {
	  //alert(problem);
	  var section = problem.charAt(0);
	  var num = problem.charAt(2);
	  if (currentProblem.length > 3)
          num = parseInt(currentProblem.substr(2, 4));
	  var selectedButton = "#" + section + "td" + num;
	  if (activate)
          $(selectedButton).css("backgroundImage", "url(images/S33CE-ProbSelected.png)");
	  else
          $(selectedButton).css("backgroundImage", "url(images/S33CE-ProbInactive.png)");
  }

    // use problem as selected from individual Problem button, then request to build stage and display problem.
  function useProblem(thisId) {
	 if (thisId) {
		 
          if (!isInCreate) {
              if (!(is_firefox && isWindows) && !is_chrome)
                  location.reload(true);
          }
         
          isInSolve = false;
          isInReview = false;
		  setProbButton(currentProblem, false);
		  currentProblem = $("#problemsTable #" + thisId).html();
		  currentProblem = currentProblem.trim();
		  currentProblem = currentProblem.replace("Problem ", "");
		  setProbButton(currentProblem, true);
         planes.length = 0;
		  if (isInCreate) {
              clearStage();
              create();
			  parseProblemXML(currentProblem);
			  $("#cloud1").show();
			  $("#cloud2").show();
			  $("#cloud1").draggable('enable');
			  $("#cloud2").draggable('enable');
              $("#createCreateButton").css({
                                           'opacity': 1
                                           });
		  
			  var uniquePlanes = [];
			  $.each(planes, function(i, el){
					 if($.inArray(el, uniquePlanes) === -1) uniquePlanes.push(el);
					 });
			  planes = uniquePlanes;
		  }
		  else {
              isInReview = true;
              review(1);
              isInReview = false;
			  isInCreate = false;
			  reload(true, true);
		  }
		  isShowingProblemSelection = false;
		  $("#problems").fadeOut("slow", function() {
								 $("#problems").css({
													"z-index": "-1"
													});
								 });
 	  }
  }

    // setup and/or update speed button for currently selected plane Menu.
  function setSpeedButton(speed, activate) {
	  $("#600").css("color", "white");
	  $("#540").css("color", "white");
	  $("#480").css("color", "white");
	  $("#420").css("color", "white");
	  $("#360").css("color", "white");
	  $("#300").css("color", "white");
	  var selectedButton = "#" + speed;
	  if (activate) $(selectedButton).css("color", "black");
	  else $(selectedButton).css("color", "white");
  }

    // perform additional updating on speed change for currently selected plane in Menu.
  function setSpeedChange(planeSpeed, keep) {
	  currentPlane.speed = planeSpeed;
	  if (isInCreate) currentPlane.orgSpeed = planeSpeed;
	  var dataTag = "#" + currentPlane.id + "tag";
	  $(dataTag).html(currentPlane.dataTag + '<br /><span id="speedSpan" style="color:white;">' + currentPlane.speed + ' kts</span>');
	  var lineColor = currentPlane.color == 'limegreen' ? 'limegreen' : currentPlane.color == 'magenta' ? 'magenta' : currentPlane.color;
	  
	  var storeHtml = currentPlane.dataTag + '<br /><span id="speedSpan" style="color:' + lineColor + '";">' + currentPlane.speed + ' kts</span>';
	  
	  clearTimeout(speedChangeTimeout);
      if (!keep)
          speedChangeTimeout = setTimeout(function() {
									  $(dataTag).html(storeHtml);
									  }, 3000);
	  
  }

    // apply speed change and update parameters and stage.
  function useSpeed(thisId) {
	  if (thisId) {
          var prevSpeed = currentPlane.speed;
		  var planeSpeed = parseInt($("#speedTable #" + thisId).html());
		  setSpeedButton(planeSpeed, true);
		  setSpeedChange(planeSpeed, false);
		  if (!isInReview) {
              var previtem = {
                  'action': 2,
                  'timeOfEventInSeconds': (inc-1 < 0 ? 0 : inc-1),
                  'value': prevSpeed,
                  'plane': currentPlane.color
              };
               var item = {
                  'action': 2,
                  'timeOfEventInSeconds': inc,
                  'value': planeSpeed,
                  'plane': currentPlane.color
              };
              reviewItems.push(previtem);
              reviewItems.push(item);
          }
		  playSoundFile(currentPlane.dataTag.charAt(0), 0, planeSpeed);
		  
	  }
  }

    // set tracking item (store in array) to be used in Review mode (FIFO).
  function setTrackingItem() {
	  for (var i = 0; i < reviewItems.length; i++) {
		  var item = reviewItems[i];
  		  if (item.timeOfEventInSeconds == inc) {
			  for (var j = 0; j < planes.length; j++) {
				  var a = planes[j];
				  
				  if (a.color == item.plane) {
					  currentPlane = a;
					  break;
				  }
				  
			  }
			  switch (item.action) {
				  case 1:
					  var cTag = "#" + currentPlane.color;
					  pos = $(cTag).position();
					  currentPlane.route = item.value;
					  showRoute(currentPlane.route, 2, currentPlane.color, pos, true);
                      clearTimeout(menuTimeout);
                      menuTimeout = setTimeout(function() {
                                               hideAllRoutes("vhidemenu");
                                               }, 6000);
					  break;
					  
				  case 2:
                      setSpeedButton(item.value, true);
                      setSpeedChange(item.value, true);
                      break;
					  
				  default:
					  break;
			  }
		  }
	  }
	  
  }


    // function to determine if current rectangle contains point (usually plane or cloud center).
  function rectContainsPoint(rect, point) {
	  if (rect.left <= point.left && point.left <= rect.right && rect.top <= point.top && point.top <= rect.bottom) {
		  return true;
	  }
	  return false;
  }

    // allow selection of extras item in Extras screen table or list.
  function selectExtra(item) {
	  switch (item) {
		  case 1:
			  window.open('sector33intro.html', 'Sector33 Intro', 'width=974px, height=668px');
			  break;
		  case 2:
			  window.open('sector33help.html', 'Sector33 Help', 'width=974px, height=668px');
			  break;
		  case 3:
			  window.open('http://www.youtube.com/watch_popup?v=MoG3YqoZfV0', 'Welcome to Sector33', 'width=974px, height=668px');
			  break;
		  case 4:
			  window.open('http://www.youtube.com/watch_popup?v=59N-tU_i1iE', '24 Hours/World', 'width=974px, height=668px');
			  break;
		  case 5:
			  window.open('http://www.youtube.com/watch_popup?v=4E8xbf-Tq44&feature=player_profilepage', '24 Hours/US', 'width=974px, height=668px');
			  break;
		  case 6:
			  window.open('https://www.youtube.com/watch_popup?v=_VQsiy-M-JY&feature=youtu.be', "I'm a Controller", 'width=974px, height=668px');
			  break;
			  
	  }
  }

    // display help button in contextual help screen.
  function showHelpBubble(type) {
      $("#helpbubble").fadeOut();
     var text = "";
        if (type == 'anchor') {
            text = "Drag this anchor to re-route the plane.";
        }
        else if (type == 'play') {
            
        }
        $("#helpbubble").html(text);
        $("#helpbubble").fadeIn();
      
  }
  


  $(function() {
	
	
	
	$("#progressbar").progressbar({
								  value: 0
								  })
	
	$('#plusButton').on({
						mousedown: function() {
                            pause();
                            if (inc == totalTime) return;
                            flip = false;
                            incSteps = 0;
                            if (inc < 0)
                                inc == 0;
                            if (inc == 0) {
                                movePlane();
                                setIntervalForReview($(this), 80, false);
                           } else
                                setIntervalForReview($(this), 80, true);
                            
						},
						mouseup: function() {
                            window.clearInterval(interval);
						}
						});
	$('#minusButton').on({
						 mousedown: function() {
                             pause();
                             if (inc == 0) return;
                             flip = true;
                             incSteps = 0;
                             if (inc > totalTime)
                                inc = totalTime;
                             if (inc == totalTime) {
                                movePlane();
                                setIntervalForReview($(this), 80, false);
                             }
                             else
                                setIntervalForReview($(this), 80, true);
                             
						 },
						 mouseup: function() {
                            window.clearInterval(interval);
						 }
						 });
	
  
	 });
  
  
  
  
  $(document).ready(function() {
                    is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
                     is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
                     is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
                     is_safari = navigator.userAgent.indexOf("Safari") > -1;
                     is_Opera = navigator.userAgent.indexOf("Presto") > -1;
                     is_IE9 = document.all && !window.atob;
                     isMac = navigator.platform.toUpperCase().indexOf('MAC')!==-1;
                     isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
                     isLinux = navigator.platform.toUpperCase().indexOf('LINUX')!==-1;
                  
 					$(document).on({
								   mouseover: function (e) {
								   if (!canHoverOverRoute || !isInCreate)
									  return;
								   hoverRouteNum = this.id.substr(this.id.length - 1);
								   if (checkRouteForCloud(hoverRouteNum)) {
                                        hoverRouteNum = hoverRouteNum == 1 ? 2 : hoverRouteNum == 2 ? 1 : hoverRouteNum == 5 ? 6 : 5;
								   }
								   var parentOffset = $(this).parent().offset();
								   currentMouseX = e.pageX - parentOffset.left;
								   currentMouseY = e.pageY - parentOffset.top - div2;
								  
								   var route = hoverRouteNum == 1 ? route1 : hoverRouteNum == 2 ? route2 : hoverRouteNum == 3 ? route3 : hoverRouteNum == 4 ? route4 : hoverRouteNum == 5 ? route5 : route6;
								   hideAllRoutes();
                                   $("#s1").empty();
								   showRoute(route, 4, "white", false, false, 'ccroute');
								   
								   
								  },
								   mouseout: function (e) {
                                     hoverRouteNum = 0;
                                     $(this).css({"z-index":10});
                                       if (!canHoverOverRoute || !isInCreate)
                                          return;
                                       hideAllRoutes();
                                       if (!is_IE9)
                                            $("#s1").empty();
                                    }
								   }, ".routePath");
					
					$("info").html("");
                    
                    $("#customProblemText").hide();
				
					$("#stepper").fadeOut(1);
					$("#cfooter").fadeOut(1);
					$("#extras").fadeOut(1);
					$("#help").fadeOut(1);
					$("#problems").fadeOut(1);
					$("#problems").hide();
					$("#speedTable").fadeOut(1);
					
					$(".collisionError").fadeOut(1);
					$(".spacingError").fadeOut(1);
					
					$('#s1').click(function() {
								   hideAllRoutes("s1 clicked");
								   })
					$('#s2').click(function() {
								   hideAllRoutes("s1 clicked");
								   })
					$('#connector').click(function() {
										  hideAllRoutes("connector clicked");
										  })
					$.playSound("audio/point1sec");
					
					$('.imageProblemButton').click(function() {
												   useProblem(this.id);
												   });
					$('.imageSpeedButton').click(function() {
												 useSpeed(this.id);
												 });
					
					
					$('#anchorDropZone1').css({
											  'left': 376,
											  'top': 140
											  });
					$('#anchorDropZone2').css({
											  'left': oal.left - 30,
											  'top': oal.top - 30
											  });
					$('#anchorDropZone3').css({
											  'left': 376,
											  'top': 292
											  });
					
					$(".anchor").draggable({
										   revert: function(valid) {
										   if (!valid) {
										   var cTag = "#" + currentPlane.color;
										   var pos = $(cTag).position();
										   showRoute(currentPlane.route, 2, currentPlane.color, pos, true);
										   }
										   return !valid;
										   },
										   
										   revertDuration: 1,
										   
										   start: function(event, ui) {
                                           clearTimeout(menuTimeout);
										   $(this).data("origPosition", $(this).position());
										   },
										   drag: function(event, ui) {
										   hideMenuIntervalID = 0;
										   
										   var tag = "#" + $(this).attr("id");
										   var tempRoute = currentRoute;
										   var showNewRoute = false;
										   
										   $("#anchorDropZone2").css({"background-color" : "darkgray", "opacity":".4"});
										   if (tag == "#anchor1") {
										   var r1Pos = $("#anchorDropZone1").position();
										   var r1 = {
										   left: r1Pos.left - 30,
										   top: r1Pos.top - 30,
										   bottom: r1Pos.top + 30,
										   right: r1Pos.left + 30
										   };
										   $("#anchorDropZone1").css({"background-color" : "darkgray", "opacity":".4"});
										   var r2Pos = $("#anchorDropZone2").position();
										   var r2 = {
										   left: r2Pos.left - 30,
										   top: r2Pos.top - 30,
										   bottom: r2Pos.top + 30,
										   right: r2Pos.left + 30
										   };
										   if (rectContainsPoint(r1, $(this).position())) {
										   tempRoute = route1;
										   showNewRoute = true;
										   } else if (rectContainsPoint(r2, $(this).position())) {
										   tempRoute = route2;
										   showNewRoute = true;
										   }
										   } else if (tag == "#anchor2") {
										   var r1Pos = $("#anchorDropZone2").position();
										   var r1 = {
										   left: r1Pos.left - 30,
										   top: r1Pos.top - 30,
										   bottom: r1Pos.top + 30,
										   right: r1Pos.left + 30
										   };
										   $("#anchorDropZone3").css({"background-color" : "darkgray", "opacity":".4"});
										   var r2Pos = $("#anchorDropZone3").position();
										   var r2 = {
										   left: r2Pos.left - 30,
										   top: r2Pos.top - 30,
										   bottom: r2Pos.top + 30,
										   right: r2Pos.left + 30
										   };
										   if (rectContainsPoint(r1, $(this).position())) {
										   tempRoute = route5;
										   showNewRoute = true;
										   } else if (rectContainsPoint(r2, $(this).position())) {
										   tempRoute = route6;
										   showNewRoute = true;
										   }
										   }
										   if (showNewRoute) {
										   var tag1 = "#" + currentPlane.id;
										   var pos1 = $(tag1).position();
										   showRoute(tempRoute, 2, currentPlane.color, pos1, true);
										   } else {
										   $("#s1").empty();
										   }
										   
										   
										   },
										   
										   stop: function(event, ui) {
										   $("#anchorDropZone1").css({"background-color" : "transparent"});
										   $("#anchorDropZone2").css({"background-color" : "transparent"});
										   $("#anchorDropZone3").css({"background-color" : "transparent"});
										   clearTimeout(menuTimeout);
										   menuTimeout = setTimeout(function() {
																	hideAllRoutes("vhidemenu");
																	}, 6000);
										  
										   }
										   
										   });
					
					$(".anchorDropZone").droppable({
												   accept: '.anchor',
												   greedy: true,
												   drop: function(event, ui) {
												   var tag = "#" + ui.draggable.attr("id");
												   var tag1 = "#" + $(this).attr("id");
												   var pos = $(this).position();
												   $(tag).css({
															  'position': 'absolute',
															  'left': pos.left,
															  'top': pos.top
															  });
												   var mp3;
                         						   if (tag == "#anchor1" && (tag1 == "#anchorDropZone1" || tag1 == "#anchorDropZone2")) {
												   if (tag1 == "#anchorDropZone1") {
												   currentPlane.route = route1;
												   currentPlane.routeNum = 1;
												   playSoundFile(currentPlane.dataTag.charAt(0), 2);
												   } else {
												   currentPlane.route = route2;
												   currentPlane.routeNum = 2;
												   playSoundFile(currentPlane.dataTag.charAt(0), 1);
												   }
												   } else if (tag == "#anchor2" && (tag1 == "#anchorDropZone2" || tag1 == "#anchorDropZone3")) {
												   if (tag1 == "#anchorDropZone2") {
												   currentPlane.route = route5;
												   currentPlane.routeNum = 5;
												   playSoundFile(currentPlane.dataTag.charAt(0), 5);
												   } else {
												   currentPlane.route = route6;
												   currentPlane.routeNum = 6;
												   playSoundFile(currentPlane.dataTag.charAt(0), 6);
												   }
												   } else {
												   var pos2 = ui.draggable.data().origPosition;
												   $(tag).css({
															  'position': 'absolute',
															  'left': pos2.left,
															  'top': pos2.top
															  });
												   currentPlane.route = currentRoute;
												   showRoute(currentPlane.route, 2, currentPlane.color, pos, true);
												   }
												   var cTag = "#" + currentPlane.color;
												   pos = $(cTag).position();
												   showRoute(currentPlane.route, 2, currentPlane.color, pos, true);
												   var item = {
                                                       'action': 1,
                                                       'timeOfEventInSeconds': inc,
                                                       'value': currentPlane.route,
                                                       'plane': currentPlane.color
                                                    };
												   reviewItems.push(item);
												   
												   }
												   });
					
 					sound(false);
					
					$("#problemSpan").text(currentProblem);
					parseProblemXML(currentProblem);
					
					
					
					
					
					
  });
