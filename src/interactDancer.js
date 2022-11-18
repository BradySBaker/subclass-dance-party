var makeInteractDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
};

makeInteractDancer.prototype = Object.create(makeDancer.prototype);
makeInteractDancer.prototype.constructor = makeInteractDancer;
makeInteractDancer.prototype.togglePos = false;
makeInteractDancer.prototype.interacted = false;
//At current dancer = interact

//Set variables with current position
//Loop through each dancer
  //Get access to current looped positions
  //
  //Absolute of currentselftop - curdancertop
  //Absolute of currentselfleft - curdancerleft
  //Distance = sqrt (abovetop^2 + aboveleft^2)
  //Curminimum = curdancer
  //curmindistance = distance

//Edge Case - Ignore self
//Edge Case - Another Interact Dancer
makeInteractDancer.prototype.interact = function() {
  var curTop = this.top;
  var curLeft = this.left;
  var curMin, curMinDistance;
  dancers.forEach(function(curDancer) {
    if (curDancer.dancerMakerFunctionName !== 'makeInteractDancer') {
      //Create distance variables
      var topDistance = Math.abs(curTop - curDancer.top);
      var leftDistance = Math.abs (curLeft - curDancer.left);
      var curDistance = Math.sqrt((topDistance**2) + (leftDistance**2));
      //Set Minimum
      if (curMinDistance === undefined) {
        curMin = curDancer;
        curMinDistance = curDistance;
      } else if (curDistance < curMinDistance) {
        curMin = curDancer;
        curMinDistance = curDistance;
      }
    }
  });
  this.setPosition(curMin.top, curMin.left + 30);
  this.interacted = true;
};


makeInteractDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  if (this.interacted === true) {
    if (this.togglePos === false) {
      this.setPosition(this.top + 30, this.left);
      this.togglePos = true;
    } else {
      this.setPosition(this.top - 30, this.left);
      this.togglePos = false;
    }
  }
};
//


