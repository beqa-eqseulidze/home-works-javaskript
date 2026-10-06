import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { saveUserProduct } from './storage';

interface FormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  thumbnail: string;
}

interface Props {
  onSuccess: (message: string) => void;  
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if(!values.title || !values.title.trim()) {
    errors.title = 'title required';
  }

  if(!values.description || !values.description.trim()) {
    errors.description = 'description required';
  }

  if(!values.category){
    errors.category = 'choose category';
  }

  const priceStr = String(values.price ?? '').trim();
  if (!priceStr) {
    errors.price = 'price required';
  } else if (isNaN(Number(priceStr)) || Number(priceStr) <= 0) {
    errors.price = 'price must be a positive number';
  }

  const thumb = values.thumbnail?.trim() ?? '';
  if (!thumb) {
    errors.thumbnail = 'photo link required';
  } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(thumb)) {
    errors.thumbnail = 'must be an image URL (jpg, png, webp, gif, svg)';
  }

  return errors;
};

export const AddProduct = ({ onSuccess }: Props) => {
  const navigate = useNavigate();

  const initialValues: FormValues={
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: '',
  };

  // form send
  const handleSubmit = (values: FormValues) => {
    saveUserProduct({
      id: Date.now(),
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      price: Number(values.price),
      thumbnail: values.thumbnail.trim(),
    });

    onSuccess('Product added');  
    navigate('/');
  };

  const handleClose=()=>{
    navigate('/');
  };

  return(
    <div className="max-w-6xl mx-auto px-5 pt-5 pb-4">
      <div className="bg-white w-full max-w-lg mx-auto shadow-sm border border-gray-200">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-900">New product</h2>
          <button type="button" onClick={handleClose}
            className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting })=>(
            <Form className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Title
                </label>
                <Field name="title" type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-emerald-500"
                  placeholder="title" />
                <ErrorMessage name="title" component="p" className="text-xs text-red-500 mt-1" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Descroption
                </label>
                <Field as="textarea" name="description" rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-emerald-500 resize-none"
                  placeholder="product description"/>
                <ErrorMessage name="description" component="p" className="text-xs text-red-500 mt-1"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Category 
                </label>
                <Field as="select" name="category"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none bg-white">
                  <option value="">choose category</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="mens-shirts">Mens-Shirts</option>
                  <option value="beauty">Beauty</option>
                  <option value="home-decoration">Home-Decoration</option>
                  <option value="sports-accessories">Sports</option>
                </Field>
                <ErrorMessage name="category" component="p" className="text-xs text-red-500 mt-1"/>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Price
                </label>
                <Field name="price" type="number" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-emerald-500"
                  placeholder="product price"/>
                <ErrorMessage name="price" component="p" className="text-xs text-red-500 mt-1"/>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Image link 
                </label>
                <Field name="thumbnail" type="text"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-emerald-500"
                  placeholder="https://example.com/image.jpg"/>
                <ErrorMessage name="thumbnail" component="p" className="text-xs text-red-500 mt-1"/>
              </div>

              {/* buttons*/}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button type="button" onClick={handleClose}
                  className="px-4 py-2 text-xs cursor-pointer font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition" >
                  Close
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="px-4 py-2 text-xs cursor-pointer font-medium bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};