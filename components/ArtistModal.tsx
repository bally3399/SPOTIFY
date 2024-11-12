import React from 'react';
import Modal from "@/components/Modal";
import useArtistModal from "@/hooks/useArtistModal";

const ArtistModal = () => {
    const artistModal = useArtistModal()
    const onChange = (open:boolean) =>{
        if (!open) {
           artistModal.onClose();
        }
    }

    return(
        <Modal
            title="Add a new Artist"
            description='Create your own artist'
            isOpen = {artistModal.isOpen}
            onChange={onChange}>
            Artist Modal
        </Modal>
    )
};

export default ArtistModal;