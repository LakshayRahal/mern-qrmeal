
// import { ArrowUpDownIcon } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { sortOptions } from "@/config";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
// import StaffQRTile from "./qr-title";
// import { createSearchParams, useSearchParams } from "react-router-dom";
// import ProductDetailsDialog from "./product-details";


// // function createSearchParamsHelper(filterParams){
// //   const queryParams=[];
// //   // for multiple values
// //   for(const [key,value] of Object.entries(filterParams)){
// //     if(Array.isArray(value) && value.length>0){
// //       const paramValue=value.join(',');
      

// //       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
// //     }
// //   }
// //   return queryParams.join('&');
// // }


// export function ShoppingListing() {
//   const { qrList } = useSelector((state) => state.staffQr);
//   const dispatch = useDispatch();



//   return (
// <div className="grid grid-cols-[270px_1fr] md:grid-cols-[220px_1fr] gap-6 p-3 md:p-4">

//       {/* Sidebar Filter */}
//       {/* <ProductFilter filters={filters} handleFilter={handleFilter} /> */}

//       {/* Main Content */}
//       <div className="bg-background w-full rounded-lg shadow-sm">
//         {/* Header Section */}
//         <div className="p-3 border-b flex items-center justify-between">
//           <h2 className="text-lg font-extrabold">All QR</h2>

//           {/* Sorting & Product Count */}
//           <div className="flex items-center gap-3">
//             <span className="text-muted-foreground">
//               {productList?.length || 0} Total QR
//             </span>

//              {/* <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="sm" className="flex items-center gap-1">
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <span>Sort by</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px]">
//                 <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                   {sortOptions.map((sortItem) => (
//                     <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
//                       {sortItem.label}
//                     </DropdownMenuRadioItem>
//                   ))}
//                 </DropdownMenuRadioGroup>
//               </DropdownMenuContent>
//             // </DropdownMenu> */}
//            </div>
//          </div> 

//         {/* Product Listing */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
//           {qrList && qrList.length > 0 ? (
//             qrList.map((productItem) => (
//               <StaffQRTile  key={productItem._id} product={productItem} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">No QR Available</p>
//           )}
//         </div>
//       </div>
//       {/* <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} /> */}
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQR } from "@/store/staff-slice";
import StaffQRTile from "./qr-title";

export function StaffHome() {
  const { qrList } = useSelector((state) => state.staffQr);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQR());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Meals {qrList.length}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {qrList && qrList.length > 0 ? (
          qrList.map((item) => (
            <StaffQRTile key={item._id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No meals available
          </p>
        )}
      </div>
    </div>
  );
}


