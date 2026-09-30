import banner from '../assets/MyBANNER.jpg';

export const Banner = () =>{
  return(
    <div className="max-w-6xl mx-auto px-5 mt-4">
      <div className="rounded-xl overflow-hidden">
        <img src={banner} alt="" className="w-full h-[180px] md:h-[200px] object-cover block"/>
      </div>
    </div>
  );
};