import Header from './components/Header';
import Card from './components/Card';
import { cardDetails } from './info';

export default function App(){
  return(
    <div className="min-h-screen bg-slate-50 py-16 px-4 flex flex-col items-center justify-center font-sans">
      <Header/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center max-w-5xl w-full">
        
        {/*LEFT*/}
        <div className="lg:col-span-1">
          {cardDetails.map(card => card.title === 'Supervisor' ? <Card {...card} /> : null)}
        </div>
        
        {/*CENTER*/}
        <div className="flex flex-col gap-8 lg:col-span-1">
          {cardDetails.map(card => (card.title === 'Team Builder' || card.title === 'Karma') ? <Card {...card} /> : null)}
        </div>

        {/*RIGHT*/}
        <div className="lg:col-span-1">
          {cardDetails.map(card => card.title === 'Calculator' ? <Card {...card} /> : null)}
        </div>

      </div>
    </div>
  );
}