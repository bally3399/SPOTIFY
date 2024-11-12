import {create} from "zustand"

interface ArtistModalStore{
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

const useAuthModal = create<ArtistModalStore>((set) =>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}))

export default useAuthModal;
