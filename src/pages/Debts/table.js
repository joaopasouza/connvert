import React, { useContext } from 'react';
import moment from 'moment';

import { Button, Table, Space, Modal, Row, Col, PageHeader } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { DebtContext } from '../../features/debt';

import { currencyFormatter } from '../../utils/formatter';

const { confirm } = Modal;

function DebtList() {
  const { debts, setVisible, editDebt, destroyDebt } = useContext(DebtContext);

  const showConfirm = (id) => {
    confirm({
      title: 'Deseja excluir este registro?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      async onOk() {
        try {
          return new Promise((resolve, reject) => {
            resolve(destroyDebt(id));
          });
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: 'Id Usuário',
      dataIndex: 'idUsuario',
      key: 'idUsuario',
    },
    {
      title: 'Motivo',
      dataIndex: 'motivo',
      key: 'motivo',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (value) => `${currencyFormatter(value)}`,
    },
    {
      title: 'Data Cadastro',
      dataIndex: 'criado',
      key: 'criado',
      render: (value) => `${moment(value).format('DD/MM/YYYY')}`,
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      align: 'center',
      render: (text, record) => (
        <Space size="small">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              editDebt(record._id);
            }}
          >
            <EditOutlined />
          </a>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              showConfirm(record._id);
            }}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const handleOpenModal = () => {
    setVisible(true);
  };

  return (
    <div>
      <Row>
        <Col flex="auto">
          <PageHeader title="Gestão de Dívidas" />
        </Col>

        <Col flex="100px">
          <Button
            type="primary"
            htmlType="button"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
          >
            Adicionar
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={debts}
        columns={columns}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default DebtList;
