import React from 'react';
import OurProductCard from './OurProductCard';

export default function OurProduct() {
  return (
    <div className="m-4 md:mx-[6rem]  text-center font-semibold md:pb-[4rem]">
      <h1 className='text-xl md:text-2xl lg:mb-[2rem] lg:text-[3vw] md:pt-[2rem]'>Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-4  mt-8">
        <OurProductCard imageSrc="/src/Images/personalcare.jpg" title="Personal Care" sub_category="personalcare"/>
        <OurProductCard imageSrc="/src/Images/skincare.jpg" title="Skin Care" sub_category="skincare" />
        <OurProductCard imageSrc="/src/Images/protein_supplements.jpg" title="Protein Powders" sub_category="protein"/>
        <OurProductCard imageSrc="/src/Images/health_and_nutrition.jpg" title="Health Supplements"sub_category="supplements" />
        <OurProductCard imageSrc="/src/Images/womencare.jpg" title="Women Care" sub_category="womencare" />
        <OurProductCard imageSrc="/src/Images/babycare.jpg" title="Baby Care" sub_category="babycare"/>
        <OurProductCard imageSrc="/src/Images/healthdevices.jpg" title="Health Devices" sub_category="healthdevices" />
        <OurProductCard imageSrc="/src/Images/medicines.jpg" title="Medicine" />
      </div>
      {/* <p className="pt-8 md:pt-12 lg:pt-[4rem] text-xl md:text-2xl lg:text-3xl">And Many More ...</p> */}
    </div>
  );
}
