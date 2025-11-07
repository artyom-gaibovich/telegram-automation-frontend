import type { FC } from 'react';
import { useField } from 'formik';
import type { InputProps } from '@shared/ui';
import { Input } from '@shared/ui';
import { FormItem } from '@shared/ui/form-controls';
import type { BaseFormControlProps } from '@shared/ui/form-controls/types';

type FormInputProps = InputProps & BaseFormControlProps & {};

export const FormInput: FC<FormInputProps> = ({
  className,
  name,
  isRequired,
  label,
  formItemProps,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <FormItem
      className={className}
      label={label}
      isRequired={isRequired}
      error={meta.error}
      touched={meta.touched}
      {...formItemProps}
    >
      <Input {...field} {...props} />
    </FormItem>
  );
};
