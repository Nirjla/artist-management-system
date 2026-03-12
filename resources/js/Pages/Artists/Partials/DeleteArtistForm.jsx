import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

export default function DeleteArtistForm({ confirmingArtistDeletion, closeModalDeletion, deleteArtist, artistToDelete, processing }) {
      return (
            <Modal show={confirmingArtistDeletion} onClose={closeModalDeletion}>
                  <form onSubmit={deleteArtist} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                              Are you sure you want to delete this artist?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                              Once this artist is deleted, all of its resources and data will be permanently deleted.
                              Artist: <strong>{artistToDelete?.name}</strong>
                        </p>

                        <div className="mt-6 flex justify-end">
                              <SecondaryButton onClick={closeModalDeletion}>Cancel</SecondaryButton>
                              <DangerButton className="ms-3" disabled={processing}>
                                    Delete Artist
                              </DangerButton>
                        </div>
                  </form>
            </Modal>
      )
}