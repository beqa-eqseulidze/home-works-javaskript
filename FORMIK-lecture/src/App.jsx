import { useFormik } from "formik";

export default function App(){

  const formik = useFormik({
    initialValues: {firstName: "", lastName: "", email: "", password: ""},

  validate:(values)=>{
     const errors={};


  if(!values.firstName.trim()){
    errors.firstName = "Firstname required";
   } else if(values.firstName.trim().length < 4){
    errors.firstName = "Minimum 4 character";
   }


  if(!values.lastName.trim()){
    errors.lastName = "Lastname required";
  }else if(values.lastName.trim().length < 5){
    errors.lastName = "Minimum 5 charcter";
  } 

  if(!values.email.trim()){
    errors.email = "Email reqiured";
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())) {
    errors.email = "incorrect email";
  }

  if(!values.password.trim()){
    errors.password = "Password required";
  }else if(values.password.trim().length < 10){
    errors.password = "Minimum 10 character";
  }
  return errors;
},

     onSubmit:(values)=>{
      console.log({
       სახელი: values.firstName,
       გვარი: values.lastName,
       ემაილი: values.email,
       პაროლი: values.password,
     });
   },
  });


  return(
    <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto mt-10 p-6 rounded-xl shadow space-y-5">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Firstname</label>
        <input id="firstName" name="firstName" type="text" placeholder="სახელი" onChange={formik.handleChange} 
        onBlur={formik.handleBlur} value={formik.values.firstName} 
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
        {formik.touched.firstName && formik.errors.firstName && 
        <p className="text-red-600 text-sm mt-1">{formik.errors.firstName}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Lastname</label>
        <input id="lastName" name="lastName" type="text" placeholder="გვარი" onChange={formik.handleChange} 
        onBlur={formik.handleBlur} value={formik.values.lastName} 
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
        {formik.touched.lastName && formik.errors.lastName && 
        <p className="text-red-600 text-sm mt-1">{formik.errors.lastName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input id="email" name="email" type="email" placeholder="ემაილი" onChange={formik.handleChange} 
        onBlur={formik.handleBlur} value={formik.values.email} 
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
        {formik.touched.email && formik.errors.email && 
        <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input id="password" name="password" type="password" placeholder="პაროლი" onChange={formik.handleChange}
         onBlur={formik.handleBlur} value={formik.values.password} 
        className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300" />
        {formik.touched.password && formik.errors.password && 
        <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>}
      </div>

      <button type="submit" className="w-full bg-green-600 hover:bg-green-500 cursor-pointer text-white py-2 rounded-lg font-semibold">
        send
        </button>
    </form>
  );
}