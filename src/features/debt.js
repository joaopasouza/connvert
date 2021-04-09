import React, { createContext, useEffect, useState } from 'react';

import {
  getAllDebts,
  insertDebt,
  findDebt,
  updateDebt,
  deleteDebt,
} from '../services/debtService';
import { getAllUsers } from '../services/userService';

const initialValues = {
  id: null,
  idUsuario: null,
  motivo: null,
  valor: 0,
};

export const DebtContext = createContext({
  debts: [],
  users: [],
  visible: false,
  formData: initialValues,
  loading: false,
  setVisible: (f) => f,
  editDebt: async (f) => f,
  saveDebt: async (f) => f,
  destroyDebt: async (f) => f,
});

function DebtProvider({ children }) {
  const [debts, setDebts] = useState([]);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const fetchDebts = async () => {
    const response = await getAllDebts();
    setDebts(response.result);
  };

  const fetchUsers = async () => {
    const response = await getAllUsers({});
    setUsers(response);
  };

  const editDebt = async (id) => {
    const response = await findDebt(id);
    if (response.success) {
      setFormData({
        id: response.result._id,
        idUsuario: response.result.idUsuario,
        motivo: response.result.motivo,
        valor: response.result.valor,
      });
      setVisible(true);
    }
  };

  const saveDebt = async (data) => {
    setLoading(true);

    let response = {};

    if (data.id) {
      response = await updateDebt(data);
    } else {
      response = await insertDebt(data);
    }

    if (response.success) {
      setLoading(false);
      setFormData(initialValues);
      setVisible(false);
      fetchDebts();
    }

    return response;
  };

  const destroyDebt = async (id) => {
    const response = await deleteDebt(id);
    if (response.success) {
      fetchDebts();
    }

    return response;
  };

  useEffect(() => {
    fetchDebts();
    fetchUsers();
  }, []);

  return (
    <DebtContext.Provider
      value={{
        debts,
        users,
        visible,
        formData,
        loading,
        setVisible,
        editDebt,
        saveDebt,
        destroyDebt,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
}

export default DebtProvider;
