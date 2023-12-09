import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function Home() {
    const [anonAadhaar] = useAnonAadhaar();
    const [status, setStatus] = useState<null>(null)

    useEffect(() => {
        const availableStatus = localStorage.getItem("anonAadhaar")
        if (availableStatus) {
            const parsedValue = JSON.parse(availableStatus)
            setStatus(parsedValue.status)
        }
    }, []);

    const app_id = BigInt("123").toString()

    console.log("------====--", status)

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