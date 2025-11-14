import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';

const EditableContext = createContext<any>(null);

const EditableRow = ({ index, ...props }: any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: any) => {
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      setEditing(false);
      handleSave({ ...record, ...values });
    } catch (e) {
      console.error(e);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: 'Введите значение' }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} type="number" />
      </Form.Item>
    ) : (
      <div style={{ paddingRight: 24, cursor: 'pointer' }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export { EditableCell, EditableRow };
