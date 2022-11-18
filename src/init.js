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
  $('.interactButton').on('click', function(event) {
    dancers.forEach(function(curDancer) {
      if (curDancer.dancerMakerFunctionName === 'makeInteractDancer') {
        curDancer.interact();
      }
    });
  });

  //Lineup Button Click
  $('.lineupButton').on('click', function(event) {
    var topPos = 10;
    var leftPos = 10;
    dancers.forEach(function(curDancer) {
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
      'border-color': 'orange',
      'border-radius': '5px',
      'border-width': '100px'
    };
    $(event.target).css(settings);
  });

  $('body').on('mouseout', '.mouseDancer', function(event) {
    var settings = {
      'border-color': 'red',
      'border-radius': '10px',
      'border-width': '10px'
    };
    $(event.target).css(settings);
  });

});

