import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function KYC() {
    const [anonAadhaar] = useAnonAadhaar();
    const [status, setStatus] = useState<null>(null)
   
    useEffect(() => {
        const handleStorageChange = () => {
          const updatedAvailableStatus = localStorage.getItem("anonAadhaar");
    
          if (updatedAvailableStatus) {
            const parsedValue = JSON.parse(updatedAvailableStatus);
            setStatus(parsedValue.status);
          }
        };
        handleStorageChange();

        const intervalId = setInterval(() => {
          handleStorageChange();
        }, 1000);
        return () => {
          clearInterval(intervalId);
        };
      }, []); 

    const app_id = BigInt("123").toString()

    return (
        <>
            <AnonAadhaarProvider _appId={app_id}>
                <div>
                    <LogInWithAnonAadhaar />
                    <p>{status}</p>
                </div><div>
                    {/* Render the proof if generated and valid */}
                    {status === "logged-in" ? (<>
                        <p>✅ Proof is valid</p>
                        {/* <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} /> */}
                    </>) : <>try</>}
                    {anonAadhaar?.status === "logged-in" && (
                        <>
                            <p>✅ Proof is valid</p>
                            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
                        </>
                    )}
                </div>
            </AnonAadhaarProvider>
        </>
    );
}