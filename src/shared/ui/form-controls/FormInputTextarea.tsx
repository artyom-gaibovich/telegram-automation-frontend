import type { FC } from 'react';
import { useField } from 'formik';
import { FormItem } from '@shared/ui/form-controls';
import type { BaseFormControlProps } from '@shared/ui/form-controls/types';
import { InputTextarea, type InputTextareaProps } from '@shared/ui/InputTextarea/InputTextarea';

type FormInputTextareaProps = InputTextareaProps & BaseFormControlProps & {};

export const FormInputTextarea: FC<FormInputTextareaProps> = ({
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
      <InputTextarea {...field} {...props} />
    </FormItem>
  );
};
