interface IReview {
  name: string;
  image: string;
  text: string;
  padding: string;
  margin?: string;
}

export const ReviewCard = ({ name, image, text, padding, margin = "" } : IReview) =>{
  return(
    <div className={`bg-pink-950 ${padding} ${margin} rounded-xl text-white w-full flex flex-col justify-center`}>
      <div className="flex items-center gap-4 mb-6">
        <img src={image} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-pink-400">Verified Buyer</p>
        </div>
      </div>
      <p className="font-serif">"{text}"</p>
    </div>
  );
};