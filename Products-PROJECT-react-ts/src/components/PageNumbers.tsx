interface Props {
  page: number; // მიმდინარე გვერდი
  totalPages: number; // სულ გვერდები
  onPageClick: (n: number) => void; 
}

export const PageNumbers = ({ page, totalPages, onPageClick } : Props)=>{
  const getVisiblePages = (): (number | '...')[] =>{
    const total = totalPages;
    const current = page;

    //თუ სულ ცოტა გვერდია (≤7), ყველა ;
    if(total <=7 ){
      return Array.from({ length: total },(_, i) => i + 1);
    }

    //თავიდან ახლოს (1-3)
    if(current <= 3){
      return [1, 2, 3, 4, '...', total];
    }

    //ბოლოსთან ახლოს
    if(current >= total - 2){
      return [1, '...', total - 3, total - 2, total - 1, total];
    }

    // შუაში ვართ — ორივე მხრიდან "..." //
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  const pages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      {pages.map((item,index) => item === '...' ? (
          <span key={`dots-${index}`} className="px-1 text-xs text-gray-400 select-none">
            …
          </span>
        ) : (
          <button key={item} type="button" onClick={()=>onPageClick(item)}
            className={`min-w-[30px] h-[30px] px-2 rounded-full text-xs font-medium transition cursor-pointer ${
              item === page ? 'bg-green-600 text-white' 
              : 'border border-gray-300 text-gray-700 hover:bg-gray-200'}`}>
            {item}
          </button>
        )
      )}
    </div>
  );
};