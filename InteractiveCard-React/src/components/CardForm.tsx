import React from 'react';
import { useFormik } from 'formik';
import type { CardFormValues } from '../types/card';

interface CardFormProps {
  onValuesChange: (values: CardFormValues) => void;
  onSubmitSuccess: () => void;
}

export const CardForm: React.FC<CardFormProps> = ({ onValuesChange, onSubmitSuccess }) => {
  const formik = useFormik<CardFormValues>({
    initialValues: {
      name: '',
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
    },
    validate: (values) => {
      const errors: Partial<CardFormValues> = {};

      if (!values.name.trim()) {
        errors.name = "Can't be empty";
      }

      if (!values.number.trim()) {
        errors.number = "Can't be empty";
      } else if (/[^\d\s]/.test(values.number)) {
        errors.number = 'Wrong format, numbers only';
      }

      if (!values.expMonth.trim()) {
        errors.expMonth = "Can't be empty";
      }

      if (!values.expYear.trim()) {
        errors.expYear = "Can't be empty";
      }

      if (!values.cvc.trim()) {
        errors.cvc = "Can't be empty";
      }

      return errors;
    },
    onSubmit: () => {
      onSubmitSuccess();
    },
  });

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '\$1 ')
        .trim()
        .slice(0, 19);
    } else if (name === 'expMonth' || name === 'expYear') {
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
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
        <input type="text" name="name" autoComplete="off" placeholder="e.g. Felicia Leire" value={formik.values.name} onChange={handleCustomChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-all ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
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
        <input type="text" name="number" autoComplete="off" placeholder="e.g. 9591 6489 6389 101E" value={formik.values.number} onChange={handleCustomChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-all ${formik.touched.number && formik.errors.number ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
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
            <input type="text" name="expMonth" autoComplete="off" placeholder="09" value={formik.values.expMonth} onChange={handleCustomChange} onBlur={formik.handleBlur} className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm text-center ${formik.touched.expMonth && formik.errors.expMonth ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
            <input type="text" name="expYear" autoComplete="off" placeholder="YY" value={formik.values.expYear} onChange={handleCustomChange} onBlur={formik.handleBlur} className={`w-full px-3 py-2.5 rounded-lg border outline-none text-sm text-center ${formik.touched.expYear && formik.errors.expYear ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
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
          <input type="text" name="cvc" autoComplete="off" placeholder="e.g. 123" value={formik.values.cvc} onChange={handleCustomChange} onBlur={formik.handleBlur} className={`w-full px-4 py-2.5 rounded-lg border outline-none text-sm ${formik.touched.cvc && formik.errors.cvc ? 'border-red-500' : 'border-slate-300 focus:border-purple-800'}`} />
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