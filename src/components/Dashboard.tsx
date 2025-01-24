import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Dashboard() {
    // Get the admin data from the Redux store
    const admin = useSelector((state: RootState) => state.auth.admin);

    // Render message if no admin data is found
    if (!admin) {
        return (
            <div className="flex items-center justify-center">
                No Data Found
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Dashboard Header */}
            <h1 className="text-4xl text-black font-bold mb-2">Dashboard</h1>
            <p className="text-base font-extralight text-[#101010] mb-4">01 - 25 March, 2020</p>
            <img src="/Stats.png" alt="Stats" className="mb-12" />

            {/* Admin Information Card */}
            <div className="shadow-md bg-gray-100 rounded-xl w-full">
                {/* Admin Name */}
                <div className="flex items-center justify-between px-10 py-4">
                    <h1 className="text-xl text-black font-medium">Name</h1>
                    <h1 className="text-xl text-black font-light">{admin.name}</h1>
                </div>
                <hr className="h-1" />

                {/* Admin Reference Number */}
                <div className="flex items-center justify-between px-10 py-4">
                    <h1 className="text-xl text-black font-medium">Reference no.</h1>
                    <h1 className="text-xl text-black font-light">{admin._id}</h1>
                </div>
                <hr className="h-1" />

                {/* Business Promoters */}
                <div className="flex items-center justify-between px-10 py-4">
                    <h1 className="text-xl text-black font-medium">Business Promoters</h1>
                    <h1 className="text-xl text-black font-light">{admin.name}</h1>
                </div>
                <hr className="h-1" />

                {/* Business Income */}
                <div className="flex items-center justify-between px-10 py-4">
                    <h1 className="text-xl text-black font-medium">Business Income</h1>
                    <h1 className="text-xl text-black font-light">{admin.businessIncome}</h1>
                </div>
                <hr className="h-1" />

                {/* Business Partners */}
                <div className="flex items-center justify-between px-10 py-4">
                    <h1 className="text-xl text-black font-medium">Business Partners</h1>
                    <h1 className="text-xl text-black font-light">{admin.businessPartners}</h1>
                </div>
            </div>
        </div>
    );
}
