import { Typography } from '@mui/material'
import React from 'react'

function ViewUser() {
    return (
        <div>
            <div>
                <Typography textAlign="center" variant="h4" className="py-10">View  Account</Typography>

                <div>
                    <div className="max-w-[400px] mx-auto grid gap-10  ">
                        <div className='text-end text-blue-600 my-12 cursor-pointer font-semibold underline'>Edit</div>
                        <div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>Full Name</div>
                            <div>Ritik Chhipa</div>
                        </div><div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>Last Name</div>
                            <div> Chhipa</div>
                        </div><div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>First Name</div>
                            <div>Ritik</div>
                        </div><div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>Email</div>
                            <div>Ritik@gmail.com</div>
                        </div><div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>Role</div>
                            <div>Admin</div>
                        </div><div className='flex justify-between '>
                            <div className='text-[#5D5D5F]'>Phone </div>
                            <div>+14478955623</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser
