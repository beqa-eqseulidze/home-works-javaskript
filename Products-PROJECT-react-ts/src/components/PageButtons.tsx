interface Props {
  page: number;
  totalPages: number;
  onNext: ()=> void;
  onPrev: ()=> void;
}

export const PageButtons = ({ page,totalPages,onNext,onPrev } : Props)=>{
  return(
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-300">
      <button type="button" onClick={onPrev} disabled={page === 1}
        className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-md text-gray-900 font-medium text-xs hover:bg-gray-50 cursor-pointer">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
          Previous
      </button>

      <span className="text-[14px] text-gray-600">
        Page :  <strong className="text-gray-900 text-sm">{page}</strong> /{' '}
        <strong className="text-gray-900 text-sm">{totalPages}</strong>
      </span>

      <button type="button" onClick={onNext} disabled={page === totalPages}
        className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-md font-medium text-xs cursor-pointer" >
          Next
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};