// Adapted from the following Processing example:
// http://processing.org/learning/topics/follow3.html

// The amount of points in the path:
var points = 25;

// The distance between the points:
var length = 35;

var path = new Path({
	strokeColor: '#E4141B',
	strokeWidth: 20,
	strokeCap: 'round'
});

var start = view.center / [10, 1];

for (var i = 0; i < points; i++)
	path.add(start + new Point(i * length, 0));

function onMouseMove(event) {
	path.firstSegment.point = event.point;
	for (var i = 0; i < points - 1; i++) {
		var segment = path.segments[i];
		var nextSegment = segment.next;
		var vector = segment.point - nextSegment.point;
		vector.length = length;
		nextSegment.point = segment.point - vector;
	}
	path.smooth({ type: 'continuous' });
    
    raster.position = event.point;
}

function onMouseDown(event) {
	path.fullySelected = true;
	path.strokeColor = '#e08285';
}

function onMouseUp(event) {
	path.fullySelected = false;
	path.strokeColor = '#e4141b';
}

var raster = new Raster('hand');
//raster.position = view.center;
raster.scale(0.5);
raster.rotate(45);

if (typeof(Storage) !== "undefined") {
    var area = sessionStorage.getItem("area");
    var xMiddle = sessionStorage.getItem("xMiddle");
    var yMiddle = sessionStorage.getItem("yMiddle");
} else {
   document.getElementById("area").innerHTML = "Sorry, your browser does not support Web Storage...";
   document.getElementById("xMiddle").innerHTML = "Sorry, your browser does not support Web Storage...";
   document.getElementById("yMiddle").innerHTML = "Sorry, your browser does not support Web Storage...";
}

document.getElementById("area").innerHTML = "Area:" + area;
document.getElementById("xMiddle").innerHTML = "xMiddle:" + xMiddle;
document.getElementById("yMiddle").innerHTML = "yMiddle:" + yMiddle;

console.log("Hello world");
console.log("Area:" + area);