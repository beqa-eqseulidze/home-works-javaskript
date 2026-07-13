import { RatingCard } from "./RatingCard";
import { ReviewCard } from "./ReviewCard";

export default function App() {
  return (
    <div className="min-h-screen bg-white p-35">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40 mb-7">
          <div>
            <h1 className="text-5xl font-extrabold mb-7 text-indigo-800">
              10,000+ of our users love our products.
            </h1>
            <p className="text-gray-700 font-serif text-lg mt-10 ">
              We only provide great products combined with excellent customer
              service.We only provide great products combined with excellent
              customer service. ent customer service.We only provide great
              products provide great {" "}
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="md:ml-2 font-mono"><RatingCard text="Rated 5 Stars in Reviews" /></div>
            <div className="md:ml-9 font-mono "><RatingCard text="Rated 5 Stars in Report Guru" /></div>
            <div className="md:ml-17 font-mono"><RatingCard text="Rated 5 Stars in BestTech" /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:mt-6">
            <ReviewCard 
              name="Colton Smith" 
              image="/src/assets/image-colton.jpg" 
              text="We needed the same printed design as the one we had ordered a week prior. Customer service is always excellent and very quick turn around." 
              padding="p-10" 
              margin="m-4" 
            />
          </div>
          <div className="md:mt-16">
            <ReviewCard 
              name="Irene Roberts" 
              image="/src/assets/image-irene.jpg" 
              text="Customer service is always excellent and very quick turn around.Customer service is always excellent and very quick turn around." 
              padding="p-11" 
            />
          </div>
          <div className="md:mt-25">
            <ReviewCard 
              name="Anne Wallace" 
              image="/src/assets/image-anne.jpg" 
              text="Put an order with this company and can only praise them. Customer service is always excellent and very quick turn around." 
              padding="p-11" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}