paper.install(window);

var pathData1 = 'M835.5,674.5c0,0-8.1-17-9-35c-2-23,3-35,3-35 M776.5,624.5c21,0,31.5,1.5,43-10c10-10,31.7-31.3,43-42c17-16,27-27,33-46s26-57,25-81s0-33,2-49s-4-23-15-21s-29,32-33,44s-1,29-1,29s-11.9,10.1-18,21c-9,16-9,31-9,31 M877.5,411.5c-5-49.6-5-50.8-6-83c-1-32-4-45-4-74s-2-60-22-59s-21,36-21,46s2,11,2,15s-4,21-2,34s0,17-1,23s-3,21-2,39s2,24-5,23 M829.5,210.5c0,0,2-25-13-30s-22.5,11.1-27,36c-4,22,0,29,0,34s-8,23-8,56c0,22-5,24-5,42s6,27-14,27 M790.8,209.8c0,0-0.3-17.3-14.3-17.3c-15,0-22,26-25,41s3,26.3,0,33c-4,9-9.9,23-9,41c1,21-5,12.9-5,39c0,24,2.7,32.4-10,38c-9,4-12,5-12,5 M750.9,247.9c0,0-13.4-2.4-20.4,5.6s-19,33-21,45c-1.7,9.9,0,19-5,26s-18,39-19,55s1.8,9.4-6,25c-6,12-21,51-25,95s-4.8,86.5,12,102c13,12,17,13,17,13 M683.5,674.5c0,0-2-4-7-26s-3-27-11.6-48.6 M717.5,311.5c6,3,14,3,14,3 M773.6,268.8c0,0-5.4-3.5-14.2-1.5M810.6,250.8c0,0-5.4-3.5-14.2-1.5 M850.5,263.5c0,0-7-5-17.1-1.7 M850.5,319.5c0,0-9-3-17-1 M830.5,328.4c6.3,3.6,13.5,4.5,18.9,3.6c3.1-0.5,5.4-1.8,5.4-1.8 M790.5,317.5c4.4,2.2,12.9,2.8,20,1 M766.5,315.5c0,0-8-2-16-1 M748.5,322.5c9.4,5.3,22.2,1.8,20.5,1.8 M873.5,448.5c2,10,8,13,8,13 M849.7,482.9c0,0-15.2-0.4-26.2,10.6 M840.5,464.5c6,5,14.1,6.7,14.1,6.7M694.5,452.5c27-4,46.9-0.4,85-9c31-7,41-24,41-24 M814.5,455.5c-48.4,13.1-60,48-68,80';


var yourhand = new CompoundPath(pathData1);
yourhand.strokeColor = 'black';
yourhand.fillColor = null;
yourhand.strokeWidth = 2;
yourhand.strokeCap = 'round';
yourhand.position = view.center;
yourhand.scale(0.6);
yourhand.rotate(-90);


var values = {
	friction: 0.99,
	timeStep: 0.001,
	amount: 2,
	mass: 2,
	count: 0
};

values.invMass = 1 / values.mass;

var path, springs;
var size = view.size * 0.5;

var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 80;
	this.strength = strength ? strength : 0.55;
	this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
	var delta = this.b - this.a;
	var dist = delta.length;
	var normDistStrength = (dist - this.restLength) /
			(dist * this.mamb) * this.strength;
	delta.y *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.y += delta.y;
	if (!this.b.fixed)
		this.b.y -= delta.y;
};

function createPath(strength) {
	var path = new Path({
        strokeColor: 'black'
    });
    path.strokeWidth = 120;
	springs = [];
	for (var i = 0; i <= values.amount; i++) {
		var segment = path.add(new Point(i / values.amount, 0.5) * size);
		var point = segment.point;

		if (i == 0 || i == values.amount)
			point.y += size.height;
		point.px = point.x;
		point.py = point.y;
		// The first two and last two points are fixed:
		point.fixed = i < 1;
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}
//	path.position.x = 0;
//    path.position.x -= size.width / 4;
	return path;
}


function onResize() {
	if (path)
		path.remove();
	size = view.bounds.size * [2, 1];
	path = createPath(0.1);
}

var lastMousePosition = view.center;

function onMouseMove(event) {
    lastMousePosition = new Point(event.point);
}

var lastRotation = 0;

function onFrame(event) {
    var rotation = path.segments[1].point.angle;
    yourhand.rotate(rotation - lastRotation);
    lastRotation = rotation;
    path.firstSegment.point = lastMousePosition;
    yourhand.position = lastMousePosition + new Point(-100, -60);
	updateWave(path);
}

function updateWave(path) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = path.segments.length; i < l; i++) {
		var point = path.segments[i].point;
		var dy = (point.y - point.py) * force;
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
	path.smooth({ type: 'continuous' });

}


function onKeyDown(event) {
	if (event.key == 'space') {
		path.fullySelected = !path.fullySelected;
		path.fillColor = path.fullySelected ? null : 'black';
	}
}