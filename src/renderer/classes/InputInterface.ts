import { InputHTMLAttributes } from 'react';

export interface InputElementProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  chave?: string;
  disabled?: boolean;
}
