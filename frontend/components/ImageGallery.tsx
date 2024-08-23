import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Image, { ImageProps } from "next/image";

export default function ImageGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [images, setImages] = useState<ImageProps[]>([]);
  
    useEffect(() => {
      // Initialize image data
      setImages([
        { src: "/uploads/2axwu852f99.png", alt: "Image 1" },
        { src: "/uploads/2axwu852f99.png", alt: "Image 1" },

        { src: "/uploads/2axwu852f99.png", alt: "Image 1" },

        // Add other images here...
      ]);
    }, []);
  
  const handleNext = () => {
      const nextIndex =
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
      setSelectedImage(images[nextIndex].src as string);
      setSelectedIndex(nextIndex);
    };
  
    const handlePrev = () => {
      const prevIndex =
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
      setSelectedImage(images[prevIndex].src as string);
      setSelectedIndex(prevIndex);
    };
    function handleCloseModal(): void {
        console.log("close");
        setSelectedImage("");
        setSelectedIndex(0);
    }

    const handleOnClicked = (src: string, index: number) => {
        setSelectedImage(src);
        setSelectedIndex(index);
      };

    return (
        <div className="flex flex-wrap justify-center w-3/5 mx-auto">
          {images.map((image, index) => (
            <div key={index} className="w-1/3 p-2 " style={{ maxWidth: "320px" }}>
              <Image
                {...image}
                width={320}
                height={200}
                priority
                className=" border-4 border-solid border-purple-800 hover:border-purple-500"
                onClick={() => handleOnClicked(image.src as string, index)}
              />
            </div>
          ))}
    
          {selectedImage && (
            <ModalComponent
              images={images}
              selectedImage={selectedImage}
              onClose={handleCloseModal}
              onNext={handleNext}
              onPrev={handlePrev}
              selectedIndex={selectedIndex}
            />
          )}
        </div>
      );
    };  