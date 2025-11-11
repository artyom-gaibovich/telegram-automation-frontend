import { type BaseSyntheticEvent, type FC } from 'react';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/lib';
import { useField } from 'formik';
import { FileUpload, type FileUploadProps } from '@shared/ui';
import { FormItem } from '@shared/ui/form-controls';
import type { BaseFormControlProps } from '@shared/ui/form-controls/types';

type FormFileUploadProps = FileUploadProps & BaseFormControlProps & {};

export const FormFileUpload: FC<FormFileUploadProps> = ({
  className,
  name,
  isRequired,
  label,
  formItemProps,
  ...props
}) => {
  const [field, meta] = useField(name);

  const { value, onChange, ...restField } = field;

  return (
    <FormItem
      className={className}
      label={label}
      isRequired={isRequired}
      error={meta.error}
      touched={meta.touched}
      {...formItemProps}
    >
      <FileUpload
        {...props}
        {...restField}
        fileList={value}
        onChange={({ fileList }: UploadChangeParam<UploadFile<any>>) => {
          onChange({
            target: {
              name,
              value: fileList,
            },
          } as BaseSyntheticEvent);
        }}
      />
    </FormItem>
  );
};
