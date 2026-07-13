export const RatingCard = ({ text }: { text: string }) => {
  return (
    <div className="bg-pink-50 p-6 w-full max-w-lg rounded-lg flex items-center gap-11 mb-6">
      <div className=" text-lg">⭐⭐⭐⭐⭐</div>
      <span className="font-bold text-indigo-950">{text}</span>
    </div>
  );
};
