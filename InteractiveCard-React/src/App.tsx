import { CardFront } from './components/CardFront';
import { CardBack } from './components/CardBack';
import { CardForm } from './components/CardForm';
import { CompletedState } from './components/CompletedState';
import { useCardForm } from './hooks/useCardForm';
import bgMainDesktop from './assets/bg-main-desktop.png';

export default function App() {
  const { formData, isSubmitted, setFormData, handleReset, handleFormSubmit } =
    useCardForm();

  return(
    <main className="min-h-screen w-full flex bg-white">
      <div className="w-[483px] min-h-screen relative flex items-center justify-end bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgMainDesktop})` }}>
            
        <div className="relative w-[540px] h-[520px] translate-x-28">
          <div className="absolute top-0 left-0 z-10 shadow-2xl rounded-xl">
            <CardFront name={formData.name} number={formData.number}
             expMonth={formData.expMonth} expYear={formData.expYear}/>
          </div>

          <div className="absolute bottom-0 right-0 z-0 shadow-2xl rounded-xl">
            <CardBack cvc={formData.cvc} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pl-32 p-12">
        {!isSubmitted ? (
          <CardForm onValuesChange={setFormData} onSubmitSuccess={handleFormSubmit} />
        ) : (
          <CompletedState onReset={handleReset} />
        )}
      </div>
    </main>
  );
}