'use client'
import Link from 'next/link'
import './select.css'
import { useState, useEffect } from 'react';
import { Version } from '@/../types/versions';

export default function SelectVersion({ versions, productId }: { versions: Version[], productId: number}) {
   const [selectedVersion, setSelectedVersion] = useState<Version>({
      _id: 0,
      versionNumber: '',
      customization: '',

   } as unknown as Version)
   useEffect(() => {
      setSelectedVersion(versions[versions.length-1])
   }, [versions]);
   const handleVersionSelect = (version: Version) => {
      setSelectedVersion(version);
   };
   return (
      <div>
        <div className="version-selector">
            <div className="select animated zoomIn">
               <input type="radio" name="option"></input>
               <i className="toggle icon icon-arrow-down"></i>
               <i className="toggle icon icon-arrow-up"></i>
               <span className="placeholder">Choose version...</span>
               {
                  versions.map((version, index) => (
                     <label key={version._id} className="option">
                        <input type="radio" name="option" onClick={() => {handleVersionSelect(version)}} value={version.versionNumber} defaultChecked={index === versions.length-1}></input>
                        <span className="title animated fadeIn"><i className=""></i>{version.versionNumber}</span>
                     </label>
                  ))
               }
            </div>
            <Link href={`${productId}/version/${selectedVersion?._id}`} className="version-link">
               See details of version {selectedVersion?.versionNumber }
            </Link>
         </div>

      </div>
   )
}