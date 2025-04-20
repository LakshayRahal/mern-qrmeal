import { useDispatch, useSelector } from "react-redux";
import { claimQR } from "@/store/staff-slice";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { TimingOptions } from "@/config";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffQRTile({ product }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth?.user?.email);
  const [claimedList, setClaimedList] = useState([]);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/staff/qr/history/${email}`)
      .then((res) => {
        setClaimedList(res.data.data.map((item) => item.qrId)); // assuming 'qrId' is the field
      })
      .catch((err) => console.error(err));
  }, [email]);

  const handleClaim = () => {
    if (!email) return;
    dispatch(claimQR({ qrId: product._id, claimedBy: email }));
  };

  const isAlreadyClaimed = claimedList.includes(product._id);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-md text-muted-foreground">
              {TimingOptions[product?.timing]}
            </span>
            <span className="text-md text-muted-foreground">
              {product?.date}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleClaim}
            disabled={isAlreadyClaimed}
            variant={isAlreadyClaimed ? "outline" : "default"}
          >
            {isAlreadyClaimed ? "Already Claimed" : "Claim"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
