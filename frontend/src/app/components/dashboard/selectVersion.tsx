'use client'
import Link from 'next/link'
import './select.css'
import { useState, useEffect } from 'react';
import { Version } from '@/../types/versions';

export default function SelectVersion({ versions, productId }: { versions: Version[], productId: number}) {
   const [selectedVersion, setSelectedVersion] = useState(versions?.at(-1)?.versionNumber);
   useEffect(() => {
      setSelectedVersion(versions?.at(-1)?.versionNumber)
   }, [versions]);
   const handleVersionSelect = (e: any) => {
      setSelectedVersion(e.target.value);
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
                     <label key={version.id} className="option">
                        <input type="radio" name="option" onClick={handleVersionSelect} value={version.versionNumber} defaultChecked={index === 0}></input>
                        <span className="title animated fadeIn"><i className=""></i>{version.versionNumber}</span>
                     </label>
                  ))
               }
            </div>
            <Link href={`${productId}/version/${selectedVersion}`} className="version-link">
               See details of version {selectedVersion}
            </Link>
         </div>

      </div>
   )
}