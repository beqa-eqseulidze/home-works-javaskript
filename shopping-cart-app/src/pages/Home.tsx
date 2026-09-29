import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-5xl font-extrabold text-black mb-6">
                მოგესალმებით Aromelle ში
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-8">
                აღმოაჩინეთ ყველაფერი, რაც გიყვართ და გსურთ — მარტივი დათვალიერებითა და კომფორტული შოპინგით.
            </p>
            <Link
                to="/products"
                className="inline-block bg-black hover:bg-zinc-800 text-white font-medium px-8 py-3.5 rounded-lg transition-all"
            >
                აღმოაჩინე პროდუქტები
            </Link>
        </div>
    );
}