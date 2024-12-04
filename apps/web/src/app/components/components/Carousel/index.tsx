import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

const CarouselSection: React.FC = () => {
  return (
    <div className="mb-5">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <Image
            src="/images/slide1.jpg"
            alt="Supper Club Parties"
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="w-full h-full"
          />
          <p className="text-center text-xl font-semibold text-white absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-2 rounded">
            Sweaters or Sequins - We've Got Just The Thing
          </p>
        </div>
        <div>
          <Image
            src="/images/slide2.jpg"
            alt="After-Dark Happenings"
            width={800}
            height={400}
            layout="responsive"
            objectFit="cover"
            className="w-full h-full"
          />
          <p className="text-center text-xl font-semibold text-white absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 p-2 rounded">
            After-Dark Happenings
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSection;
