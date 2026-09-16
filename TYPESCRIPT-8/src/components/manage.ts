import { useState, useEffect } from 'react';

interface IStudent{
  id: string;
  name: string;
  course: string;
}

interface StudentCreate{
  name: string;
  course: string;
}

//=== JSON SERVER ===//
const API_URL='http://localhost:3001/students';

// ყველა სტუდენტის მიღება სერვერიდან -- (GET)
const getAllStudents = async (): Promise<IStudent[]>=>{
  const response = await fetch(API_URL);
  return response.json();
};

// ახალი სტუდენტის დამატება სერვერზე -- (POST) 
const addStudent = async (data: StudentCreate): Promise<IStudent> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// სტუდენტის წაშლა სერვერიდან -- (DELETE)
const deleteStudent = async (id: string): Promise<void> =>{
  await fetch(`${API_URL}/${id}`,{
    method: 'DELETE',
  });
};

// სტუდენტის რედაქტირება სერვერზე -- (PUT)
const updateStudent = async (id: string, data: StudentCreate): Promise<IStudent> =>{
  const response = await fetch(`${API_URL}/${id}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// სტუდენტის ძებნა -- (GET)
const searchStudents = async (query: string): Promise<IStudent[]> => {
  const response = await fetch(`${API_URL}?name_like=${query}`);
  return response.json();
};



// =========================================== React Connect ====================================================

export const Manager =()=>{
  const [students, setStudents] = useState<IStudent[]>([]);
  const [editing, setEditing] = useState<IStudent | null>(null); 

  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  //მესიჯის გამოჩენა... (7 second)
  const showMessage = (text: string)=>{
    setMessage(text);
    setIsVisible(true);
    setTimeout(()=> setIsVisible(false),7000);
  };

  //მესიჯის გამოჩენა... (5 second)
  const showDeleteMessage = (text: string)=>{
    setDeleteMessage(text);
    setIsDeleteVisible(true);
    setTimeout(() => setIsDeleteVisible(false),5000);
  };

  useEffect(()=>{
    const load = async ()=>{
      const data = await getAllStudents();
      setStudents(data);
    };
    load();
  }, []);


  //ახალი სტუდენტის დამატებისას მესიჯი...
  const handleAdd = async (data:StudentCreate)=>{
    try{
      await addStudent(data);
      const updated = await getAllStudents(); 
      setStudents(updated);
      showMessage('სტუდენტი დაემატა');
    } 
    catch{
      showMessage('ERROR');
    }
  };

  //სტუდენტის წაშლის მესიჯი...
  const handleDelete = async (id:string)=>{
    try{
      await deleteStudent(id);
      const updated = await getAllStudents(); 
      setStudents(updated);
      showDeleteMessage('სტუდენტი წაიშალა');
    } 
    catch{
      showDeleteMessage('ERROR');
    }
  };

  //სტუდენტის განახლების მესიჯი...
  const handleUpdate = async (data:StudentCreate)=>{
    if(editing){
      try{
        await updateStudent(editing.id, data);
        const updated = await getAllStudents();
        setStudents(updated);
        setEditing(null); //რედაქტირების რეჟიმის გამორთვა
        showMessage('სტუდენტი წარმატებით განახლდა');
      }
      catch{
        showMessage('ERRROR');
      }
    }
  };

  //სტუდენტის ძებნა 
  const handleSearch = async (query: string)=>{
    if(query.trim() === ''){  //თუ ცარიელია
      const data = await getAllStudents(); //ყველას ვაჩვენებთ..
      setStudents(data);
    }else{ 
      const data = await searchStudents(query);
      setStudents(data); 
    }
  };

  return{
    students,
    editing,
    setEditing,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleSearch,
    message,             // ← დამატების/განახლების მესიჯი
    isVisible,           // ← დამატების/განახლების ხილვადობა
    deleteMessage,       // ← წაშლის მესიჯი
    isDeleteVisible,     // ← წაშლის ხილვადობა
  };
};