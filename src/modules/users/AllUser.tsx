import { TextField, Typography } from "@mui/material";
import React from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
function AllUser() {
  return (
    <div>
      <div>
        <Typography textAlign="center" variant="h4" className="py-10">
          All Users and Vendors
        </Typography>
        <div>
          <div>
            <div className="flex gap-4 items-center my-4 ">
              <div className="max-w-[150px] w-full">Search Buy User</div>
              <select
                name="role"
                className="max-w-[400px] rounded-md bg-white border border-[#c4c4c4] w-full p-[10.5px]"
              >
                <option disabled>Select </option>
                <option value="red">Red</option>

                <option value="green">Green</option>

                <option value="blue">Blue</option>
              </select>
            </div>
            <div className="flex  gap-4  items-center ">
              {" "}<div className="max-w-[150px] w-full">Search By Email</div>
              <TextField size="small" />
              <button className="rounded-md  text-white bg-[#4979D1] px-10 py-3">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="py-10">
          <table className="w-full text-center  ">
            <thead className="">
              <tr className="">
                <th>ID</th>
                <th>User/Vendor Name</th>
                <th>Role</th>
                <th>Email Address</th>
                <th>Created On</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Email Status</th>
                <th>Action</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody className="py-3">
              <tr className="">
                <td>1246</td>
                <td className="text-blue-600 underline ">David Lee</td>
                <td>Admin</td>
                <td>xmaefdsa@tamice.com</td>
                <td>01/20/2023</td>
                <td>01/20/2023</td>
                <td>Active </td>
                <td>Verified</td>

                <td className="flex justify-center gap-2">
                  <span>
                    <AiOutlineEdit size={20} />
                  </span>
                  <span>
                    <AiFillDelete size={20} />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUser;
