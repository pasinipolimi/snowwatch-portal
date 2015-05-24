var ImgWarper = ImgWarper || {};

ImgWarper.PointDefiner = function(canvas, image, imgData) {
  this.oriPoints = new Array();
  this.dstPoints = new Array();
  this.useOriginalImage = false;
  this.originalAuxPointsNumber = 8;
  this.referencePoints = new Array();
  this.refPeakCandidate = null;
  this.pointMarginLeft = 4;
  this.pointMarginTop = 15;
  this.snapThreshold = 20;

  this.selectedPointColor = '#0F0';
  this.pointColor = '#119a21';
  this.oriPointColor = '#119a21';
  this.fixedPointColor = '#00F';
  this.unavailablePointColor = '#F00';

  //set up points for change; 
  var c = canvas;
  this.canvas = canvas;
  var that = this;
  this.dragging_ = false;
  this.computing_ = false;
  this.enabledClick = false;
  $(c).unbind();
  $(c).bind('mousedown', function (e) { that.touchStart(e); });
  $(c).bind('mousemove', function (e) { that.touchDrag(e); });
  $(c).bind('mouseup', function (e) { that.touchEnd(e); });
  this.currentPointIndex = -1;
  this.imgWarper = new ImgWarper.Warper(c, image, imgData);
};

ImgWarper.PointDefiner.prototype.enableClick = function(enabled) {
  this.enabledClick = enabled;
}

ImgWarper.PointDefiner.prototype.setReferencePoints = function(points) {
  this.referencePoints = points;
}

ImgWarper.PointDefiner.prototype.touchStart = function(e) {
  if ( !this.enabledClick ) 
    return;
  var warper = this;
  warper.dragging_ = true;
  e.preventDefault();
 // var startX = (e.offsetX || e.clientX - $(e.target).offset().left);
 // var startY = (e.offsetY || e.clientY - $(e.target).offset().top);
  var offset = $(e.target).offset();
  var startX = e.pageX - offset.left;
  var startY = e.pageY - offset.top; 

  var q = new ImgWarper.Point(startX , startY );
  var fixedQ = null;

  var pointIndex = warper.getCurrentPointIndex(q);  
  if (e.shiftKey) {
    if (pointIndex >= 0) {
      warper.deletePoint(pointIndex);
    }
  } else {
    if (pointIndex < 0) {
        warper.triggerEvent("beforeAddPoint");
        var potentialCandidate = warper.getReferencedPeak(e.pageX,e.pageY);
        
        if ( potentialCandidate == null || potentialCandidate == undefined) 
          return;
        var distance = Math.abs(potentialCandidate.left+ this.pointMarginLeft - e.pageX) +  Math.abs(potentialCandidate.top + this.pointMarginTop - e.pageY); 
        var endX = potentialCandidate.left - offset.left;
        var endY = potentialCandidate.top - offset.top;
        if (distance < this.snapThreshold ){
          warper.refPeakCandidate = potentialCandidate;
          warper.refPeakCandidate.matched = true;
          fixedQ = new ImgWarper.Point(endX + this.pointMarginLeft, endY + this.pointMarginTop, false, warper.refPeakCandidate.id);
        }
        else{
         fixedQ = new ImgWarper.Point(startX, startY, false, null); 
        }
        warper.dstPoints.push(fixedQ);
        if (warper.oriPoints.length == warper.originalAuxPointsNumber){
          warper.oriPoints.push(fixedQ);
        }
        else{
          if (ImgWarper.ptMatrix) {
            var ind = parseInt(Math.round(startY) * ImgWarper.ptMatrixWidth + Math.round(startX));
            if (ImgWarper.ptMatrix[ind]) {
              var base = ImgWarper.ptMatrix[ind];
              if (base == -1) return;
              startY = Math.floor(base / ImgWarper.ptMatrixWidth);
              startX = base - (startY * ImgWarper.ptMatrixWidth);
              q = new ImgWarper.Point(startX, startY);
            }
          }

          warper.oriPoints.push(q);
        }
        warper.currentPointIndex = warper.getCurrentPointIndex(fixedQ);
        warper.triggerEvent("afterAddPoint");
    }
    else
      warper.currentPointIndex = warper.getCurrentPointIndex(q);
    
    var matchedPeak = warper.dstPoints[warper.currentPointIndex].matchingPeak; 
    if ( matchedPeak != null){
      _(warper.referencePoints).find(function  (d,i) {
        return d.id == matchedPeak;
      }).matched = false;
    }
  }
  warper.redraw();
};

ImgWarper.PointDefiner.prototype.touchDrag = function(e) {
  if (!this.enabledClick || this.referencePoints.length == 0 || this.computing_ || !this.dragging_ || this.currentPointIndex <= this.originalAuxPointsNumber) {
    return;
  }
  this.computing_ = true;
  e.preventDefault();
  // var endX = (e.offsetX || e.clientX - $(e.target).offset().left);
  // var endY = (e.offsetY || e.clientY - $(e.target).offset().top);

  var offset = $(e.target).offset();
  var potentialCandidate = this.getReferencedPeak(e.pageX,e.pageY)
  
  if ( potentialCandidate != null && potentialCandidate != undefined) {
    var distance = Math.abs(potentialCandidate.left+ this.pointMarginLeft - e.pageX) +  Math.abs(potentialCandidate.top + this.pointMarginTop - e.pageY); 
    var endX,endY,newPoint;
    if (distance < this.snapThreshold ){
      endX = potentialCandidate.left - offset.left;
      endY = potentialCandidate.top - offset.top; 
      newPoint = new ImgWarper.Point(endX + this.pointMarginLeft, endY + this.pointMarginTop, false, potentialCandidate.id);
      this.refPeakCandidate = potentialCandidate;
    }else{
      endX = e.pageX - offset.left;
      endY = e.pageY - offset.top; 
      newPoint = new ImgWarper.Point(endX , endY , false, null);
      this.refPeakCandidate = null;
    }
    
    this.dstPoints[this.currentPointIndex] = newPoint;
    this.redraw();
  }
  this.computing_ = false;
};

