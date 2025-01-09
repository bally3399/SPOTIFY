// import React, {useEffect, useState} from "react";
// import {getTracks} from "@/API/searchTrack";
// import styles from "../styles.module.css";
// import Image from 'next/image'
//
//
// export default function Player(){
//     const [searchInput, setSearchInput] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const fetchTracks = async () =>{
//         if(searchInput){
//             let response = await getTracks(searchInput);
//             setSearchResults(.track.items.map(
//                 (track: {
//                     name: "",
//                     url: "";
//                     page: {
//                         name: '';
//                         images: [
//                     {
//                         url: "";
//                     }
//                     ];
//                 };
//             }) =>{
//                 return {
//                     name: track.name,
//                     url: track.url,
//                     images: track.page.images[0].url,
//                     albumName: track.page.name,
//                 }
//             }) || {});
//             return response
//         }
//     }
//     useEffect(() => {
//         let debounced = setTimeout(() =>{
//             fetchTracks()
//         }, 2000);
//         return () => clearTimeout(debounced)
//     }, [searchInput]);
//     console.log(searchResults)
//     return (
//         <div>
//             <input
//             type="text"
//             placeholder='Type here'
//             value={searchInput}
//             onChange={(event) => {
//                 setSearchInput(event.target.value);
//             }}
//             className="input input-bordered w-full max-w-xs"
//             />
//             <div className={styles.grid}>
//                 {searchResults.map((track: {
//                     name: "";
//                     images: "";
//                 }) =>{
//                     return(
//                         <div className={styles.inner}>
//                             <Image className={styles.trackImages} src={track.images} alt='artist'/>
//                             <p>{track.name}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }