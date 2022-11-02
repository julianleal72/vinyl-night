import { useState, useEffect } from "react";

function Banner({neonMode}){

    const imageFlipArr = [
        "./img/Vinyl/1.jpg",
        "./img/Vinyl/2.jpg",
        "./img/Vinyl/3.jpg",
        "./img/Vinyl/4.jpg",
        "./img/Vinyl/5.jpg",
        "./img/Vinyl/6.jpg",
        "./img/Vinyl/8.jpg",
      ];
      const imageFlipArr2 = [
        "./img/Vinyl2/10.jpg",
        "./img/Vinyl2/11.jpg",
        "./img/Vinyl2/12.jpg",
        "./img/Vinyl2/13.jpg",
        "./img/Vinyl2/14.jpg",
        "./img/Vinyl2/15.jpg",
        "./img/Vinyl2/16.jpg",
        "./img/Vinyl2/17.jpg",
        "./img/Vinyl2/18.jpg",
        "./img/Vinyl2/19.jpg",
        "./img/Vinyl2/20.jpg",
        "./img/Vinyl2/21.jpg",
      ];
    const [currentImg, setCurrentImg] = useState(imageFlipArr[0]);

    useEffect(() => {
    if (!neonMode) setCurrentImg(imageFlipArr2[0]);
        setTimeout(
          () => {
            let newIndex = 0;
            if (neonMode) {
              if (
                imageFlipArr.findIndex((element) => element === `${currentImg}`) <
                imageFlipArr.length - 1
              )
                newIndex =
                  imageFlipArr.findIndex((element) => element === `${currentImg}`) +
                  1;
              setCurrentImg(imageFlipArr[newIndex]);
            } else {
              if (
                imageFlipArr2.findIndex((element) => element === `${currentImg}`) <
                imageFlipArr2.length - 1
              )
                newIndex =
                  imageFlipArr2.findIndex(
                    (element) => element === `${currentImg}`
                  ) + 1;
              setCurrentImg(imageFlipArr2[newIndex]);
            }
          },
          neonMode ? 400 : 230
        );
      }, [currentImg, neonMode]);
    

    return(<div>
    <img src={require(`${currentImg}`)} alt="logo" /></div>)
}

export default Banner;