ImgWarper.PointDefiner.prototype.touchEnd = function(event) {
  if ( !this.enabledClick || this.dragging_ == false) 
    return;

  this.dragging_ = false;
  if ( this.refPeakCandidate != null ){
    this.refPeakCandidate.matched = true;
  }
  else{
    this.oriPoints.splice(this.currentPointIndex, 1);
    _(this.dstPoints.splice(this.currentPointIndex, 1)).each(function (d,i) {
      var refPoint = _(this.referencePoints).find(function (d2) {
        return d2.id == d.matchingPeak;
      });
      if ( refPoint != null && refPoint != undefined)
        refPoint.matched = false;
    });
  }
  this.refPeakCandidate = null;
  this.redraw();
  this.triggerEvent("afterAddPoint");
}

ImgWarper.PointDefiner.prototype.getReferencedPeak = function (x,y) {
  return _(this.referencePoints).reduce(function(memo,d,i){
      if ( d.matched )
        return memo;

      // check every point with a threshold
      if ( memo != null && Math.abs(memo.left - x) +  Math.abs(memo.top - y) < Math.abs(d.left - x) +  Math.abs(d.top - y))
        return memo;
      else
        return d;
  }, null);
}

ImgWarper.PointDefiner.prototype.redraw = function () {
  if (this.oriPoints.length < this.originalAuxPointsNumber) {
    if (document.getElementById('show-control').checked) {
      this.redrawCanvas();
    }
    return;
  }
  this.imgWarper.warp(this.oriPoints, this.dstPoints, this.useOriginalImage);
  if (document.getElementById('show-control').checked) {
    this.redrawCanvas();
  }
};




ImgWarper.PointDefiner.prototype.getCurrentPointIndex = function(q) {
  var currentPoint = -1;   

  for (var i = 0 ; i< this.dstPoints.length; i++){
    if (this.dstPoints[i].InfintyNormDistanceTo(q) <= 8) {
      currentPoint = i;
      return i;
    }
  }
  return currentPoint;
};

ImgWarper.PointDefiner.prototype.redrawCanvas = function(points) {
  var ctx = this.canvas.getContext("2d");
  for (var i = 0; i < this.oriPoints.length; i++){
    if (i < this.dstPoints.length) {
      if ( i == this.originalAuxPointsNumber)
        this.drawOnePoint(this.dstPoints[i], ctx, this.fixedPointColor);
      else if (i == this.currentPointIndex) {
        if ( this.dstPoints[i].matchingPeak == null)
          this.drawOnePoint(this.dstPoints[i], ctx, this.unavailablePointColor);
        else
          this.drawOnePoint(this.dstPoints[i], ctx, this.selectedPointColor);
      } else {
        this.drawOnePoint(this.dstPoints[i], ctx, this.pointColor);
      }

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.moveTo(this.oriPoints[i].x, this.oriPoints[i].y);
      ctx.lineTo(this.dstPoints[i].x , this.dstPoints[i].y);
      //ctx.strokeStyle = '#691C50';
      ctx.stroke();
    } else {
      this.drawOnePoint(this.oriPoints[i], ctx, this.oriPointColor);
    }
  } 
  ctx.stroke();
};

ImgWarper.PointDefiner.prototype.deleteAllPoints = function(pointIndex){
  this.deletePoint(this.originalAuxPointsNumber);
}

ImgWarper.PointDefiner.prototype.deletePoint = function(pointIndex){
  var warper = this;
  var deletedPeaksNum = 1;
  if ( pointIndex == warper.originalAuxPointsNumber)
    deletedPeaksNum = warper.oriPoints.length - warper.originalAuxPointsNumber;
  warper.oriPoints.splice(pointIndex, deletedPeaksNum);


  _(warper.dstPoints.splice(pointIndex, deletedPeaksNum)).each(function (d,i) {
    var refPoint = _(warper.referencePoints).find(function (d2) {
      return d2.id == d.matchingPeak;
    });
    if ( refPoint != null && refPoint != undefined)
      refPoint.matched = false;
  });
  warper.dragging_ = false;
  warper.currentPointIndex = -1;
  warper.triggerEvent("afterRemovePoint");
};

ImgWarper.PointDefiner.prototype.drawOnePoint = function(point, ctx, color) {
  var radius = 6; 
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.arc(parseInt(point.x), parseInt(point.y), radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.arc(parseInt(point.x), parseInt(point.y), 3, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill(); 
};

ImgWarper.PointDefiner.prototype.on = function(event, callback) {
  this[event] = callback;
}

ImgWarper.PointDefiner.prototype.triggerEvent = function(event) {
  if (this[event] != undefined)
    this[event]();
}
