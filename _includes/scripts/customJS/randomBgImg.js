const bg = document.querySelector(".random_BG");

const bgList = [
    "https://user-images.githubusercontent.com/59393359/74718667-0adb8a80-5276-11ea-8bc3-0e36c67cf28a.jpg",
    "/larvine/assets/images/bgImg/flower04.jpg",
    "/larvine/assets/images/bgImg/fox.jpg",
    "/larvine/assets/images/bgImg/leaves.png",
    "/larvine/assets/images/bgImg/mountain01.jpg",
    "/larvine/assets/images/bgImg/neurons.jpg",
    "/larvine/assets/images/bgImg/nike.jpg",
    "/larvine/assets/images/bgImg/painting.jpg",
    "/larvine/assets/images/bgImg/painting01.jpg",
    "/larvine/assets/images/bgImg/rabbit.jpg",
    "/larvine/assets/images/bgImg/road.jpg",
    "/larvine/assets/images/bgImg/room.jpg",
    "/larvine/assets/images/bgImg/room01.jpg",
    "/larvine/assets/images/bgImg/room02.jpg",
    "/larvine/assets/images/bgImg/sunrise.jpg",
    "/larvine/assets/images/bgImg/sunset.jpg",
];

const randNum = Math.floor(Math.random() * bgList.length);

bg.style.backgroundImage = `url(${bgList[randNum]})`;