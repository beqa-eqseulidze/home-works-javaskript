export default function Card({ title, description, border, icon }) {
  return(
    //თავზე border...//
    <div className={`bg-white p-8 rounded-lg shadow-2xl border-t-8 
    ${border} flex flex-col justify-between relative`}>
      <div>
        {/* სათაური.. */}
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        {/* აღწერა.. */}
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
      {/* logo.. */}
      <div className="mt-10 flex justify-end">
        <img src={icon} className="w-18 h-17 object-contain"/>
      </div>
    </div>
  );
}