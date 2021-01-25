var lefthand = './img/lefthand.svg'
var righthand = './img/righthand.svg'

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
}
