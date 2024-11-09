import Image from "next/image";
import Spinner from "@/components/ui/Spinner";
import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductImagesCarouselProps {
  images: ImageResponsePayload[];
}

export default function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="flex w-full items-center p-4 md:p-0">
      {images.length > 0 ? (
        <Carousel.Root align="center" loop={true} slidesPerView={3} orientation="horizontal" spacing="12px" className="w-full">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="relative h-[300px] w-full">
              <Image
                src={images[imageIndex].url}
                alt={`Slide`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="h-[300px] w-full rounded-lg shadow-lg object-contain"
              />
              <Carousel.Control className="absolute top-1/2 flex w-full justify-between px-2">
                <Carousel.PrevTrigger>
                  <span
                    className="flex items-center justify-center rounded-full bg-secondary p-1"
                    onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft size={20} color="white" />
                  </span>
                </Carousel.PrevTrigger>
                <Carousel.NextTrigger>
                  <span
                    className="flex items-center justify-center rounded-full bg-secondary p-1"
                    onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
                  >
                    <ChevronRight size={20} color="white" />
                  </span>
                </Carousel.NextTrigger>
              </Carousel.Control>
            </div>
            <Carousel.Viewport className="w-[270px]">
              <Carousel.ItemGroup className="flex flex-wrap items-center justify-center">
                {images.map((image, index) => (
                  <Carousel.Item key={index} index={index}>
                    <div className="relative">
                      <Image
                        src={image.url}
                        alt={`Slide ${index}`}
                        width={90}
                        height={60}
                        className={`h-[60px] w-[90px] cursor-pointer rounded-md shadow-md transition-all ${
                          imageIndex === index
                            ? "border-2 border-black shadow-lg"
                            : "border-2 border-gray-300 opacity-50"
                        }`}
                        onClick={() => setImageIndex(index)}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
            </Carousel.Viewport>
          </div>
        </Carousel.Root>
      ) : (
        <Spinner size={40} color="black" />
      )}
    </div>
  );
}
