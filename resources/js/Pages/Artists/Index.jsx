import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import ArtistForm from './Partials/ArtistForm';

export default function Index({ auth, artists }) {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editId, setEditId] = useState(null);
      const openCreateModal = () => {
            setEditId(null);
            reset();
            clearErrors();
            setIsModalOpen(true);
      };
      const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
            name: '',
            dob: '',
            gender: '',
            address: '',
      });
      const closeModal = () => {
            setIsModalOpen(false);
            reset();
      };
      const submit = (e) => {
            e.preventDefault();
            if (editId) {
                  put(route('artist.update', editId), {
                        onSuccess: () => closeModal(),
                  });
            } else {
                  post(route('artist.store'), {
                        onSuccess: () => closeModal(),
                  });
            }
      };
      const confirmArtistDeletion = (artist) => {
            setArtistToDelete(artist);
            setConfirmingArtistDeletion(true);
      };

      const closeModalDeletion = () => {
            setConfirmingArtistDeletion(false);
            setArtistToDelete(null);
      };

      const deleteArtist = (e) => {
            e.preventDefault();
            destroy(route('artist.destroy', artistToDelete.id), {
                  onSuccess: () => closeModalDeletion(),
            });
      };

      return (
            <AuthenticatedLayout
                  user={auth.user}
                  header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Artists</h2>}
            >
                  <Head title="Artists" />

                  <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                          <h3 className="text-lg font-medium">Artist Management</h3>
                                          <div className="flex space-x-2">
                                                <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded">
                                                      Add Artist
                                                </button>
                                                <Link href={route('artist.export')} className="bg-green-600 text-white px-4 py-2 rounded">Export</Link>
                                                <Link href={route('artist.import')} className="bg-yellow-600 text-white px-4 py-2 rounded">Import</Link>
                                          </div>

                                    </div>

                                    <table className="min-w-full divide-y divide-gray-200">
                                          <thead>
                                                <tr>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">First Release</th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200">
                                                {artists.map((artist) => (
                                                      <tr key={artist.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">{artist.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{artist.gender === 'm' ? 'Male' : (artist.gender === 'f' ? 'Female' : 'Other')}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">{artist.first_release_year}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                                  <button className="text-indigo-600 hover:text-indigo-900 border px-3 py-1 rounded">Edit</button>
                                                                  <button
                                                                        onClick={() => deleteArtist(artist.id)}
                                                                        className="text-red-600 hover:text-red-900 border px-3 py-1 rounded"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>

                  {/* Create/Edit Modal */}
                  <ArtistForm
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        submit={submit}
                        editId={editId}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                  />
            </AuthenticatedLayout >
      );
}
