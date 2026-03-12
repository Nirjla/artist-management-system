import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function UserForm({ isModalOpen, closeModal, submit, editId, data, setData, errors, processing }) {
      return (
            <Modal show={isModalOpen} onClose={closeModal}>
                  <form onSubmit={submit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">{editId ? 'Edit User' : 'Add New User'}</h2>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                    <InputLabel htmlFor="first_name" value="First Name" />
                                    <TextInput id="first_name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.first_name} className="mt-2" />
                              </div>
                              <div>
                                    <InputLabel htmlFor="last_name" value="Last Name" />
                                    <TextInput id="last_name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.last_name} className="mt-2" />
                              </div>
                        </div>

                        <div className="mt-4">
                              <InputLabel htmlFor="email" value="Email" />
                              <TextInput id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full" required />
                              <InputError message={errors.email} className="mt-2" />
                        </div>

                        {!editId && (
                              <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.password} className="mt-2" />
                              </div>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                    <InputLabel htmlFor="phone" value="Phone" />
                                    <TextInput id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.phone} className="mt-2" />
                              </div>
                              <div>
                                    <InputLabel htmlFor="dob" value="Date of Birth" />
                                    <TextInput id="dob" type="date" value={data.dob} onChange={(e) => setData('dob', e.target.value)} className="mt-1 block w-full" required />
                                    <InputError message={errors.dob} className="mt-2" />
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