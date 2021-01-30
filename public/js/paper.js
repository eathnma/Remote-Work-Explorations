paper.install(window);

var lefthand = './img/lefthand.svg'
var righthand = './img/righthand.svg'
var theirhand
var yourhand

project.importSVG(righthand, function(item){
    theirhand = item
    theirhand.expandShapes = true
    theirhand.scale(3)
    theirhand.position = view.center
});

project.importSVG(lefthand, function(item){
    yourhand = item
    yourhand.expandShapes = true
    yourhand.scale(3)
    yourhand.position = view.center
});

function onMouseMove(event) {
	yourhand.position = event.point;
    
    for (var i = 0; i < theirhand.children.length; i++) {
        for (var j = 0; j < yourhand.children.length; j++) {
            showIntersections(yourhand.children[j], theirhand.children[i])
        }
    }
}

function showIntersections(path1, path2) {
    var intersections = path1.getIntersections(path2);
    if (intersections != null) {
        console.log("hello");
    }
    for (var i = 0; i < intersections.length; i++) {
        new Path.Circle({
            center: intersections[i].point,
            radius: 5,
            fillColor: '#009dec'
        }).removeOnMove();
    }
}