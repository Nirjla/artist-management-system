import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DeleteUserForm({ confirmingUserDeletion, closeModalDeletion, deleteUser, userToDelete, processing }) {
      return (
            <Modal show={confirmingUserDeletion} onClose={closeModalDeletion}>
                  <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                              Are you sure you want to delete this user?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                              Once this user is deleted, all of its resources and data will be permanently deleted.
                              User: <strong>{userToDelete?.first_name} {userToDelete?.last_name}</strong>
                        </p>

                        <div className="mt-6 flex justify-end">
                              <SecondaryButton onClick={closeModalDeletion}>Cancel</SecondaryButton>
                              <DangerButton className="ms-3" disabled={processing}>
                                    Delete User
                              </DangerButton>
                        </div>
                  </form>
            </Modal>
      )
}