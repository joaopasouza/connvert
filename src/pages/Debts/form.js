import React, { useContext } from 'react';
import { object, mixed, number } from 'yup';

import { SaveOutlined } from '@ant-design/icons';
import { Modal, Button, notification } from 'antd';
import { Formik, Field } from 'formik';
import { Form, Select, Input } from 'formik-antd';

import InputMoney from '../../components/InputMoney';

import { DebtContext } from '../../features/debt';

const { Option } = Select;

const schema = object().shape({
  idUsuario: mixed().required('O campo usuário é obrigatório'),
  motivo: mixed().required('O campo motivo é obrigatório'),
  valor: number().moreThan(0, 'O campo valor deve ser maior que 0'),
});

function DebtForm() {
  const {
    users,
    visible,
    formData,
    loading,
    setVisible,
    saveDebt,
    resetFormData,
  } = useContext(DebtContext);

  const handleCancel = () => {
    resetFormData();
    setVisible(false);
  };

  return (
    <Formik
      initialValues={formData}
      onSubmit={async (data) => {
        const response = await saveDebt(data);
        if (response.success) {
          notification.open({
            type: 'success',
            message: 'Sucesso',
            description: 'Registro salvo com sucesso.',
          });
          resetFormData();
        }
      }}
      validationSchema={schema}
      enableReinitialize
    >
      {({ handleSubmit, handleReset }) => (
        <Modal
          title="Gerenciar Dívida"
          visible={visible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          confirmLoading={loading}
          footer={[
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSubmit}
            >
              Salvar
            </Button>,
            <Button
              key="cancel"
              type="default"
              htmlType="reset"
              onClick={() => {
                handleReset();
                handleCancel();
              }}
            >
              Cancelar
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Input type="hidden" name="id" />

            <Form.Item name="idUsuario" label="Usuário">
              <Select
                name="idUsuario"
                placeholder="Selecione um usuário"
                showSearch
                clearIcon
              >
                {users.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="motivo" label="Motivo">
              <Input type="text" name="motivo" />
            </Form.Item>

            <Form.Item name="valor" label="Valor">
              <Field name="valor">
                {({ field, form }) => (
                  <InputMoney
                    {...field}
                    className="ant-input"
                    maxLength={17}
                    style={{ textAlign: 'right' }}
                    onChange={(event, value, maskedValue) =>
                      form.setFieldValue('valor', value)
                    }
                  />
                )}
              </Field>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}

export default DebtForm;
