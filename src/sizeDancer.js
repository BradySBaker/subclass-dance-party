var makeSizeDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  var randomSize = Math.floor(Math.random() * 50);
  this.$node.css({'border-width': randomSize, 'border-radius': randomSize});
};

makeSizeDancer.prototype = Object.create(makeDancer.prototype);
makeSizeDancer.prototype.constructor = makeBlinkyDancer;

makeSizeDancer.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
};


