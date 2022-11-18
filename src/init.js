$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    dancers.push(dancer);
    $('body').append(dancer.$node);
  });

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

});

