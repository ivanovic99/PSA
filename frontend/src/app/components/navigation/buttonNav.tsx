'use client'
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


export default function ButtonNav() {
   const username = useAppSelector((state) => state.authReducer.value.username)
   const email = useAppSelector((state) => state.authReducer.value.email)
   const router = useRouter()
   const LogOut = async () => {
      
      // LOGOUT NOT WORKING YET
      // const dispatch = useDispatch<AppDispatch>()
      // dispatch(logOut())
      
      await fetch('/api/auth/logout')
      router.push('/')
   }   
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description={email}
            name={username}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{username}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/settings">My Settings</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            <button onClick={LogOut}>Log out</button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}


