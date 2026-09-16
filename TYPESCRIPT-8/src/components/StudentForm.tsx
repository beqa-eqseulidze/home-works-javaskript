import { useState, useEffect } from 'react';

interface StudentFormProps { onSubmit: (data: { name: string; course: string }) => void;  // ფორმის გაგზავნის ფუნქცია (void)
  initialData?: { name: string; course: string };   //რედაქტირების საწყისი მონაცემები
  isEditing?: boolean;
}

const StudentForm = ({ onSubmit, initialData, isEditing }: StudentFormProps) => {
  const [data, setData] = useState(
    initialData || { name: '', course: '' }  
  );

  useEffect(() =>{
    if(initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(data);     
    if(!isEditing) {  
      setData({ name: '', course: '' }); 
    }
  };

  return(
    <div className="bg-white p-6  shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        {isEditing ? (
          //ედითის აიკონი.
          <>
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            რედაქტირება
          </>
        ) : (
          //პლიუსის აიკონი/
          <>
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            სტუდენტის დამატება
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit}> 
        {/* სახელის input */}
        <input type="text" placeholder="სახელი" value={data.name} onChange={(e)=>setData({ ...data, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 font-arial rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>

         {/*კურსები*/}
        <select value={data.course} onChange={(e)=>setData({ ...data, course: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 font-arial  rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" required>
          <option value="" className='font-arial'>აირჩიე კურსი</option>
          <option value="TypeScript" className="font-mono">TypeScript</option>
          <option value="JavaScript" className="font-mono">JavaScript</option>
          <option value="CSS" className="font-mono">CSS</option>
          <option value="React" className="font-mono">React</option>
        </select>

        {/*სტუდენტის განახლების ღილაკი form-მაზე */}
        <button type="submit"className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-arial ">
          {/*როდესაც isEditing */}
          {isEditing ? ( 
            <>
              <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              სტუდენტის განახლება
            </>
          ) : (
            <>
             {/*როდესაც ვამატებთ */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              დამატება
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;