import { useEffect, useState } from 'react';

const LIMIT = 10;

interface UsePageControllerReturn{
  skip: number; 
  page: number;
  totalPages: number;
  handleNext:()=>void;
  handlePrevious:()=>void;
  goToPage: (pageNumber:number)=>void;  
}

export const usePageController = (
  category: string,
  total: number) : UsePageControllerReturn =>{
  const [skip, setSkip] = useState(0);

  const totalPages = Math.ceil(total / LIMIT);
  const page = Math.floor(skip / LIMIT) + 1;

  //კატეგორიის შეცვლისას პირველ გვერდზე გადასვლა
  useEffect(()=>{
    setSkip(0);
  }, [category]);

  // Next — (0 → 10 → 20 ...)
  const handleNext =()=>{
    if(skip + LIMIT < total) setSkip(skip + LIMIT);
  };

  // Previous — (20 → 10 → 0)
  const handlePrevious =()=>{
    if(skip - LIMIT >= 0) setSkip(skip - LIMIT);
  };

  const goToPage = (pageNumber:number)=>{
    if(pageNumber < 1 || pageNumber > totalPages) return;  
    setSkip((pageNumber - 1) * LIMIT); // გვერდი 5 → skip = 40
  };

  return { skip, page, totalPages, handleNext, handlePrevious, goToPage};
};