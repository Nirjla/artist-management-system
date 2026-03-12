import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UserForm from './Partials/UserForm';


export default function Index({ auth, users }) {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editId, setEditId] = useState(null);
      const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
      const [userToDelete, setUserToDelete] = useState(null);

      const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            phone: '',
            dob: '',
            gender: '',
            address: '',
      });

      const openCreateModal = () => {
            setEditId(null);
            reset();
            clearErrors();
            setIsModalOpen(true);
      };

      const openEditModal = (user) => {
            setEditId(user.id);
            setData({
                  first_name: user.first_name || '',
                  last_name: user.last_name || '',
                  email: user.email || '',
                  phone: user.phone || '',
                  dob: user.dob || '',
                  gender: user.gender || '',
                  address: user.address || '',
                  password: '',
            });
            clearErrors();
            setIsModalOpen(true);
      };

      const closeModal = () => {
            setIsModalOpen(false);
            reset();
      };

      const submit = (e) => {
            e.preventDefault();
            if (editId) {
                  put(route('user.update', editId), {
                        onSuccess: () => closeModal(),
                  });
            } else {
                  post(route('user.store'), {
                        onSuccess: () => closeModal(),
                  });
            }
      };
      const confirmUserDeletion = (user) => {
            setUserToDelete(user);
            setConfirmingUserDeletion(true);
      };

      const closeModalDeletion = () => {
            setConfirmingUserDeletion(false);
            setUserToDelete(null);
      };

      const deleteUser = (e) => {
            e.preventDefault();
            destroy(route('user.destroy', userToDelete.id), {
                  onSuccess: () => closeModalDeletion(),
            });
      };

      return (
            <AuthenticatedLayout
                  user={auth.user}
                  header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
            >
                  <Head title="Users" />

                  <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                          <h3 className="text-lg font-medium">User Management</h3>
                                          <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded">
                                                Add User
                                          </button>
                                    </div>

                                    <table className="min-w-full divide-y divide-gray-200">
                                          <thead>
                                                <tr>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                                {users.map((user) => (
                                                      <tr key={user.id}>
                                                            <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                                                            <td className="px-6 py-4">{user.email}</td>
                                                            <td className="px-6 py-4 space-x-2">
                                                                  <button onClick={() => openEditModal(user)} className="text-indigo-600 border px-3 py-1 rounded">Edit</button>
                                                                  <button onClick={() => confirmUserDeletion(user)} className="text-red-600 border px-3 py-1 rounded">Delete</button>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>

                  {/* Create/Edit Modal */}
                  <UserForm
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        submit={submit}
                        editId={editId}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                  />

                  {/* Delete Modal */}
                  <DeleteUserForm
                        confirmingUserDeletion={confirmingUserDeletion}
                        closeModalDeletion={closeModalDeletion}
                        deleteUser={deleteUser}
                        userToDelete={userToDelete}
                        processing={processing}
                  />


            </AuthenticatedLayout>
      );
}
