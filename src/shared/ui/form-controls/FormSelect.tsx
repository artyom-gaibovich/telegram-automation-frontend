import { type BaseSyntheticEvent, type JSX, useEffect } from 'react';
import { useField } from 'formik';
import { Yup } from '@shared/libs';
import type { SelectOptionItem } from '@shared/models';
import type { SelectProps } from '@shared/ui';
import { Select } from '@shared/ui';
import { FormItem } from '@shared/ui/form-controls';
import type { BaseFormControlProps } from '@shared/ui/form-controls/types';

export interface FormSelectProps<
  ValueType = any,
  OptionType extends SelectOptionItem = SelectOptionItem,
> extends Omit<SelectProps<ValueType, OptionType>, 'onChange' | 'labelInValue'>,
    BaseFormControlProps {
  onChangeCallback?: (
    value: ValueType,
    option: OptionType | OptionType[] | undefined,
  ) => void;
  // Режим сохранения значения в коротком формате ValueType, а не OptionType
  valueAsValue?: boolean;
}

export function FormSelect<
  ValueType = any,
  OptionType extends SelectOptionItem = SelectOptionItem,
>({
  className,
  name,
  isRequired,
  label,
  formItemProps,
  onChangeCallback,
  valueAsValue,
  ...props
}: FormSelectProps<ValueType, OptionType>): JSX.Element {
  const [field, meta, helpers] = useField(name);

  const { onBlur, onChange, ...restField } = field;

  const errorFlat = meta.error
    ? typeof meta.error === 'string'
      ? meta.error
      : Object.values(meta.error).join('; ')
    : undefined;

  /**
   * Валидация в режиме valueAsValue на соответствие value одному из значений в options
   */
  useEffect(() => {
    if (!valueAsValue) return;

    if (meta.error) {
      return;
    }

    if (props.loading || !field.value) {
      return;
    }

    if (!props.options?.some((i) => i?.value === field.value)) {
      if (!meta.touched) {
        helpers.setTouched(true);
      }
      helpers.setError(Yup.defaultLocale.mixed?.default as string);
    }
  }, [props.options, meta.error]);

  return (
    <FormItem
      className={className}
      label={label}
      isRequired={isRequired}
      error={errorFlat}
      touched={meta.touched}
      {...formItemProps}
    >
      <Select<ValueType, OptionType>
        {...restField}
        {...props}
        onBlur={() => {
          onBlur({ target: { name } } as BaseSyntheticEvent);
        }}
        onChange={(value, option) => {
          const event = {
            target: {
              name,
              value: valueAsValue ? value : option,
            },
          } as BaseSyntheticEvent;

          onChange(event);

          onChangeCallback?.(event.target.value, option);
        }}
      />
    </FormItem>
  );
}
