import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { CardFormValues } from '../types/card';

interface CardFormProps {
  onValuesChange: (values: CardFormValues) => void;
  onSubmitSuccess: () => void;
}

// Yup ვალიდაციის სქემა
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Can't be empty"),

  number: Yup.string()
    .required("Can't be empty")
    .test('min-length', 'Wrong format, numbers only', (val) => {
      if (!val) return false;
      return val.replace(/\s/g, '').length === 16;
    }),

  expMonth: Yup.string()
    .required("Can't be empty")
    .test('valid-month', 'Invalid month', (val) => {
      if (!val) return false;
      const num = Number(val);
      return num >= 1 && num <= 12;
    }),

  expYear: Yup.string()
    .required("Can't be empty")
    .test('valid-year', "Can't be empty", (val) => {
      if (!val) return false;
      return val.trim().length === 2;
    }),

  cvc: Yup.string()
    .required("Can't be empty")
    .test('valid-cvc', 'Must be 3 digits', (val) => {
      if (!val) return false;
      return val.length === 3;
    }),
});

export const CardForm: React.FC<CardFormProps> = ({ onValuesChange, onSubmitSuccess }) => {
  const formik = useFormik<CardFormValues>({
    initialValues: {
      name: '',
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: () => {
      onSubmitSuccess();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'name') {
      // ციფრებს და  სიმბოლოებს არ ვუშვებთ.
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'number') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '\$1 ')
        .trim()
        .slice(0, 19);
    } else if (name === 'expMonth' || name === 'expYear') {
      // მაქსიმუმ 2 ციფრი
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
    } else if (name === 'cvc') {
      // მაქსიმუმ 3 ციფრი
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    formik.setFieldValue(name, formattedValue);

    onValuesChange({
      ...formik.values,
      [name]: formattedValue,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" className="w-full max-w-[560px] space-y-5">

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold tracking-widest text-slate-800 uppercase">
          Cardholder Name
        </label>
        <input type="text" name="name" autoComplete="off" placeholder="e.g. Felicia Leire" value={formik.values.name} onChange={handleInputChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-all ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
        {formik.touched.name && formik.errors.name && (
          <span className="text-xs text-red-500 font-medium">
            {formik.errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold tracking-widest text-slate-800 uppercase">
          Card Number
        </label>
        <input type="text" name="number" autoComplete="off" placeholder="e.g. 9591 6489 6389 101E" value={formik.values.number} onChange={handleInputChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-all ${formik.touched.number && formik.errors.number ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
        {formik.touched.number && formik.errors.number && (
          <span className="text-xs text-red-500 font-medium">
            {formik.errors.number}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-1.5 w-1/2">
          <label className="text-xs font-semibold tracking-widest text-slate-800 uppercase">
            Exp. Date (MM/YY)
          </label>
          <div className="flex gap-2">
            <input type="text" name="expMonth" autoComplete="off" placeholder="09" value={formik.values.expMonth} onChange={handleInputChange} onBlur={formik.handleBlur} className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm text-center ${formik.touched.expMonth && formik.errors.expMonth ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
            <input type="text" name="expYear" autoComplete="off" placeholder="YY" value={formik.values.expYear} onChange={handleInputChange} onBlur={formik.handleBlur} className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm text-center ${formik.touched.expYear && formik.errors.expYear ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
          </div>
          {((formik.touched.expMonth && formik.errors.expMonth) ||
            (formik.touched.expYear && formik.errors.expYear)) && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.expMonth || formik.errors.expYear}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 w-1/2">
          <label className="text-xs font-semibold tracking-widest text-slate-800 uppercase">
            CVC
          </label>
          <input type="text" name="cvc" autoComplete="off" placeholder="e.g. 123" value={formik.values.cvc} onChange={handleInputChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm ${formik.touched.cvc && formik.errors.cvc ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
          {formik.touched.cvc && formik.errors.cvc && (
            <span className="text-xs text-red-500 font-medium">
              {formik.errors.cvc}
            </span>
          )}
        </div>
      </div>

      <button type="submit" className="w-full bg-purple-800 hover:bg-purple-900 text-white py-3.5 rounded-lg font-medium transition-colors cursor-pointer">
        Confirm
      </button>
    </form>
  );
};