var makeInteractDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
};


makeInteractDancer.prototype = Object.create(makeDancer.prototype);
makeInteractDancer.prototype.constructor = makeInteractDancer;
makeInteractDancer.prototype.iterator = 1;
makeInteractDancer.prototype.size = 30;
makeInteractDancer.prototype.speedIterator = 1;
makeInteractDancer.prototype.sizeIterator = 1;
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
  this.setPosition(curMin.top + 30, curMin.left);
  this.originalTop = this.top - 32;
  this.originalLeft = this.left;
  //Call rotation creator function
  this.rotationPattern = this.createRotationPattern();
  this.interacted = true;
};


makeInteractDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  if (this.interacted === true) {
    var topArr = this.rotationPattern.top;
    var leftArr = this.rotationPattern.left;
    if (this.iterator < topArr.length) {
      this.top = this.originalTop + topArr[this.iterator];
      this.left = this.originalLeft + leftArr[this.iterator];
      this.iterator++;
    } else {
      this.iterator = 1;
    }
  }
    this.setPosition(this.top, this.left);
};
//

makeInteractDancer.prototype.createRotationPattern = function() {
  //Starts Above
  var posObj = {top: [this.size], left: [0]}
  var i = 1;
  while (i - 1 !== this.size * 4) {
      var prevTop = posObj.top[i - 1];
      var prevLeft = posObj.left[i - 1];
      //To the Right
      if (i < this.size) {
        posObj.top.push(prevTop - 1);
        posObj.left.push(prevLeft + 1);
        //To the Bottom
      } else if (i < this.size * 2) {
        posObj.top.push(prevTop - 1);
        posObj.left.push(prevLeft - 1);
        //To the Left
      } else if (i < this.size * 3) {
        posObj.top.push(prevTop + 1);
        posObj.left.push(prevLeft - 1);
        //Back to Top
      } else {
        posObj.top.push(prevTop + 1);
        posObj.left.push(prevLeft + 1);
      }
      i++;
  }
  return posObj;
};

//Old pattern
  /*if (this.interacted === true) {
    //First move
    if (this.iterator === 0) {
      this.top -= 30;
      this.left += 30;
      this.iterator++;
    } //Second move
    else if (this.iterator === 1) {
      this.top -= 30;
      this.left -= 30;
      this.iterator++;
    } //Third Move
    else if (this.iterator === 2) {
      this.top += 30;
      this.left -= 30;
      this.iterator++;
    } //Reset Position
    else if (this.iterator === 3) {
      this.top += 30;
      this.left += 30;
      this.iterator = 0;
    }*/

//Top starts at +30
//Left starts at 0

//Subtract by 1 until top equals 0
//Add by 1 until left equals 30

//Push last iteration minus 1 for top
//Push last iteration plus 1 for left
