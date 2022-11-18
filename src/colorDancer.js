var makeColorDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

makeColorDancer.prototype = Object.create(makeDancer.prototype);
makeColorDancer.prototype.constructor = makeColorDancer;

makeColorDancer.prototype.curIndex = 0;

makeColorDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  var color = ['red', 'blue', 'yellow', 'green', 'purple', 'white', 'orange'];
  if (this.curIndex === color.length - 1) {
    this.curIndex = 0;
  } else {
    this.curIndex++;
  }
  this.$node.css('border-color', color[this.curIndex]);
};


