function preloadImage(image: string, folder: string = "images"){
    const img = new Image();
    img.src = `/assets/${folder}/` + image;
}


export {preloadImage}