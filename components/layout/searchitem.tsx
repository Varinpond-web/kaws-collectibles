'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
interface User {
    id: number;
    name: string;
    email: string;
    image: string;
  } 

export default function SearchItem({search}:{search: string}) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/getsearch', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: search }),
        })
        .then(response => response.json())
        .then(data => setUsers(data));
    }, [search]);
    
    return(
    <div>
        {users.map((user, index) => (
            <div key={index}>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    <div className="flex items-center">
                        <Image
                            alt={user.email}
                            src={user.image || `https://avatars.dicebear.com/api/micah/${user.email}.svg`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <Link className="ml-2" href={`/profile/${user.name}`}>{user.name}</Link>
                    </div>
                </li>
            </div>
        ))}
    </div>
    )

}
