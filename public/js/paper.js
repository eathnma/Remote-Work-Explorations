paper.install(window);

// hand drawing
var pathData1 = 'M833.5,670.5c0,0,0-8,0-28c0-24,6-47,6-47 M819.5,608.5c14-7,33.7-24.3,45-35c17-16,25-28,31-47s26-57,25-81s0-33,2-49s-4-23-15-21s-29,32-33,44s-1,29-1,29s-11.9,10.1-18,21c-9,16-9,31-9,31 M877.5,411.5c-5-49.6-5-50.8-6-83c-1-32-4-45-4-74s-2-60-22-59s-21,36-21,46s2,11,2,15s-4,21-2,34s0,17-1,23s-3,21-2,39s2,24-5,23 M829.5,210.5c0,0,2-25-13-30s-22.5,11.1-27,36c-4,22,0,29,0,34s-8,23-8,56c0,22-5,24-5,42s6,27-14,27 M790.8,209.8c0,0-0.3-17.3-14.3-17.3c-15,0-22,26-25,41s3,26.3,0,33c-4,9-9.9,23-9,41c1,21-5,12.9-5,39c0,24,2.7,32.4-10,38c-9,4-12,5-12,5 M750.9,247.9c0,0-13.4-2.4-20.4,5.6s-19,33-21,45c-1.7,9.9,0,19-5,26s-18,39-19,55s1.8,9.4-6,25c-6,12-21,51-25,95s-4.8,86.5,12,102c13,12,17,13,17,13 M677.5,670.5c0,0,0-3,0-22c0-23-3-37-12.6-48.6 M717.5,311.5c6,3,14,3,14,3 M773.6,268.8c0,0-5.4-3.5-14.2-1.5 M810.6,250.8c0,0-5.4-3.5-14.2-1.5 M850.5,263.5c0,0-7-5-17.1-1.7 M850.5,319.5c0,0-9-3-17-1 M830.5,328.4c6.3,3.6,13.5,4.5,18.9,3.6c3.1-0.5,5.4-1.8,5.4-1.8 M790.5,317.5c4.4,2.2,12.9,2.8,20,1 M766.5,315.5c0,0-8-2-16-1 M748.5,322.5c9.4,5.3,22.2,1.8,20.5,1.8M873.5,448.5c2,10,8,13,8,13 M849.7,482.9c0,0-15.2-0.4-26.2,10.6 M840.5,464.5c6,5,14.1,6.7,14.1,6.7 M694.5,452.5c27-4,46.9-0.4,85-9c31-7,41-24,41-24 M814.5,455.5c-48.4,13.1-60,48-68,80 M855,736.5c0,0,0.5-36,0-44.7c-0.7-12.5,0.7-21.2-8.3-21.2c-5.2,0-55.5,4-101.7,4c-33.8,0-65.9-4-74.1-4c-19.5,0-16.7,5-16.7,15s0,32.3,0,51';

// compound path of hand
var yourhand = new CompoundPath(pathData1);
    yourhand.strokeColor = 'black';
    yourhand.fillColor = null;
    yourhand.strokeWidth = 2;
    yourhand.strokeCap = 'round';
    yourhand.position = view.center;
    yourhand.scale(0.6);
    yourhand.rotate(-110);

// some values
var values = {
	friction: 0.99,
	timeStep: 0.001,
	amount: 2,
	mass: 2,
	count: 0
};

values.invMass = 1 / values.mass;

var path, springs;
// does this even work!?!
var size = view.size * 0.5;

// class spring???
var Spring = function(a, b, strength, restLength) {
	this.a = a;
	this.b = b;
	this.restLength = restLength || 80;
	this.strength = strength ? strength : 0.55;
	this.mamb = values.invMass * values.invMass;
};

// prototype spring???
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
    //create arm
	var arm = new Path({
        strokeColor: 'black'
    });
    arm.strokeWidth = 170;
    
	springs = [];
    
	for (var i = 0; i <= values.amount; i++) {
		var segment = arm.add(new Point(i / values.amount, 0.5) * size);
		var point = segment.point;
        
		if (i == 0 || i == values.amount)
			point.y += size.height;
		point.px = point.x;
		point.py = point.y;
        
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

var lastRotation = 0;
var rightMiddle = yourhand.bounds.bottomRight / 2; //centre of rotation

function onFrame(event) {
    //rotate hand to match arm
    var rotation = path.segments[1].point.angle;
    yourhand.rotate(1.5*(rotation - lastRotation), rightMiddle);
    lastRotation = rotation;
    
    //attach arm to wrist
    path.firstSegment.point = yourhand.firstSegment.point + new Point(10, 50);
    
    //move hand
    yourhand.position = lastMousePosition;
    
    //update noodle arm
	updateWave(path);
}

function updateWave(arm) {
	var force = 1 - values.friction * values.timeStep * values.timeStep;
	for (var i = 0, l = arm.segments.length; i < l; i++) {
		var point = arm.segments[i].point;
		var dy = (point.y - point.py) * force;
		point.py = point.y;
		point.y = Math.max(point.y + dy, 0);
	}

	for (var j = 0, l = springs.length; j < l; j++) {
		springs[j].update();
	}
    
	arm.smooth({ type: 'continuous' });
}