paper.install(window);

var lefthand = './img/lefthand.svg'; 
var righthand = './img/righthand.svg'; 
var pathData1 = 'M63.25,50.23c-2-3.13-16.49-2.39-17.77-.2l8-13.67c2.2-3.76,9.1-11.54,9.28-15.89C63.44,3.41,43.84,32,42.17,30.82c-3.8-2.59,17.19-24.38,9.14-29.27-8.73-5.3-15.73,25.69-19.74,23.92-3.47-1.54,11.8-23,3.11-25.35C26.86-2,23.25,23.58,19.47,22.4c.16,0,2.33-31.07-7.77-12.12C6.76,19.55,2.62,33.52.52,43.85c-2.65,13,5.12,23.19,17.7,26.92,9.94,2.95,19.79.74,28.53-4.42C50.74,64,66,56.08,63.25,50.23ZM14.87,41.54A1.79,1.79,0,0,1,14.78,38a1.84,1.84,0,0,1,2,1.16,1.88,1.88,0,0,1-1.91,2.41Zm12,6.15a6.08,6.08,0,0,1-3.57,1.15,6.3,6.3,0,0,1-2.3-.43,5.32,5.32,0,0,1-3.47-4.16.5.5,0,1,1,1-.11,4.32,4.32,0,0,0,2.83,3.33,5.17,5.17,0,0,0,4.85-.57.5.5,0,1,1,.69.73l-.07.05Zm6.63.85A1.79,1.79,0,0,1,33.41,45a1.84,1.84,0,0,1,2,1.16,1.88,1.88,0,0,1-1.92,2.41Z';
var pathData2 = 'M16.83,66.35c8.74,5.16,18.59,7.37,28.53,4.42C57.94,67,65.71,56.85,63.06,43.85,61,33.52,56.82,19.55,51.88,10.28,41.78-8.67,44,22.4,44.11,22.4,40.33,23.58,36.72-2,28.9.12,20.21,2.47,35.48,23.93,32,25.47,28,27.24,21-3.75,12.27,1.55,4.22,6.44,25.21,28.23,21.41,30.82,19.74,32,.14,3.41.82,20.47,1,24.82,7.9,32.6,10.1,36.36L18.1,50c-1.28-2.19-15.77-2.93-17.77.2C-2.42,56.08,12.84,64,16.83,66.35ZM48.07,41.47a1.88,1.88,0,0,1-1.27-2.33h0a1.84,1.84,0,0,1,2-1.16,1.79,1.79,0,0,1-.09,3.57A1.88,1.88,0,0,1,48.07,41.47ZM36.75,47.68l-.07,0a.5.5,0,1,1,.69-.73,5.17,5.17,0,0,0,4.85.57,4.32,4.32,0,0,0,2.83-3.33.5.5,0,0,1,1,.11h0a5.32,5.32,0,0,1-3.47,4.16,6.3,6.3,0,0,1-2.3.43,6.08,6.08,0,0,1-3.57-1.15Zm-6.66.86a1.88,1.88,0,0,1-1.92-2.41,1.84,1.84,0,0,1,2-1.16,1.79,1.79,0,0,1-.09,3.57Z';
var theirhand = new CompoundPath(pathData1);
var yourhand = new CompoundPath(pathData2);
theirhand.fillColor = '#ffd5b3';
yourhand.fillColor = '#775c47';
theirhand.position = view.center;
yourhand.position = view.center;
theirhand.scale(3);
yourhand.scale(3);


function onMouseMove(event) {
	yourhand.position = event.point;
    showIntersections(yourhand, theirhand);
    changeBackground(yourhand, theirhand);
}

function changeBackground(path1, path2){
    var intersections = path1.getIntersections(path2);
    if (intersections.children.length != null) {
        document.body.style.backgroundColor = "red";
    } else {
        document.body.style.backgroundColor = "white";
    }
}

function showIntersections(path1, path2) {
    var intersections = path1.getIntersections(path2);
    for (var i = 0; i < intersections.length; i++) {
        new Path.Circle({
            center: intersections[i].point,
            radius: 5,
            fillColor: '#009dec'
        }).removeOnMove();
    }
}