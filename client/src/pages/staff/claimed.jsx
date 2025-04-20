import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ClaimHistory() {
  const { auth } = useSelector((state) => state);
  const [claimedList, setClaimedList] = useState([]);

  useEffect(() => {
    if (!auth?.user?.email) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/staff/history/${auth.user.email}`)
      .then((res) => {
        setClaimedList(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [auth]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Claimed QR History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {claimedList.map((qr) => (
          <div key={qr._id} className="border p-4 rounded-lg shadow-md">
            <img src={qr.image} alt={qr.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{qr.name}</h3>
            <p>Timing: {qr.timing}</p>
            <p>Date: {qr.date}</p>
            <p className="text-sm text-muted">Claimed At: {new Date(qr.claimedAt).toLocaleString()}</p>
            <a
              href={qr.image}
              download={`QR_${qr.name}_${qr.date}`}
              className="text-blue-600 mt-2 inline-block"
            >
              Download QR
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


