paper.install(window);

var pathData1 = 'M664.9,599.9c9.6,11.6,12.6,25.5,12.6,48.6c0,19,0,22,0,22h156c0,0,0-8,0-28c0-24,7-48,7-48l-21,14c6.3-3.2,13.8-8.4,21.1-14.2c8.9-7.1,17.7-14.9,23.9-20.8c17-16,25-28,31-47s26-57,25-81s0-33,2-49s-4-23-15-21c-8.4,1.5-21.8,21.3-29,35v-2c-5-49.6-6-47.8-7-80c-1-32-4-45-4-74s-2-60-22-59c-10.2,0.5-14.3,8.6-17,19l0.4-2.3c0.8-4.6,0.9-9.2,0.1-13.8c-1.1-6.8-4.2-15.1-12.5-17.9c-12.6-4.2-19.8,6.4-24.5,24.6l-1.1,4.7c0,0-0.3-17.3-14.3-17.3c-15,0-22,26-25,41c-1.9,9.7-0.1,17.8,0.6,24.2l-1.6-4.2c-4.3-6.7-13.7-6.3-19.3-0.7c-0.2,0.2-0.4,0.5-0.7,0.7c-7,8-19,33-21,45c-1.7,9.9,0,19-5,26s-18,39-19,55s1.8,9.4-6,25c-6,12-21,51-25,95s-4.8,86.5,12,102c13,12,17,13,17,13 M750.9,267.9c-4,9-9.2,22.5-8.4,39.6c1,21-5,12.9-5,39c0,24,2.7,32.4-10,38c-9,4-12,5-12,5 M789.5,218.5c-0.9,3.5-1.3,4.9-2,9c-4,22,0,29,0,34s-8,23-8,56c0,22-5,24-5,42s6,27-14,27 M826.5,221.5c-2,10-2,15.1-2,20c0,10,2,11,2,15s-4,21-2,34s0,17-1,23s-3.6,21-2,39c2,22,2,28-8,30 M876.5,415.5c-2.2,4.1-3,6-4,12c-2,12,1,21,1,21s-11.9,10.1-18,21c-9,16-9,31-9,31 M717.5,311.5c6,3,14,3,14,3M773.6,268.8c0,0-5.4-3.5-14.2-1.5 M810.6,250.8c0,0-5.4-3.5-14.2-1.5 M850.5,263.5c0,0-7-5-17.1-1.7 M851.5,319.5c0,0-9-3-17-1M830.5,328.4c6.3,3.6,13.5,4.5,18.9,3.6c3.1-0.5,5.4-1.8,5.4-1.8 M790.5,317.5c4.4,2.2,12.9,2.8,20,1 M765.5,313.5c0,0-5-2-13-1M748.5,322.5c7,5,18,3,20.5,1.8 M878.5,453.5c5,7,13,7,13,7 M849.7,482.9c0,0-15.2-0.4-26.2,10.6 M840.5,464.5c6,5,14.1,6.7,14.1,6.7 M694.5,452.5c27-4,46.9-0.4,85-9c31-7,41-24,41-24 M814.5,455.5c-48.4,13.1-60,48-68,80 M855.5,736.5c0,0,0-36.2,0-45c0-12,0-21,0-21c-5.2,0-64.8,0-111,0c-33.8,0-90,0-90,0c0,1,0,10,0,20s0,27.3,0,46';

var yourhand = new CompoundPath(pathData1);
yourhand.strokeColor = 'black';
yourhand.fillColor = null;
yourhand.strokeWidth = 2;
yourhand.strokeCap = 'round';
yourhand.position = view.center;
yourhand.scale(0.6);
yourhand.rotate(-85);

var values = {
	friction: 0.99,
	timeStep: 0.001,
	amount: 2,
	mass: 2,
	count: 0
};

values.invMass = 1 / values.mass;

var path, springs;
var size = view.size;

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
	delta.x *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.x += delta.x;
	if (!this.b.fixed)
		this.b.x -= delta.x;
};

function createPath(strength) {
    //create arm
	var arm = new Path({
        strokeColor: 'black'
    });
    arm.strokeWidth = 170;
    
	springs = [];
    
	for (var i = 0; i <= values.amount; i++) {
		var segment = arm.add(new Point(i / values.amount, 1.5) * size);
		var point = segment.point;
        
		if (i == 0 || i == values.amount)
			point.x += size.width;
		point.py = point.y;
		point.px = point.x;
        
		// the first point is fixed
		point.fixed = i < 1;
        //add spring to every segment after the first
		if (i > 0) {
			var spring = new Spring(segment.previous.point, point, strength);
			springs.push(spring);
		}
	}
	return arm;
}

function onResize() {
    //redraw path when window is resized
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
var rightMiddle = yourhand.bounds.bottomRight / 2; //centre of rotation

function onFrame(event) {
    //rotate hand to match arm
    var rotation = path.segments[1].point.angle;
    yourhand.rotate(1.5*(rotation - lastRotation));
    lastRotation = rotation;
    
    //attach arm to wrist
    path.firstSegment.point = yourhand.firstSegment.point + new Point(60, 50);
    
    //move hand
    yourhand.position = lastMousePosition;
    
    //update noodle arm
	updateWave(path);
}

function updateWave(arm) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = arm.segments.length; i < l; i++) {
		var point = arm.segments[i].point;
		var dx = (point.x - point.px) * force;
		point.px = point.x;
		point.x = Math.max(point.x + dx, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
    
	arm.smooth({ type: 'continuous' });
}