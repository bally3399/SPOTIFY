'use client'

import{useState , useEffect} from "react";
import Modal from "@/components/Modal";
import AuthModal from "@/components/AuthModal";
import ArtistModal from "@/components/ArtistModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    return (
        <>
            <AuthModal/>
            <ArtistModal/>
        </>
    )
}
export default ModalProvider;