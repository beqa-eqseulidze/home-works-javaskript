import { useState } from 'react';
import type { CardFormValues } from '../types/card';

const initialValues: CardFormValues = {
  name: '',
  number: '',
  expMonth: '',
  expYear: '',
  cvc: '',
};

export const useCardForm = () => {
  const [formData, setFormData] = useState<CardFormValues>(initialValues);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleReset = () => {
    setFormData(initialValues);
    setIsSubmitted(false);
  };

  const handleFormSubmit = () => {
    setIsSubmitted(true);
  };

  return {
    formData,
    isSubmitted,
    setFormData,
    handleReset,
    handleFormSubmit,
  };
};