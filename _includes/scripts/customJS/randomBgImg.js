const bg = document.querySelector(".random_BG");

const bgList = [
    "https://user-images.githubusercontent.com/59393359/74718667-0adb8a80-5276-11ea-8bc3-0e36c67cf28a.jpg",
    /assets/images/bgImg/flowers-gfe1c562e6_1280.png,
    /assets/images/bgImg/boho-ga8ba1ae43_1280.jpg,
    /assets/images/bgImg/cat-g26a959701_1280.jpg,
    /assets/images/bgImg/grass-g5c6245bbf_1280.jpg,
    /assets/images/bgImg/moorea-g080fd5e55_1280.jpg,
    /assets/images/bgImg/mountains-g11fedc89a_1280.jpg
];

const randNum = Math.floor(Math.random() * bgList.length);

bg.style.backgroundImage = `url(${bgList[randNum]})`;