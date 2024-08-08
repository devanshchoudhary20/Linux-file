import React, {useState} from 'react'
import ImageData from '../../RawData/GalleryData'
import './Gallery.css'

const Gallery = () => {

  const [currentImage,setCurrentImage] = useState(ImageData[0].image)
  const [currentImageID,setcurrentImageID] =useState(ImageData[0].id)

  const handleImageClick = (id) => {
    console.log(id);
    setCurrentImage(ImageData[id-1].image);
    setcurrentImageID(id)
  }

  const nextImage = () => {
    
    if(currentImageID === ImageData.length) 
      {
        setCurrentImage(ImageData[0].image);
        setcurrentImageID(ImageData[0].id)
      }
      else{setCurrentImage(ImageData[currentImageID].image);
        setcurrentImageID(ImageData[currentImageID].id);
      }
    
  }

  const prevImage = () => {
    if(currentImageID === 1) {
      setCurrentImage(ImageData[ImageData.length-1].image);
      setcurrentImageID(ImageData[ImageData.length-1].id);
    }
    else
    {setCurrentImage(ImageData[currentImageID-2].image);
    setcurrentImageID(ImageData[currentImageID-2].id);}
  }


  return (
    <div>
      <div className="gallery-container">
        <div className="viewed">
            <img src= {currentImage} alt="" className="viewed-image" />
        </div>
        <div className="thumbnail-image">
          <div className="previous" onClick={prevImage}>
            <img src="./prev.png" alt="" className="previous-icon" />
          </div>
          <div className="image-carousel">
            {
              ImageData
              .map((item) => {
                return (
                <div className="image-container">
                  <img src={item.image} alt={item.alt} className='image' key={item.id} onClick={() => handleImageClick(item.id)} loading="lazy"/>
                </div>
                )
              })
            }
          </div>
          <div className="next" onClick={nextImage}>
            <img src="./next.png" alt="" className="next-icon"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery