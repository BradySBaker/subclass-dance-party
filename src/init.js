$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {

    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make

    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    dancer.dancerMakerFunctionName = dancerMakerFunctionName;
    dancers.push(dancer);
    if (dancerMakerFunctionName === 'makeMouseDancer') {
      dancer.$node.addClass('mouseDancer');
    }
    $('body').append(dancer.$node);
  });


  //Interact Button Click
  $('#interactButton').on('click', function(event) {
    dancers.forEach(function(curDancer) {
      if (curDancer.dancerMakerFunctionName === 'makeInteractDancer') {
        curDancer.interact();
        curDancer.timeBetweenSteps = 100;
      }
    });
  });

  //Lineup Button Click
  $('#lineupButton').on('click', function(event) {
    var topPos = 10;
    var leftPos = 10;
    dancers.forEach(function(curDancer) {
      if (curDancer.dancerMakerFunctionName === 'makeInteractDancer') {
        curDancer.interacted = false;
      }
      var curSize = curDancer.$node.css('border-width');
      curSize = curSize.slice(0, curSize.length - 2);
      curSize = Number(curSize);
      if (topPos > 90) {
        topPos = 10;
        leftPos += 5;
      }
      if (curSize > 10 && topPos !== 10) {
        topPos += 10;
      }
      curDancer.lineUp(topPos, leftPos);
      topPos += 5;
    });
  });
  //Mouser Dancer
  $('body').on('mouseover', '.mouseDancer', function(event) {
    var settings = {
      'background-image': 'url("mario.gif")',
      'min-width': '100px',
      'min-height': '100px',
      'background-size': '100px',
      'background-position': 'center'
    };
    $(event.target).css(settings);
  });

  $('body').on('mouseout', '.mouseDancer', function(event) {
    var settings = {
      'background-image': '',
      'background-size': '',
      'min-width': '',
      'min-height': ''
    };
    $(event.target).css(settings);
  });

  //Interact Speed Button Click
  $('#interactSpeed').on('click', function(event) {

    dancers.forEach(function(curDancer) {
      if (curDancer.dancerMakerFunctionName === 'makeInteractDancer') {
        var speedArr = [100, 50, 30, 10, 5];
        curDancer.timeBetweenSteps = speedArr[curDancer.speedIterator];
        if (curDancer.speedIterator === 4) {
          curDancer.speedIterator = 0;
        } else {
          curDancer.speedIterator++;
        }
      }
    });
  });

  //Interact Size Button Click
  $('#interactSize').on('click', function(event) {

    dancers.forEach(function(curDancer) {
      if (curDancer.dancerMakerFunctionName === 'makeInteractDancer') {
        var sizeArr = [30, 50, 100, 130, 200];
        curDancer.size = sizeArr[curDancer.sizeIterator];
        curDancer.rotationPattern = curDancer.createRotationPattern();
        if (curDancer.sizeIterator === 4) {
          curDancer.sizeIterator = 0;
        } else {
          curDancer.sizeIterator++;
        }
      }
    });
  });

});