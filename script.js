'use strict';

Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/user/profile/field/myprofilefield/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/user/profile/field/myprofilefield/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/user/profile/field/myprofilefield/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('/user/profile/field/myprofilefield/weights')]);

// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
    video: true,
};

// Video element where stream will be placed.
const localVideo = document.querySelector('video');

// Local stream that will be reproduced on the video.
let localStream;

// Handles success by adding the MediaStream to the video element.
function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// Initializes media stream.
navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

var video = document.getElementById('camera');

function grabWebCamVideo() {
    console.log('Getting user media (video) ...');
    navigator.mediaDevices.getUserMedia({
        video: true
    })
        .then(gotStream)
        .catch(function(e) {
            alert('getUserMedia() error: ' + e.name);
        });
}

var photo = document.getElementById('photo');
var photoContext = photo.getContext('2d');

function snapPhoto() {
    photoContext.drawImage(video, 0, 0, photo.width, photo.height);
    //show(photo, sendBtn);
}
let value = 1;
video.addEventListener('play',() => {
    const canvas = faceapi.createCanvasFromMedia(video);
    canvas.id = "mycanvas";
    document.getElementById("videoCanvas").append(canvas);
    const displaySize = { width: 640 , height: 480 };
    console.log(displaySize);
    faceapi.matchDimensions(canvas,displaySize);
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(localVideo, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
        const resizeDetections = faceapi.resizeResults(detections,displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
        faceapi.draw.drawDetections(canvas,resizeDetections);
        faceDetectLeftCheek();
    },1000)
    const faceDetectLeftCheek = async () => {
        const landmarks = await faceapi.detectFaceLandmarks(video);
        const landmarkPositions = landmarks.positions

// or get the positions of individual contours,
// only available for 68 point face ladnamrks (FaceLandmarks68)
        const jawOutline = landmarks.getJawOutline()
        const nose = landmarks.getNose()
        const mouth = landmarks.getMouth()
        const leftEye = landmarks.getLeftEye()
        const rightEye = landmarks.getRightEye()
        const leftEyeBbrow = landmarks.getLeftEyeBrow()
        const rightEyeBrow = landmarks.getRightEyeBrow()
        if (value===10)
        {
            return;
        }
        value++;
        console.log(rightEye);
        console.log(leftEye);
    }
})

