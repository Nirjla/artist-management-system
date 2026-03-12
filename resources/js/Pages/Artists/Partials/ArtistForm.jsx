import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ArtistForm({ isModalOpen, closeModal, submit, editId, data, setData, errors, processing }) {
      return (
            <Modal show={isModalOpen} onClose={closeModal}>
                  <form onSubmit={submit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">{editId ? 'Edit Artist' : 'Add New Artist'}</h2>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.name} className="mt-2" />
                              </div>
                              <div>
                                    <InputLabel htmlFor="dob" value="Date of Birth" />
                                    <TextInput id="last_name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.last_name} className="mt-2" />
                              </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                    <InputLabel htmlFor="first_release_year" value="First Release Year" />
                                    <TextInput id="first_release_year" value={data.first_release_year} onChange={(e) => setData('first_release_year', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.first_release_year} className="mt-2" />
                              </div>
                              <div>
                                    <InputLabel htmlFor="no_of_albums_released" value="No of Albums Released" />
                                    <TextInput id="no_of_albums_released" type="number" value={data.no_of_albums_released} onChange={(e) => setData('no_of_albums_released', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.no_of_albums_released} className="mt-2" />
                              </div>
                        </div>

                        <div className="mt-4">
                              <InputLabel htmlFor="gender" value="Gender" />
                              <select id="gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                                    <option value="">Select Gender</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                    <option value="o">Other</option>
                              </select>
                              <InputError message={errors.gender} className="mt-2" />
                        </div>

                        <div className="mt-4 space-y-2">
                              <InputLabel htmlFor="address" value="Address" />
                              <TextInput id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className="mt-1 block w-full" required />
                              <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end">
                              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                              <PrimaryButton className="ms-3" disabled={processing}>{editId ? 'Update' : 'Create'}</PrimaryButton>
                        </div>
                  </form>
            </Modal>
      )
}